# Template Platform — Documentation

Everything that ships with a licence.

| Guide | What it covers |
|---|---|
| [Getting started](getting-started.md) | Install, run, and open a template |
| [Design tokens](design-tokens.md) | The single source of truth, and how to re-skin |
| [Components](components.md) | The `@tp/ui` API reference |
| [Adding a template](adding-a-template.md) | Structure, preview pipeline, gallery card |
| [Updates](updates.md) | What "updates included" means, and how to take them |

Deployment and the preview/gating pipeline are documented in the
[root README](../README.md).

## The 30-second version

    packages/tokens/src/index.ts     ← the only file you edit to re-brand
             │
             ├─→ tokens.css          CSS custom properties
             ├─→ Tailwind preset     bg-brand-500, font-display, rounded-xl…
             └─→ figma-variables     import into Figma

    packages/ui/                     React components built on those tokens
    templates/                       pages built from those components

Change a brand colour in one place and every template and component follows —
in code *and* in the design file. That is the product; the pages are the demo.
