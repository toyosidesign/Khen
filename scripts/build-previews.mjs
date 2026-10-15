#!/usr/bin/env node
/**
 * build-previews.mjs — turn full templates into safe-to-serve previews.
 *
 *   templates/<name>.html   full deliverable   NEVER deployed
 *          │
 *          ▼  this script
 *   previews/<name>.html    hero + N sections, gated, CSS-pruned, minified
 *
 * The point is that scraping the preview yields a partial page whose stylesheet
 * has had the rules for the withheld sections removed — not a shippable product.
 *
 *   node scripts/build-previews.mjs [--sections N] [--out DIR]
 */

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "templates");

// How many top-level <section>s survive, per template. Hero counts as one.
const SECTION_BUDGET = { default: 3 };

// Optional finer cut *inside* the last kept section, for templates whose
// natural stopping point is a repeated block rather than a section boundary.
//   repeat      class of the repeated block
//   keepThrough keep blocks up to and including the one containing this text
//   keep        …or just keep the first N (used when keepThrough is absent)
// keepThrough is preferred: it survives the rows being reordered.
const TRIM_LAST_SECTION = {
  "aurora-analytics": { repeat: "frow", keepThrough: "Share team inboxes" },
  // Mono has only 4 sections, so gating the CTA alone would withhold almost
  // nothing — cut the feature grid to its first row as well.
  "mono-fintech": { repeat: "feat", keepThrough: "Advanced analytics" },
};

// Classes toggled by script at runtime never appear in the static markup, so
// the CSS pruner would wrongly consider them dead. Belt-and-braces: we also
// harvest string literals out of retained <script> blocks (see collectUsed).
const ALWAYS_KEEP_CLASSES = ["open", "active", "show", "hide", "hidden", "is-open", "scrolled"];

const RAWTEXT = new Set(["script", "style", "textarea", "title"]);
// Escape sequence, not a literal NUL byte — a raw NUL in the source makes
// grep treat this file as binary and silently skip it.
const NUL = "\u0000";

/* ── stash: pull <script>/<style> out so regex work can't trip over their contents ── */

function stash(html) {
  const blocks = [];
  const out = html.replace(
    /<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
    (m, tag) => (blocks.push({ tag: tag.toLowerCase(), text: m }), `${NUL}S${blocks.length - 1}${NUL}`)
  );
  return { html: out, blocks };
}

const unstash = (html, blocks) => html.replace(new RegExp(`${NUL}S(\\d+)${NUL}`, "g"), (_, i) => blocks[+i].text);

/* ── tag walker over stashed (script/style-free) markup ── */

function* walkTags(html) {
  const re = /<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    yield {
      name: m[2].toLowerCase(),
      close: m[1] === "/",
      selfClose: m[4] === "/" || RAWTEXT.has(m[2].toLowerCase()),
      start: m.index,
      end: re.lastIndex,
    };
  }
}

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr"]);

/** Ranges of every <section> that is a direct child of <body>. */
function topLevelSections(html) {
  const bodyOpen = html.match(/<body[^>]*>/i);
  const bodyClose = html.search(/<\/body\s*>/i);
  if (!bodyOpen || bodyClose < 0) return null;
  const bodyStart = bodyOpen.index + bodyOpen[0].length;

  const sections = [];
  let depth = 0;
  let current = null;

  for (const t of walkTags(html)) {
    if (t.start < bodyStart || t.start >= bodyClose) continue;
    if (VOID.has(t.name) || (t.selfClose && !t.close)) continue;

    if (!t.close) {
      if (t.name === "section" && depth === 0 && !current) current = { start: t.start };
      depth++;
    } else {
      depth--;
      if (t.name === "section" && depth === 0 && current) {
        sections.push({ ...current, end: t.end });
        current = null;
      }
    }
  }
  return { bodyStart, bodyClose, sections };
}

