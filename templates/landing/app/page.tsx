import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@tp/ui";

const features = [
  {
    title: "One source of truth",
    body: "Colors, type, spacing and shadow live in @tp/tokens. Change a value once; code and Figma both follow.",
  },
  {
    title: "Shared components",
    body: "Every template imports the same Button, Card and Badge from @tp/ui — so the whole catalog feels like one product.",
  },
  {
    title: "Re-skin in minutes",
    body: "Edit the brand ramp in tokens and every template restyles automatically. Design system as a deliverable.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-24 text-center">
        <Badge>Design system as a product</Badge>
        <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-neutral-900 sm:text-6xl">
          Build the system once.
          <br />
          <span className="text-brand-500">Ship every template</span> from it.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
          This page is a live template in <code className="font-mono text-brand-600">templates/landing</code>.
          It imports <code className="font-mono text-brand-600">@tp/ui</code> and inherits the shared
          Tailwind preset from <code className="font-mono text-brand-600">@tp/config</code>.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">
            View components
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent>{f.body}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Button showcase — proves the shared variants render */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Card>
          <CardHeader>
            <CardTitle>Component variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-semibold text-neutral-900">
            Re-skin this for a client
          </h2>
          <p className="max-w-xl text-neutral-600">
            Edit <code className="font-mono text-brand-600">packages/tokens/src/index.ts</code> and{" "}
            <code className="font-mono text-brand-600">tokens.css</code>. Every template and component
            updates — no per-file find-and-replace.
          </p>
          <Button size="lg">Duplicate template</Button>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-neutral-400">
        Built on the @tp design system · tokens · config · ui
      </footer>
    </main>
  );
}
