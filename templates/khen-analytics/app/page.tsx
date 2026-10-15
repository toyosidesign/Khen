import { Container } from "@tp/ui";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { Metrics } from "@/components/metrics";
import { Showcase } from "@/components/showcase";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Testimonial } from "@/components/testimonial";

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <LogoCloud />
        <Rule />
        <Features />
        <Testimonial />
        <Showcase />
        <Rule />
        <Faq />
        <Metrics />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}

function Rule() {
  return (
    <Container>
      <hr className="h-px border-0 bg-neutral-200" />
    </Container>
  );
}