/** Ranges of every element carrying `cls`, outermost-first, non-overlapping. */
export function elementsByClass(html, cls) {
  const wanted = new RegExp(`class="[^"]*(?<![-\\w])${cls}(?![-\\w])[^"]*"`);
  const ranges = [];
  let depth = 0, open = null, openDepth = 0;

  for (const t of walkTags(html)) {
    if (VOID.has(t.name) || (t.selfClose && !t.close)) continue;
    if (!t.close) {
      if (open === null && wanted.test(html.slice(t.start, t.end))) {
        open = t.start;
        openDepth = depth;
      }
      depth++;
    } else {
      depth--;
      if (open !== null && depth === openDepth) {
        ranges.push({ start: open, end: t.end });
        open = null;
      }
    }
  }
  return ranges;
}

/** Drop the repeated blocks after the chosen cut point. Returns trimmed markup. */
export function trimRepeats(markup, { repeat, keepThrough, keep }) {
  const blocks = elementsByClass(markup, repeat);
  if (blocks.length === 0) return { markup, kept: 0, dropped: 0 };

  let lastKept;
  if (keepThrough) {
    lastKept = blocks.findIndex((b) =>
      markup.slice(b.start, b.end).replace(/<[^>]+>/g, " ").includes(keepThrough));
    if (lastKept < 0) {
      throw new Error(`trim target ${JSON.stringify(keepThrough)} not found in any .${repeat} block`);
    }
  } else {
    lastKept = Math.max(0, (keep ?? 1) - 1);
  }

  // Splice from the end so earlier offsets stay valid.
  let out = markup;
  for (let i = blocks.length - 1; i > lastKept; i--) {
    out = out.slice(0, blocks[i].start) + out.slice(blocks[i].end);
  }
  return { markup: out, kept: lastKept + 1, dropped: blocks.length - 1 - lastKept };
}

/* ── CSS: brace-aware node parser, then drop rules whose selectors are all dead ── */

export function parseCss(css) {
  // Comments must go first: a comment sitting in front of an at-rule would
  // otherwise become part of its prelude and defeat the @media/@keyframes
  // detection below, silently passing the whole block through unpruned.
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const nodes = [];
  let i = 0;
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;

    let j = i, depth = 0, quote = null, opened = -1;
    for (; j < css.length; j++) {
      const c = css[j];
      if (quote) { if (c === quote && css[j - 1] !== "\\") quote = null; continue; }
      if (c === '"' || c === "'") { quote = c; continue; }
      if (c === ";" && depth === 0) { j++; break; }            // statement at-rule
      if (c === "{") { if (depth === 0) opened = j; depth++; continue; }
      if (c === "}") { depth--; if (depth === 0) { j++; break; } }
    }
    const chunk = css.slice(i, j);
    if (opened >= 0) {
      nodes.push({
        prelude: css.slice(i, opened).trim(),
        body: css.slice(opened + 1, j - 1),
      });
    } else if (chunk.trim()) {
      nodes.push({ raw: chunk.trim() });
    }
    i = j;
  }
  return nodes;
}

const NESTED_AT = /^@(media|supports|container|layer|scope)\b/i;
const OPAQUE_AT = /^@(keyframes|-\w+-keyframes|font-face|property|counter-style|page)\b/i;

