# Changelog

All notable changes to this project are documented here. This project follows
[Semantic Versioning](https://semver.org/); see [docs/updates.md](docs/updates.md)
for what counts as breaking.

## [Unreleased]

### Added

- **Mono** — fintech landing template (`templates/mono-fintech.html`): hero with
  card artwork, logo cloud, six-feature grid, CTA.
- **Documentation** — `docs/`: getting started, design tokens, component
  reference, adding a template, and this update policy.
- **Token generator** (`scripts/build-tokens.mjs`) — `tokens.css` and
  `figma-variables.json` are now generated from `packages/tokens/src/index.ts`.
  `pnpm tokens:check` fails the build if they drift.
- **Preview pipeline** (`scripts/build-previews.mjs`) — generates gated public
  previews: truncates to the first N sections, appends a purchase gate, prunes
  the CSS belonging to withheld sections, and minifies.
- **Publish pipeline** (`scripts/build-site.mjs`) — assembles `_site/` from an
  allowlist and refuses to publish if a deliverable or the delivery ledger
  appears in it.
- **Delivery stamping** (`scripts/stamp-delivery.mjs`) — per-buyer fingerprinted
  copies, with `verify` to trace a leaked file back to its order.
- **Licence** — `LICENSE.md` covering standard and extended tiers.
- `Accordion`, `Container` and `SectionHeading` added to `@tp/ui`.

### Changed

- **Token outputs are now generated.** `figma-variables.json` previously carried
  3 of 10 brand shades, 3 of 12 neutrals, and no spacing, type or shadow, while
  describing itself as a mirror of `index.ts`. It is now complete: 25 colours
  plus spacing, radius, type and shadow.
- `pnpm tokens:build` now does something. `@tp/tokens` had no build script, so
  the documented command was a no-op against hand-maintained files.
- `tokens.css` gained 37 properties (spacing, font size, weight, line height,
  and the full colour ramps). No existing property was removed or changed.
- Aurora: feature rows centre their copy when stacked; section headings and
  feature copy share a 40px inset on mobile, matching Khen.
- Mono: hero artwork is now an image asset rather than CSS-composed cards.
- Gallery: "Use Template" is a checkout action instead of a direct link to the
  template file; previews are served from `previews/`.

### Fixed

- **CSS pruner shipped withheld styles.** A comment before an `@media` rule was
  absorbed into its prelude, so the at-rule check missed it and the entire block
  passed through unpruned — while the build reported success. Covered by a
  regression test.
- `packages/config/tailwind-preset` is CommonJS. As ESM, Tailwind received
  `{ default: … }`, silently dropped the theme, and every `brand-*` utility
  vanished with no error.
- The preview harness rewrites any `?src=` into `previews/`, so it cannot be
  used to proxy arbitrary files.

### Removed

- Khen: the "New feature — Check out the team dashboard" hero badge, and its CSS.

## [0.1.0]

- Initial platform: `@tp/tokens`, `@tp/config`, `@tp/ui`, and the
  Khen and Aurora analytics landing templates.
