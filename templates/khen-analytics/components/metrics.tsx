import { Container } from "@tp/ui";

const STATS = [
  {
    value: "4,000+",
    title: "Global customers",
    detail: "We've helped over 4,000 amazing global companies.",
  },
  {
    value: "600%",
    title: "Return on investment",
    detail: "Our customers have reported an average of ~600% ROI.",
  },
  {
    value: "10k",
    title: "Global downloads",
    detail: "Our app has been downloaded over 10k times.",
  },
  {
    value: "200+",
    title: "5-star reviews",
    detail: "We're proud of our 5-star rating with over 200 reviews.",
  },
];

export function Metrics() {
  return (
    <section className="py-14 mob:py-24">
      <Container className="px-4 mob:px-6">
        <div className="grid grid-cols-1 items-center gap-10 tab:grid-cols-2 tab:gap-16">
          <div>
            <span className="block text-base font-semibold text-brand-600">
              Launch faster
            </span>
            <h2 className="my-3 whitespace-nowrap text-3xl font-bold leading-[38px] tracking-[-0.02em] tab:whitespace-normal tab:text-[40px] tab:leading-tight">
              Build something great
            </h2>
            <p className="mb-10 text-lg text-neutral-500">
              We&apos;ve done all the heavy lifting so you don&apos;t have to.
              Get all the data you need to launch and grow your business faster.
            </p>

            <div className="grid grid-cols-1 gap-8 mob:grid-cols-2">
              {STATS.map((s) => (
                <div key={s.title} className="text-center mob:text-left">
                  <div className="text-[40px] font-extrabold tracking-[-0.02em] text-brand-600 mob:text-5xl">
                    {s.value}
                  </div>
                  <div className="my-1 font-semibold">{s.title}</div>
                  <div className="text-[15px] text-neutral-500">{s.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/launch-faster.png"
            alt="Team planning on a whiteboard by the window"
            className="block h-[260px] w-full rounded-none object-cover mob:h-[300px] mob:rounded-2xl tab:h-[440px]"
          />
        </div>
      </Container>
    </section>
  );
}