/** class/id tokens a selector *requires*, ignoring functional pseudos (:not/:is/…). */
function selectorTokens(sel) {
  const bare = sel.replace(/:(not|is|where|has|matches|any)\([^)]*\)/gi, "");
  return (bare.match(/[.#][-\w\\]+/g) || []).map((t) => t.replace(/\\/g, ""));
}

export function pruneCss(css, used) {
  const alive = (node) => {
    if (node.raw) return node.raw + (node.raw.endsWith(";") ? "" : ";");
    if (OPAQUE_AT.test(node.prelude)) return `${node.prelude}{${node.body}}`;
    if (NESTED_AT.test(node.prelude)) {
      const inner = pruneCss(node.body, used);
      return inner.trim() ? `${node.prelude}{${inner}}` : "";
    }
    // Any other at-rule: never fall through to the selector branch below, where
    // a prelude with no class/id tokens would vacuously "match" and ship whole.
    if (node.prelude.startsWith("@")) {
      if (!node.body.includes("{")) return `${node.prelude}{${node.body}}`;
      const inner = pruneCss(node.body, used);
      return inner.trim() ? `${node.prelude}{${inner}}` : "";
    }
    const kept = node.prelude
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s && selectorTokens(s).every((t) => used.has(t)));
    return kept.length ? `${kept.join(",")}{${node.body.trim()}}` : "";
  };
  return parseCss(css).map(alive).filter(Boolean).join("");
}

/* ── what the retained markup actually uses ── */

export function collectUsed(markup, scripts) {
  const used = new Set(ALWAYS_KEEP_CLASSES.map((c) => "." + c));
  for (const m of markup.matchAll(/\sclass="([^"]*)"/g))
    for (const c of m[1].split(/\s+/)) if (c) used.add("." + c);
  for (const m of markup.matchAll(/\sid="([^"]*)"/g)) if (m[1]) used.add("#" + m[1].trim());
  // Class names that only ever appear as JS string literals.
  for (const src of scripts)
    for (const m of src.matchAll(/["'`]([^"'`\n]{1,80})["'`]/g))
      for (const w of m[1].split(/\s+/)) if (/^[-\w]+$/.test(w)) { used.add("." + w); used.add("#" + w); }
  return used;
}

/* ── the gate ── */

const gate = ({ name }) => `
<div class="tp-gate" role="complementary" aria-label="Preview limit">
  <div class="tp-gate-in">
    <p class="tp-gate-eyebrow">Preview</p>
    <h2 class="tp-gate-title">See the full design, end to end</h2>
    <p class="tp-gate-copy">
      This preview stops after the first few sections. In a demo we'll walk you
      through ${name} in full — every section, how it responds across desktop,
      tablet and mobile, and the design system underneath that re-skins the
      whole thing in minutes.
    </p>
    <div class="tp-gate-actions">
      <a class="tp-gate-btn" href="../projects.html#whats-included">Book a demo</a>
      <a class="tp-gate-link" href="../projects.html">Browse all projects</a>
    </div>
  </div>
</div>
<style>
.tp-gate{position:relative;margin-top:-140px;padding:200px 24px 96px;text-align:center;
  background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.92) 34%,#fff 60%);
  font-family:Inter,system-ui,-apple-system,sans-serif;color:#101828}
.tp-gate-in{max-width:560px;margin:0 auto}
.tp-gate-eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#667085;margin:0 0 12px}
.tp-gate-title{font-size:30px;line-height:1.2;font-weight:700;margin:0 0 14px}
.tp-gate-copy{font-size:16px;line-height:1.6;color:#475467;margin:0 0 28px}
.tp-gate-actions{display:flex;gap:14px;justify-content:center;align-items:center;flex-wrap:wrap}
.tp-gate-btn{display:inline-flex;align-items:center;background:#444ce7;color:#fff;font-weight:600;font-size:15px;
  padding:13px 22px;border-radius:9px;text-decoration:none}
.tp-gate-btn:hover{background:#3538cd}
.tp-gate-link{color:#475467;font-weight:600;font-size:15px;text-decoration:none}
.tp-gate-link:hover{color:#101828}
@media (max-width:600px){.tp-gate{margin-top:-100px;padding:160px 20px 72px}.tp-gate-title{font-size:24px}}
</style>`;

/* ── minify (skeleton only — scripts/styles are stashed at this point) ── */

const minify = (html) =>
  html
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, "")
    .replace(/\s*\n\s*/g, " ")
    .replace(/ {2,}/g, " ")
    .replace(/>\s+</g, "><")
    .trim();

const minifyCss = (css) =>
  css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, "").replace(/ {2,}/g, " ")
     .replace(/\s*([{}:;,>])\s*/g, "$1").replace(/;}/g, "}").trim();

/* ── assets ──
 * Templates reference "./assets/…", which resolved against templates/. Previews
 * live in a sibling directory, so every such URL has to be rebased or the page
 * renders imageless. Plain global replace so srcset lists (where the 2nd URL is
 * comma-separated, not quote-anchored) are covered too.
 */
const rebaseAssets = (html, prefix) => html.split("./assets/").join(prefix);

/* ── per-file build ── */

async function build(file, outDir, budget) {
  const name = path.basename(file, ".html");
  const raw = await readFile(path.join(SRC_DIR, file), "utf8");
  const assetPrefix = path.relative(outDir, path.join(SRC_DIR, "assets")).split(path.sep).join("/") + "/";
  const st = stash(raw);

  const found = topLevelSections(st.html);
  if (!found || found.sections.length === 0) {
    // Stub/placeholder page — nothing to withhold. Emit it anyway so the gallery
    // can point every card at previews/, and so a stub that later grows real
    // sections gets gated automatically instead of silently shipping whole.
    await writeFile(path.join(outDir, `${name}.html`), rebaseAssets(unstash(minify(st.html), st.blocks), assetPrefix));
    console.log(`  ${name.padEnd(24)} passthrough — no sections to withhold (stub)`);
    return { name, sections: 0, kept: 0, stub: true };
  }

  const keep = Math.min(budget, found.sections.length);
  if (keep >= found.sections.length) {
    console.log(`  ${name.padEnd(24)} WARNING: only ${found.sections.length} sections; nothing withheld`);
  }
  const cut = found.sections[keep - 1].end;

  const head = st.html.slice(0, found.bodyStart);
  let kept = st.html.slice(found.bodyStart, cut);

  let trimNote = "";
  const trim = TRIM_LAST_SECTION[name];
  if (trim) {
    const t = trimRepeats(kept, trim);
    kept = t.markup;
    trimNote = ` · .${trim.repeat} ${t.kept} kept, ${t.dropped} dropped`;
  }

  let doc = minify(head) + minify(kept) + "\n</body>\n</html>\n";

  // Retained scripts, for class-literal harvesting.
  const retainedScripts = [...doc.matchAll(new RegExp(`${NUL}S(\\d+)${NUL}`, "g"))]
    .map((m) => st.blocks[+m[1]])
    .filter((b) => b.tag === "script")
    .map((b) => b.text);

  const used = collectUsed(kept, retainedScripts);

  // Prune + minify each stashed <style>; leave <script> untouched.
  const before = st.blocks.reduce((n, b) => n + (b.tag === "style" ? b.text.length : 0), 0);
  const processed = st.blocks.map((b) => {
    if (b.tag !== "style") return b;
    const inner = b.text.replace(/^<style[^>]*>/i, "").replace(/<\/style\s*>$/i, "");
    return { ...b, text: `<style>${minifyCss(pruneCss(inner, used))}</style>` };
  });
  const after = processed.reduce((n, b) => n + (b.tag === "style" ? b.text.length : 0), 0);

  doc = unstash(doc, processed);
  doc = doc.replace(/\n?<\/body>/i, gate({ name: prettyName(name) }) + "\n</body>");
  doc = `<!-- Preview build — truncated at ${keep} of ${found.sections.length} sections.\n` +
        `     Full source is licensed: see LICENSE.md -->\n` + doc;
  doc = rebaseAssets(doc, assetPrefix);

  const outPath = path.join(outDir, `${name}.html`);
  await writeFile(outPath, doc);

  const pct = (n, d) => (d ? Math.round((1 - n / d) * 100) : 0);
  console.log(
    `  ${name.padEnd(24)} ${keep}/${found.sections.length} sections${trimNote} · ` +
    `${(raw.length / 1024).toFixed(1)}K → ${(doc.length / 1024).toFixed(1)}K ` +
    `(-${pct(doc.length, raw.length)}%) · css -${pct(after, before)}%`
  );
  return { name, sections: found.sections.length, kept: keep };
}

const prettyName = (slug) =>
  slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

/* ── main (skipped when this module is imported, e.g. by the tests) ── */

async function main() {
  const argv = process.argv.slice(2);
  const arg = (flag, dflt) => {
    const i = argv.indexOf(flag);
    return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt;
  };

  const outDir = path.resolve(ROOT, arg("--out", "previews"));
  const defaultBudget = Number(arg("--sections", SECTION_BUDGET.default));

  await mkdir(outDir, { recursive: true });
  const files = (await readdir(SRC_DIR)).filter((f) => f.endsWith(".html")).sort();

  console.log(`\nBuilding previews → ${path.relative(ROOT, outDir)}/\n`);
  const results = [];
  for (const f of files) {
    results.push(await build(f, outDir, Number(SECTION_BUDGET[path.basename(f, ".html")] ?? defaultBudget)));
  }
  const built = results.filter(Boolean);
  console.log(`\n${built.length} preview${built.length === 1 ? "" : "s"} built, ${files.length - built.length} skipped.\n`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) await main();
