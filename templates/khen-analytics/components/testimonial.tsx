import { Container } from "@tp/ui";

export function Testimonial() {
  return (
    <section className="bg-neutral-50 py-14 text-center mob:py-24">
      <Container>
        <span className="inline-flex items-center gap-2.5 text-[22px] font-bold text-neutral-900">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-6.5 w-6.5" width={26} height={26}>
            <defs>
              <linearGradient
                id="allure"
                x1="0"
                y1="0"
                x2="24"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                {/* Token-driven: the mark reskins with the brand ramp. */}
                <stop stopColor="var(--color-brand-500)" />
                <stop offset="1" stopColor="var(--color-brand-700)" />
              </linearGradient>
            </defs>
            <path
              d="M12 1.5c.8 5 4 8.2 9 9-5 .8-8.2 4-9 9-.8-5-4-8.2-9-9 5-.8 8.2-4 9-9Z"
              fill="url(#allure)"
            />
          </svg>
          Allure
        </span>

        <blockquote className="mx-auto my-7 max-w-[900px] text-2xl font-medium leading-[1.35] tracking-[-0.01em] tab:text-[34px]">
          We&apos;ve been using Khen to kick start every new project and
          can&apos;t imagine working without it.
        </blockquote>

        <div className="mt-10 flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/avatar-candice.png"
            alt="Candice Wu"
            className="mb-4 h-16 w-16 rounded-full object-cover ring-4 ring-brand-500/10"
          />
          <div className="text-base font-semibold">Candice Wu</div>
          <div className="mt-0.5 text-[15px] text-neutral-500">
            Product Manager, Allure
          </div>
        </div>
      </Container>
    </section>
  );
}
