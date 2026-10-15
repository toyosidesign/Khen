import { Container } from "@tp/ui";

export function LogoCloud() {
  return (
    <section className="pb-10 pt-6 mob:pb-[72px] mob:pt-12">
      <Container>
        <picture>
          <source
            media="(max-width: 560px)"
            srcSet="/assets/social-proof-mobile.png"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/social-proof.png"
            alt="Join 4,000+ companies already growing: coinbase, Spotify, slack, Dropbox, webflow, zoom"
            className="block h-auto w-full"
          />
        </picture>
      </Container>
    </section>
  );
}
