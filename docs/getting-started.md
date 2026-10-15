# Getting started

## Requirements

- **Node 22 or newer.** The build scripts import TypeScript directly and rely on
  Node's type stripping (Node ≥ 22.6).
- **pnpm 9.** This is a pnpm workspace; npm and yarn will not resolve the
  `workspace:*` dependencies.

## Install and run

    pnpm install
    pnpm dev

`pnpm dev` runs every template in the workspace at once via Turborepo. To run
just one:

    pnpm --filter @tp/template-khen-analytics dev

## What is in the box

    packages/
      tokens/      colours, type, spacing, radius, shadow — the source of truth
      config/      shared Tailwind preset (maps tokens → utility classes)
      ui/          React components built on the tokens
    templates/     the sellable pages
    docs/          this documentation
    scripts/       build tooling (tokens, previews, publish, delivery)

## The two kinds of template

This repository contains both, and the difference matters:

**Standalone HTML** — `templates/<name>.html`. One self-contained file with
inline CSS. No build step, no dependencies; open it in a browser. These are what
the marketing site previews.

**Next.js apps** — `templates/<name>/`. A full app importing `@tp/ui`,
`@tp/tokens` and the Tailwind preset. These are what you extend for real work.

Start from the standalone file if you want the page as-is. Start from the Next
app if you want the design system.

## Commands

| Command | Does |
|---|---|
| `pnpm dev` | Run all templates in dev |
| `pnpm build` | Regenerate previews, then build every package and app |
| `pnpm tokens:build` | Regenerate `tokens.css` + `figma-variables.json` |
| `pnpm tokens:check` | Fail if those outputs are stale (use in CI) |
| `pnpm previews` | Rebuild the gated public previews |
| `pnpm site` | Assemble the deployable `_site/` directory |
| `pnpm previews:test` | Unit tests for the preview build |

## Next

Re-branding is one file — see [Design tokens](design-tokens.md).
