# Updates

## What is included

Every licence includes updates published during your access period, at no extra
cost:

- **Fixes** — layout bugs, accessibility and browser-compatibility issues
- **Improvements** — refinements to existing templates and components
- **New components** added to `@tp/ui`
- **Token and tooling updates** — the build scripts and design-token pipeline

New *templates* released after your purchase are separate products and are not
included, unless your purchase explicitly said otherwise.

See [CHANGELOG.md](../CHANGELOG.md) for what has shipped.

## How to take an update

You bought source, so an update is a merge rather than an install.

**If you kept the repository as your base**, pull and reconcile:

    git remote add upstream <your-access-url>
    git fetch upstream
    git diff HEAD upstream/main -- packages/    # review before merging
    git merge upstream/main

**If you copied a template out**, the surface that matters is `packages/`.
Diff `packages/tokens`, `packages/ui` and `packages/config` against your copy
and take what you want. Templates themselves are yours once customised, and we
assume you have diverged.

After any update touching tokens:

    pnpm tokens:build
    pnpm tokens:check

## Versioning

Semantic versioning, from the perspective of *your* code:

| Change | Means |
|---|---|
| **Patch** (0.1.x) | Fixes only. Safe to take. |
| **Minor** (0.x.0) | New components, tokens or templates. Additive; existing APIs keep working. |
| **Major** (x.0.0) | Breaking — a token renamed, a component prop removed. The changelog says exactly what and how to migrate. |

Token *values* changing is a patch or minor, not a breaking change — the whole
point is that you override them. Token *names* changing is breaking, because
your CSS references them.

## Stability

These are the contracts we treat as breaking to change:

- CSS custom property names (`--color-brand-500`, `--radius-lg`, …)
- Tailwind utility names from the preset (`bg-brand-500`, `font-display`, …)
- Exported component names and their props
- `@tp/tokens` export shape

Internals — the class strings inside a component, the structure of the build
scripts, the contents of the templates — may change in any release.

## Getting support

Include your order ID. It identifies your licence tier and which version you
received.
