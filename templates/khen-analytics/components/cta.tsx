import { Button, Container } from "@tp/ui";

export function Cta() {
  return (
    <section className="bg-neutral-50 px-4 py-14 text-center mob:px-6 mob:py-24">
      <Container>
        <h2 className="mb-4 text-3xl font-bold leading-[38px] tracking-[-0.02em] tab:text-[40px] tab:leading-tight">
          Start your free trial
        </h2>
        <p className="mb-8 text-lg text-neutral-500 tab:text-[19px]">
          Join over 4,000+ startups already growing with Khen.
        </p>
        <div className="flex flex-col items-stretch justify-center gap-3 mob:flex-row">
          <Button variant="outline" className="bg-neutral-0 shadow-sm">
            Learn more
          </Button>
          <Button>Get started</Button>
        </div>
      </Container>
    </section>
  );
}
