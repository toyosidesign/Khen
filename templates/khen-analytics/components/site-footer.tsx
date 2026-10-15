import { Badge, Container } from "@tp/ui";
import { BrandMark } from "./brand-mark";
import { Dribbble, GitHub, LinkedIn, Twitter } from "./icons";

const COLUMNS = [
  {
    heading: "Product",
    links: ["Overview", "Features", "Solutions", "Tutorials", "Pricing", "Releases"],
    badgeOn: "Solutions",
  },
  {
    heading: "Khen",
    links: ["About us", "Careers", "Press", "News", "Media kit", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Blog", "Newsletter", "Events", "Help centre", "Tutorials", "Support"],
  },
  {
    heading: "Use cases",
    links: ["Startups", "Enterprise", "Government", "SaaS", "Marketplaces", "Ecommerce"],
  },
  {
    heading: "Social",
    links: ["Twitter", "LinkedIn", "Facebook", "GitHub", "AngelList", "Dribbble"],
  },
  {
    heading: "Legal",
    links: ["Terms", "Privacy", "Cookies", "Licenses", "Settings", "Contact"],
  },
];

const SOCIALS = [
  { label: "Twitter", Icon: Twitter },
  { label: "LinkedIn", Icon: LinkedIn },
  { label: "GitHub", Icon: GitHub },
  { label: "Dribbble", Icon: Dribbble },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-100 pb-8 pt-12 mob:pb-10 mob:pt-16">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 mob:grid-cols-3 mob:gap-10 tab:grid-cols-6 tab:gap-8">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-sm font-semibold text-neutral-500">
                {col.heading}
              </h3>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="flex items-center gap-2 py-1.5 text-[15px] font-medium text-neutral-600 hover:text-neutral-900"
                >
                  {link}
                  {col.badgeOn === link && (
                    <Badge className="px-2 py-px text-[12px]">New</Badge>
                  )}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-start gap-5 border-t border-neutral-200 pt-8 text-[15px] text-neutral-500 mob:mt-12 tab:flex-row tab:items-center tab:justify-between tab:gap-0">
          <a href="#" aria-label="Khen home">
            <BrandMark className="text-lg" />
          </a>
          <span>© 2077 Khen UI. All rights reserved.</span>
          <div className="flex gap-5">
            {SOCIALS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
