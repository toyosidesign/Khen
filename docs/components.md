# Components — `@tp/ui`

React components built on [design tokens](design-tokens.md). They ship as
TypeScript source, not a compiled bundle, so you can read and edit them.

```tsx
import { Button, Card, CardTitle, Badge, Container, Accordion, SectionHeading } from "@tp/ui";
```

Every component forwards its native props (`className`, `onClick`, `aria-*`, …)
and merges `className` through `cn()`, so you can always override styling
without forking the component.

---

## Button

```tsx
<Button>Get started</Button>
<Button variant="outline" size="lg">Read the docs</Button>
<Button variant="ghost" size="sm" disabled>Cancel</Button>
```

| Prop | Values | Default |
|---|---|---|
| `variant` | `primary`, `secondary`, `outline`, `ghost` | `primary` |
| `size` | `sm`, `md`, `lg` | `md` |

Extends `React.ButtonHTMLAttributes` and forwards its ref. Focus rings use
`brand-500`; disabled drops to 50% opacity and removes pointer events.

## Card

Four composable parts — use only what you need.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Unlimited cards</CardTitle>
  </CardHeader>
  <CardContent>Issue as many as your team needs.</CardContent>
</Card>
```

All four take native `div` props (`CardTitle` renders a heading).

## Badge

```tsx
<Badge>New</Badge>
```

A `span` with pill styling. Takes native span props.

## Container

Page gutter and max width — `max-w-[1216px]` with `px-6`, centred.

```tsx
<Container>
  <section>…</section>
</Container>
```

Every template section sits in one, which is what keeps horizontal rhythm
identical across templates. Override the width with `className` when a section
needs to be wider.

## SectionHeading

Eyebrow + title + description — the block that opens nearly every marketing
section.

```tsx
<SectionHeading
  eyebrow="Features"
  title="All you need to run your finances effectively"
  description="Open a full-featured account in less than 5 minutes."
/>
```

| Prop | Type | Notes |
|---|---|---|
| `title` | `ReactNode` | required |
| `eyebrow` | `string` | small brand-coloured label above the title |
| `description` | `ReactNode` | |
| `nowrapTitle` | `boolean` | keep the title on one line above the tablet breakpoint |
| `className` | `string` | |

## Accordion

Single-open accordion, used by the FAQ section of the marketing templates.

```tsx
<Accordion
  items={[{ question: "Is there a free trial?", answer: "30 days, no card." }]}
  defaultOpen={0}
/>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | `{ question, answer }[]` | required | |
| `defaultOpen` | `number \| null` | `0` | `null` renders all closed |

Extends `React.HTMLAttributes<HTMLDivElement>`.

## cn()

The class merge helper the components use — `clsx` + `tailwind-merge`, so later
classes win conflicts instead of both landing in the DOM.

```tsx
import { cn } from "@tp/ui";
cn("px-4 text-sm", isActive && "text-brand-500", className);
```

---

## Extending

These are source files, not a locked dependency. To add a variant, edit
`packages/ui/src/components/button.tsx` — the `cva` variants object is the whole
API surface. Export anything new from `packages/ui/src/index.ts`.

Style with token-backed utility classes (`bg-brand-500`, `rounded-xl`) rather
than raw hex, or your addition will not follow a re-brand.
