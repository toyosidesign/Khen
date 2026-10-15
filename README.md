# Template Platform — Monorepo

A shared foundation for building and selling UI templates. Build the design
system once; every template inherits it.

## Structure

    packages/
      tokens/   → single source of truth (colors, type, spacing, radius, shadow)
                  exports TS values, CSS variables, and Figma variables JSON
      config/   → shared Tailwind preset (maps tokens → Tailwind utilities)
      ui/       → shared React components (Button, Card, Badge...) built on tokens
    templates/  → each sellable template imports @tp/ui + @tp/config

## How the sync works

    tokens/index.ts  ──┐
                       ├─→ tokens.css        → imported at every app root
                       ├─→ config preset     → Tailwind utilities (bg-brand-500…)
                       └─→ figma-variables    → import into Figma to match design

Change a brand color in ONE place and it propagates to code + design.

## Getting started

    pnpm install
    pnpm dev            # run all templates in dev
    pnpm tokens:build   # rebuild token outputs

## Re-skinning for a client

Edit `packages/tokens/src/index.ts` + `tokens.css` brand values.
Every template + component restyles automatically. This is the core of the
"design system as a product" offering.

## Adding a new template

    templates/<name>/  with its own package.json depending on @tp/ui, @tp/config
    extend the Tailwind preset:  presets: [require('@tp/config/tailwind')]

## Previews — what is safe to serve

`templates/*.html` are the **full deliverables**. They are the product and must
never be reachable over HTTP. `previews/*.html` are generated from them and are
the only version the site links to.

    templates/<name>.html      full, sellable          NOT deployed
             │
             │  pnpm previews          (scripts/build-previews.mjs)
             ▼
    previews/<name>.html       hero + 2 sections,      deployed
                               gated, CSS-pruned,
                               minified

The build keeps the first 3 top-level `<section>`s, drops the rest, appends a
purchase gate, and **removes the CSS rules belonging to the withheld sections**
so scraping the preview yields a partial page rather than a shippable one. Asset
URLs are rebased to `../templates/assets/`.

    pnpm previews        # regenerate (also runs as part of `pnpm build`)
    pnpm previews:test   # unit tests for the CSS pruner

Tune how much shows via `SECTION_BUDGET` in the script, or `--sections N`.

### Rules that keep this working

1. **Never link to `templates/*.html` from `projects.html`.** "Use Template" is a
   checkout action, not a file link. `preview.html` also force-rewrites any
   `?src=` to `previews/`, so it cannot be used as an open file proxy.
2. **Never publish `templates/*.html`.** Netlify publishes a directory
   wholesale and has no per-file exclusion, so `pnpm site` assembles `_site/`
   from an allowlist instead — see *Deploying* below. `templates/assets/` is
   published (previews need it); the `.html` files are not.
3. **Regenerate after editing a template**, or previews go stale.
4. Placeholder stubs pass through un-gated; once a stub grows real `<section>`s
   the gate applies automatically.

None of this stops screenshots, and it is not meant to — see `LICENSE.md` §4.
It stops the preview from *being* the deliverable.

## Delivery — gate the download, not the view

Revenue leaks after the sale, not before it. Previews are meant to be seen; the
zip is not meant to be forwarded. Nothing prevents forwarding — so instead every
delivered copy is **attributable to the order that leaked it**.

    pnpm deliver -- --template khen-analytics \
                    --order LS-10423 --licensee "Acme Ltd" \
                    --email buyer@acme.com --tier extended

Writes `dist/deliveries/<order>/` with the template stamped, a `LICENSE.md`
naming the licensee, and a `delivery.json` record; appends to a ledger. To trace
a copy someone sent you:

    pnpm deliver:verify -- --file ./leaked.html

The fingerprint is recomputed from the ledger rather than read from the banner,
so editing the comment text does not let a copy impersonate another order.

> **The ledger is the evidence.** `dist/` is gitignored, so
> `dist/deliveries/ledger.jsonl` is not version-controlled and contains buyer
> email addresses. Back it up somewhere durable and private, and treat it as
> personal data.

### What still needs your accounts

The stamping runs locally today. To make it a real gate:

1. **Take payment** with a provider that issues license keys — Lemon Squeezy,
   Polar, or Gumroad. Each sale produces an order id and buyer email, which are
   exactly the two inputs `pnpm deliver` needs.
2. **Deliver via private repo invite or a signed, expiring download URL** rather
   than a public link. A public link is a public link forever, whoever it was
   emailed to.
3. **Call the stamper from the purchase webhook** so the buyer gets their own
   fingerprinted copy instead of a shared build.

## Deploying (Netlify)

    pnpm previews && pnpm site     # → _site/, exactly what goes public

`netlify.toml` sets `publish = "_site"` and runs both steps. The safety property
is structural rather than procedural: `_site/` is built from an **allowlist** in
`scripts/build-site.mjs`, so a file ships only if it is named there.

    _site/
      index.html
      preview.html
      previews/*.html          gated previews
      templates/assets/**      images only — no .html
      robots.txt  _headers  _redirects

After assembling, the build **asserts** that nothing matching `templates/*.html`
or `dist/**` made it in, and exits non-zero if so — a failed Netlify build
rather than a published deliverable. The two things that must never ship:

    templates/*.html        the product
    dist/deliveries/*       the ledger (order ids + buyer email addresses)

`_headers` and `_redirects` live at the repo root and are **copied into**
`_site/`. Netlify only reads them from the publish-dir root; left at the repo
root with a different publish dir they are silently ignored.

To add a template: add `templates/<name>.html`, run `pnpm previews`, and link
the card at `previews/<name>.html`. Never add the deliverable to the allowlist.

## Infra hygiene

| File | Purpose |
|---|---|
| `netlify.toml` | build command, publish dir, Node 22 (scripts need ≥ 20.11) |
| `scripts/build-site.mjs` | allowlist assembly + refuse-to-publish guard |
| `_redirects` | 404s `templates/*.html` and `dist/` as a backstop |
| `_headers` | CSP + security headers |
| `robots.txt` | keeps deliverables out of search indexes |

Two details worth not breaking:

- `X-Frame-Options` is **SAMEORIGIN**, not `DENY` — `preview.html` iframes
  `previews/` from the same origin, and `DENY` would blank the preview stage.
- The CSP carries `'unsafe-inline'` for scripts and styles because every
  template inlines its own CSS/JS. That is a genuine weakening. Removing it
  means extracting inline blocks to files or adding per-build nonces.

Not in the repo, because they are dashboard settings: put the site behind
**Cloudflare** and enable Bot Fight Mode plus a rate limit on the gallery and
`previews/` (a human browses a handful of pages a minute; a scraper pulls all of
them in seconds). Next.js browser source maps are off by default and are not
enabled here — keep it that way, or the component source ships to the client.
