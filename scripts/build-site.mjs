#!/usr/bin/env node
/**
 * build-site.mjs — assemble the Netlify publish directory.
 *
 * Netlify publishes a directory wholesale; it has no per-file deploy exclusion.
 * So rather than trusting a rule that says "don't ship templates/*.html", the
 * publish dir is built from an explicit ALLOWLIST and simply never contains
 * them. Anything not named here does not ship.
 *
 * That matters for two things in particular that must never be published:
 *   templates/*.html          the deliverables
 *   dist/deliveries/*         the buyer ledger (order ids + email addresses)
 *
 *   node scripts/build-site.mjs   →   _site/
 */

import { rm, mkdir, cp, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "_site");

// Only these reach the public site. Adding a template means adding a preview,
// never adding templates/<name>.html here.
const ALLOW = [
  { from: "index.html", to: "index.html", required: true },
  { from: "projects.html", to: "projects.html", required: true },
  { from: "about.html", to: "about.html", required: true },
  { from: "case-study.html", to: "case-study.html", required: true },
  // Site-wide CSS, JS and logo for the agency pages.
  { from: "assets", to: "assets", required: true },
  { from: "preview.html", to: "preview.html", required: true },
  { from: "previews", to: "previews", required: true },
  // Images only. Previews reference these as ../templates/assets/, so the path
  // shape has to be preserved inside the publish dir.
  { from: "templates/assets", to: "templates/assets", required: true },
  { from: "robots.txt", to: "robots.txt" },
  { from: "favicon.ico", to: "favicon.ico" },
  // Netlify only honours these at the publish-dir root, not the repo root.
  { from: "_headers", to: "_headers" },
  { from: "_redirects", to: "_redirects" },
];

/** Nothing may ship that could be a deliverable or a delivery record. */
const FORBIDDEN = [
  { test: (p) => /^templates\/.*\.html$/.test(p), why: "full template deliverable" },
  { test: (p) => p.startsWith("dist/"), why: "delivery ledger / buyer data" },
];

async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(abs, base)));
    else out.push(path.relative(base, abs).split(path.sep).join("/"));
  }
  return out;
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

console.log("\nAssembling publish directory → _site/\n");

for (const item of ALLOW) {
  const src = path.join(ROOT, item.from);
  if (!existsSync(src)) {
    if (item.required) {
      console.error(`  MISSING  ${item.from} — run \`pnpm previews\` first?`);
      process.exit(1);
    }
    console.log(`  skip     ${item.from} (absent)`);
    continue;
  }
  const dest = path.join(OUT, item.to);
  await mkdir(path.dirname(dest), { recursive: true });
  await cp(src, dest, { recursive: true });
  const s = await stat(src);
  console.log(`  copy     ${item.from}${s.isDirectory() ? "/" : ""}`);
}

// Assert, don't assume: fail the build rather than publish a deliverable.
const shipped = await walk(OUT);
const violations = shipped.flatMap((f) => {
  const hit = FORBIDDEN.find((r) => r.test(f));
  return hit ? [{ file: f, why: hit.why }] : [];
});

if (violations.length) {
  console.error(`\n  REFUSING TO PUBLISH — ${violations.length} forbidden file(s):`);
  for (const v of violations) console.error(`    ${v.file}  (${v.why})`);
  console.error("");
  process.exit(1);
}

const html = shipped.filter((f) => f.endsWith(".html"));
console.log(`\n  ${shipped.length} files · ${html.length} html · no deliverables, no ledger ✓\n`);
