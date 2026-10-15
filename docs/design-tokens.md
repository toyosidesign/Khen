# Design tokens

## One file, three outputs

`packages/tokens/src/index.ts` is the single source of truth. Two files are
**generated** from it and must never be edited by hand:

    packages/tokens/src/index.ts
             │   pnpm tokens:build
             ├─→ src/tokens.css              CSS custom properties
             └─→ src/figma-variables.json    Figma variable import

The Tailwind preset (`packages/config/tailwind-preset.cjs`) is a third consumer:
it maps utility classes onto the CSS variables, so `bg-brand-500` resolves to
`var(--color-brand-500)` at runtime rather than baking a hex value in.

That indirection is what makes a re-skin instant — change the variable and every
compiled utility class follows without recompiling Tailwind.

## Re-branding

Edit the values in `index.ts`, then:

    pnpm tokens:build

Every template, every component, and the Figma export update together. For a
client re-skin, `colors.brand` is usually the only group you touch.

```ts
export const colors = {
  brand: {
    50: "#eef4ff", 100: "#d9e6ff", 200: "#bcd3ff", 300: "#8db6ff",
    400: "#578dff", 500: "#2f66f5", 600: "#1d4ed8", 700: "#1b3fb0",
    800: "#1c368c", 900: "#1c316f",
  },
  // …neutral, success, warning, danger
}
```

Keep the full 50→900 ramp. Components reference specific steps — `Button`'s
primary variant uses `brand-500` with a `brand-600` hover — so a partial ramp
leaves holes.

## What is available

| Group | Keys | CSS variable |
|---|---|---|
| `colors.brand` | 50–900 | `--color-brand-500` |
| `colors.neutral` | 0–950 | `--color-neutral-700` |
| `colors.success` / `warning` / `danger` | 500 | `--color-success` |
| `spacing` | 0–32 | `--space-6` |
| `radius` | none, sm–2xl, full | `--radius-lg` |
| `typography.fontFamily` | display, body, mono | `--font-display` |
| `typography.fontSize` | xs–7xl | `--text-4xl` |
| `typography.fontWeight` | regular–bold | `--weight-semibold` |
| `typography.lineHeight` | tight–relaxed | `--leading-normal` |
| `shadow` | sm–xl | `--shadow-lg` |

Single-shade colour groups also get a bare alias, so both `--color-success` and
`--color-success-500` resolve.

## Using them

**In Tailwind** (templates extend the preset, so these just work):

```jsx
<div className="bg-brand-500 text-neutral-0 rounded-xl shadow-lg font-display">
```

**In plain CSS:**

```css
@import "@tp/tokens/css";
.cta { background: var(--color-brand-500); border-radius: var(--radius-xl); }
```

**In TypeScript**, when you need a value rather than a class:

```ts
import tokens from "@tp/tokens";
tokens.colors.brand[500]; // "#2f66f5"
```

## Figma

`figma-variables.json` is a W3C-format token file. Import it with any Figma
variables-import plugin and your file gets the same colours, spacing, radii,
type scale and shadows as the code, under the same names.

Re-run `pnpm tokens:build` and re-import after a re-brand to keep them in step.

> **Note on scope.** This is a *variables* export, not a Figma component library.
> It gives your design file the same tokens as the code; it does not contain
> pre-built component frames.

## Keeping it honest

`pnpm tokens:check` exits non-zero if the generated files no longer match
`index.ts`. Wire it into CI — it is the only thing preventing the silent drift
that hand-maintained exports always develop.
