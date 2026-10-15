import { test } from "node:test";
import assert from "node:assert/strict";
import { pruneCss, collectUsed, elementsByClass, trimRepeats } from "./build-previews.mjs";

const used = new Set([".hero", ".btn"]);
const has = (css, sel) => new RegExp(`(?<![-\\w])\\${sel}(?![-\\w])`).test(css);

test("drops rules whose selectors reference unused classes", () => {
  const out = pruneCss(".hero{color:red}.footer{color:blue}", used);
  assert.ok(has(out, ".hero"));
  assert.ok(!has(out, ".footer"));
});

test("keeps element/global selectors that name no class", () => {
  const out = pruneCss("body{margin:0}*{box-sizing:border-box}:root{--x:1px}", used);
  assert.match(out, /body\{/);
  assert.match(out, /\*\{/);
  assert.match(out, /:root\{/);
});

test("prunes inside @media", () => {
  const out = pruneCss("@media (max-width:560px){.hero{padding:0}.footer{gap:8px}}", used);
  assert.ok(has(out, ".hero"));
  assert.ok(!has(out, ".footer"));
});

// The regression: a comment in front of an at-rule became part of its prelude,
// so it missed the @media branch, fell through to the selector branch, matched
// vacuously (no class tokens), and shipped the entire block unpruned.
test("a comment before @media does not defeat pruning", () => {
  const out = pruneCss("/* --- RESPONSIVE --- */\n@media (max-width:960px){.footer{gap:8px}}", used);
  assert.ok(!has(out, ".footer"), "withheld class leaked through a commented at-rule");
});

test("unknown at-rules never ship their body unpruned", () => {
  const out = pruneCss("@layer base{.footer{gap:8px}.hero{gap:4px}}", used);
  assert.ok(!has(out, ".footer"));
  assert.ok(has(out, ".hero"));
});

test("keyframes and font-face survive untouched", () => {
  const css = "@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}";
  assert.match(pruneCss(css, used), /@keyframes spin\{/);
  const ff = '@font-face{font-family:"X";src:url(x.woff2)}';
  assert.match(pruneCss(ff, used), /@font-face\{/);
});

test("drops only the dead selectors from a selector list", () => {
  const out = pruneCss(".btn,.footer .btn{color:red}", used);
  assert.ok(has(out, ".btn"));
  assert.ok(!has(out, ".footer"));
});

test("a class inside :not()/:is() does not kill the rule", () => {
  const out = pruneCss(".hero:not(.collapsed){color:red}", used);
  assert.ok(has(out, ".hero"), "functional pseudo args must not count as required tokens");
});

/* ── trimming repeated blocks inside the last kept section ── */

const ROWS =
  '<div class="frows">' +
  '<div class="frow"><h3>One</h3><p>a</p></div>' +
  '<div class="frow rev"><h3>Two</h3><p>b</p></div>' +
  '<div class="frow"><h3>Three</h3><p>c</p></div>' +
  "</div>";

test("elementsByClass finds siblings without matching the container", () => {
  const found = elementsByClass(ROWS, "frow");
  assert.equal(found.length, 3, "'frows' container must not match 'frow'");
  assert.match(ROWS.slice(found[0].start, found[0].end), /One/);
});

test("keepThrough cuts after the block containing the text", () => {
  const { markup, kept, dropped } = trimRepeats(ROWS, { repeat: "frow", keepThrough: "One" });
  assert.equal(kept, 1);
  assert.equal(dropped, 2);
  assert.ok(markup.includes("One") && !markup.includes("Two") && !markup.includes("Three"));
});

test("keepThrough matches a later block and keeps the ones before it", () => {
  const { markup, kept } = trimRepeats(ROWS, { repeat: "frow", keepThrough: "Two" });
  assert.equal(kept, 2);
  assert.ok(markup.includes("One") && markup.includes("Two") && !markup.includes("Three"));
});

test("trimming leaves balanced markup", () => {
  const { markup } = trimRepeats(ROWS, { repeat: "frow", keepThrough: "One" });
  assert.equal((markup.match(/<div/g) || []).length, (markup.match(/<\/div>/g) || []).length);
});

test("keep:N is used when keepThrough is absent", () => {
  const { markup, kept } = trimRepeats(ROWS, { repeat: "frow", keep: 2 });
  assert.equal(kept, 2);
  assert.ok(!markup.includes("Three"));
});

test("a missing keepThrough target fails loudly rather than shipping everything", () => {
  assert.throws(() => trimRepeats(ROWS, { repeat: "frow", keepThrough: "Nope" }), /not found/);
});

test("collectUsed harvests markup classes, ids, and script literals", () => {
  const u = collectUsed('<div class="a b" id="main"></div>', ['el.classList.add("open-menu")']);
  assert.ok(u.has(".a") && u.has(".b") && u.has("#main") && u.has(".open-menu"));
});

test("runtime-toggled classes are never pruned", () => {
  // Compound selectors, so assert on the literal text rather than has() —
  // its lookbehind only recognises a class at the start of a compound.
  const out = pruneCss(".hero.active{color:red}.hero.open{color:blue}", collectUsed('<div class="hero"></div>', []));
  assert.ok(out.includes(".hero.active"));
  assert.ok(out.includes(".hero.open"));
});
