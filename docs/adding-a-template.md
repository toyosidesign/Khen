# Adding a template

Two paths, depending on which kind you are adding.

## A standalone HTML template

Create `templates/<slug>.html` as one self-contained file. Follow the existing
ones (`khen-analytics`, `aurora-analytics`, `mono-fintech`) — they define the
house conventions:

- A `:root` block of CSS variables at the top, so the page re-skins from one place
- `.wrap` for the page gutter (`max-width` + auto margins + horizontal padding)
- Breakpoints at **960px** (tablet) and **560px** (mobile)

### The one structural requirement

**Every major block must be a `<section>` that is a direct child of `<body>`.**

```html
<body>
  <header class="nav">…</header>
  <section class="hero wrap">…</section>
  <section class="logos">…</section>
  <section class="features wrap">…</section>
  <section class="cta wrap">…</section>
  <footer>…</footer>
</body>
```

The preview builder finds top-level `<section>` elements to decide where to cut
the public preview. Nest them inside a wrapper `div` and it finds none — the
page then passes through **ungated**, publishing the whole template. The build
logs `passthrough — no sections to withhold`; treat that line as an error on a
real template.

### Asset paths

Reference assets as `./assets/…`. The preview build rebases them automatically
to `../templates/assets/…`. Shared images live in `templates/assets/`;
template-specific ones in `templates/assets/<slug>/`.

## A Next.js template

Create `templates/<slug>/` with its own `package.json` depending on `@tp/ui`,
`@tp/tokens` and `@tp/config`, then extend the shared preset:

```js
// tailwind.config.js
module.exports = { presets: [require("@tp/config/tailwind")], content: [...] };
```

Import the token stylesheet once at the app root:

```ts
import "@tp/tokens/css";
```

Next must transpile the workspace packages, since they ship raw TypeScript:

```js
// next.config.mjs
export default { transpilePackages: ["@tp/ui", "@tp/tokens", "@tp/config"] };
```

## Wiring it into the marketplace

**1. Build the preview.**

    pnpm previews

Check the output line. `3/9 sections` means gating worked; `passthrough` means
it did not.

**2. Decide how much to withhold.** The default keeps the first 3 sections. If a
template has few sections, gating them alone may withhold almost nothing — cut
inside the last kept section too, in `scripts/build-previews.mjs`:

```js
const TRIM_LAST_SECTION = {
  "mono-fintech": { repeat: "feat", keepThrough: "Advanced analytics" },
};
```

`keepThrough` matches on text, so it survives the blocks being reordered — and
throws if the text disappears, rather than silently publishing everything.

**3. Add the gallery card** in `projects.html`. Copy an existing `<article
class="card">` and change the slug, title, category and description.

> **Never link a card to `templates/<slug>.html`.** That is the deliverable.
> "Use Template" is a checkout action; "Preview" points at
> `preview.html?src=previews/<slug>.html`.

Make sure `data-category` matches an existing filter pill, or add one.

**4. Add a thumbnail.** 16:10, ~1200×750, at `templates/assets/<slug>-thumb.png`,
referenced as `<img class="thumb-img">`. Without one, use the `.thumb-scene`
gradient placeholder that the stub cards use.

**5. Rebuild the site.**

    pnpm site

This assembles `_site/` from an allowlist and **fails the build** if a
deliverable or the delivery ledger ends up in it.

## Checklist

- [ ] Sections are direct children of `<body>`
- [ ] `pnpm previews` reports a section count, not `passthrough`
- [ ] Preview withholds something worth paying for
- [ ] Gallery card links to `previews/`, never `templates/`
- [ ] `data-category` matches a filter pill
- [ ] Thumbnail present
- [ ] `pnpm site` passes
