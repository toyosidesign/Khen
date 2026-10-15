import { Accordion, Button, Container, SectionHeading } from "@tp/ui";

const QUESTIONS = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you as you grow.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
  },
  {
    question: "Can other info be added to an invoice?",
    answer:
      "Yes, you can add custom information such as your company name, VAT number, and address to every invoice.",
  },
  {
    question: "How does billing work?",
    answer:
      "Plans are per workspace, not per account. You can upgrade one workspace and still have any number of free workspaces.",
  },
  {
    question: "How do I change my account email?",
    answer:
      "You can change the email address associated with your account by going to Settings → Account and updating your email.",
  },
];

const HELP_AVATARS = [
  { src: "/assets/avatar-phoenix.png", alt: "Phoenix Baker" },
  { src: "/assets/avatar-lana.png", alt: "Lana Steiner" },
  { src: "/assets/avatar-candice.png", alt: "Candice Wu" },
];

export function Faq() {
  return (
    <>
      <section className="py-14 mob:py-24">
        <Container>
          <SectionHeading
            title="Frequently asked questions"
            description="Everything you need to know about the product and billing."
          />
          <div className="mx-auto mt-3 max-w-[768px] px-4 mob:mt-14 mob:px-6 tab:px-0">
            <Accordion items={QUESTIONS} />
          </div>
        </Container>
      </section>

      <section className="bg-neutral-50 px-6 py-12 text-center mob:py-16">
        <Container>
          <div className="mb-5 flex justify-center">
            {HELP_AVATARS.map((a, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={a.alt}
                src={a.src}
                alt={a.alt}
                className={`h-12 w-12 rounded-full border-2 border-neutral-0 object-cover shadow-sm ${
                  i === 0 ? "" : "-ml-3.5"
                }`}
              />
            ))}
          </div>
          <h3 className="mb-2 text-xl font-semibold">Still have questions?</h3>
          <p className="mb-5 text-neutral-500">
            Can&apos;t find the answer you&apos;re looking for? Please chat to
            our friendly team.
          </p>
          <Button>Get in touch</Button>
        </Container>
      </section>
    </>
  );
}
