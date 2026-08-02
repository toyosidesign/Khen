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
