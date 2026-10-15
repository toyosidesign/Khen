import * as React from "react";
import { ArrowRight } from "./icons";

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  /** Render the "Learn more" affordance (showcase grid does, features grid doesn't). */
  learnMore?: boolean;
}

export function FeatureCard({ icon, title, body, learnMore }: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-[30px] mt-2.5 grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-600 ring-8 ring-brand-50">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-[15px] text-neutral-500">{body}</p>
      {learnMore && (
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-700"
        >
          Learn more <ArrowRight />
        </a>
      )}
    </div>
  );
}
