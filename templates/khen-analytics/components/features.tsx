import { Container, SectionHeading } from "@tp/ui";
import { FeatureCard } from "./feature-card";
import {
  BarChart,
  ChatCheck,
  Heart,
  Inbox,
  Integrations,
  Users,
} from "./icons";

const FEATURES = [
  {
    icon: <Inbox />,
    title: "Share team inboxes",
    body: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
  },
  {
    icon: <ChatCheck />,
    title: "Deliver instant answers",
    body: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
  },
  {
    icon: <BarChart />,
    title: "Manage your team with reports",
    body: "Measure what matters with Khen's easy-to-use reports. You can filter, export, and drilldown on the data.",
  },
  {
    icon: <Users />,
    title: "Connect with customers",
    body: "Solve a problem or close a sale in real-time with chat. If no one is available, customers are routed to email.",
  },
  {
    icon: <Integrations />,
    title: "Connect the tools you already use",
    body: "Explore 100+ integrations that make your day-to-day workflow more efficient and familiar.",
  },
  {
    icon: <Heart />,
    title: "Our people make the difference",
    body: "We're an extension of your team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.",
  },
];

export function Features() {
  return (
    <section className="py-14 mob:py-24">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Analytics that feels like it's from the future"
          description="Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users."
          nowrapTitle
        />
        <div className="mt-10 grid grid-cols-1 gap-12 px-6 mob:mt-16 mob:grid-cols-2 mob:gap-x-12 mob:gap-y-10 tab:grid-cols-3 tab:gap-x-8 tab:px-0">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Container>
    </section>
  );
}
