import { Button, Container } from "@tp/ui";
import { ArrowRight, Play } from "./icons";

export function Hero() {
  return (
    <section className="pt-14 text-center mob:pt-24">
      <Container className="px-4 mob:px-6">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-100 bg-brand-50 py-0.5 pl-0.5 pr-2 text-xs font-medium text-brand-700 mob:gap-3 mob:border-neutral-200 mob:bg-neutral-50 mob:py-1 mob:pl-1 mob:pr-3 mob:text-sm mob:text-neutral-600">
          <span className="rounded-full border border-brand-100 bg-neutral-0 px-2 py-px font-semibold text-brand-700 mob:border-neutral-200 mob:px-2.5 mob:py-0.5 mob:shadow-sm">
            New feature
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
            Check out the team dashboard
            <ArrowRight className="h-3.5 w-3.5 mob:h-4 mob:w-4" />
          </span>
        </span>

        <h1 className="mx-auto mt-6 max-w-[820px] text-4xl font-bold leading-[44px] tracking-[-0.02em] mob:text-5xl mob:leading-[1.08] tab:text-6xl">
          Beautiful analytics to grow smarter
        </h1>

        <p className="mx-auto mt-6 max-w-[620px] text-lg text-neutral-500 mob:text-xl">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users. Trusted by over 4,000 startups.
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 mob:flex-row">
          <Button variant="outline" className="h-12 bg-neutral-0 shadow-sm">
            <Play /> Demo
          </Button>
          <Button className="h-12">Sign up</Button>
        </div>

        <div className="mx-auto mt-10 max-w-[1080px] mob:mt-16">
          <picture>
            <source
              media="(max-width: 560px)"
              srcSet="/assets/hero-dashboard-mobile.png"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero-dashboard.png"
              alt="Khen analytics dashboard, Stats for Olivia Rhye"
              className="block h-auto w-full"
            />
          </picture>
        </div>
      </Container>
    </section>
  );
}
