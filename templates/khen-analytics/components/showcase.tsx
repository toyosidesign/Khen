import { Container, SectionHeading } from "@tp/ui";
import { FeatureCard } from "./feature-card";
import { BarChart, ChatCheck, Inbox } from "./icons";

const HIGHLIGHTS = [
  {
    icon: <Inbox />,
    title: "Share team inboxes",
    body: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone in the loop.",
  },
  {
    icon: <ChatCheck />,
    title: "Deliver instant answers",
    body: "An all-in-one customer service platform that helps you balance everything customers need.",
  },
  {
    icon: <BarChart />,
    title: "Manage your team with reports",
    body: "Measure what matters with Khen's easy-to-use reports. Filter, export, and drilldown fast.",
  },
];

export function Showcase() {
  return (
    <section className="py-14 mob:py-24">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Cutting-edge features for advanced analytics"
          description="Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users."
          nowrapTitle
        />

        <div className="mx-auto mt-8 max-w-[600px] mob:mt-12 tab:max-w-none">
          <picture>
            <source
              media="(max-width: 560px)"
              srcSet="/assets/features-showcase-mobile.png"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/features-showcase.png"
              alt="Khen dashboard on desktop and mobile, MRR, members, and recent posts"
              className="block h-auto w-full"
            />
          </picture>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 px-6 mob:mt-12 mob:grid-cols-2 mob:gap-x-12 tab:grid-cols-3 tab:gap-x-8 tab:px-0">
          {HIGHLIGHTS.map((f) => (
            <FeatureCard key={f.title} {...f} learnMore />
          ))}
        </div>
      </Container>
    </section>
  );
}
