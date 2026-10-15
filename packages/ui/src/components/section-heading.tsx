import * as React from "react";
import { cn } from "../cn";

export interface SectionHeadingProps {
  /** Small brand-coloured label above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Keep the title on one line above the tablet breakpoint. */
  nowrapTitle?: boolean;
  className?: string;
}

/**
 * Eyebrow + title + description. The same block opens nearly every marketing
 * section, so templates compose this instead of restating the type scale.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  nowrapTitle = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto px-4 text-center mob:px-0", className)}>
      {eyebrow && (
        <span className="text-base font-semibold text-brand-600">{eyebrow}</span>
      )}
      <h2
        className={cn(
          "my-3 text-3xl font-bold leading-[38px] tracking-[-0.02em] mob:my-3 tab:text-[40px] tab:leading-tight",
          nowrapTitle && "tab:whitespace-nowrap"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-[640px] text-lg text-neutral-500 tab:text-[19px]">
          {description}
        </p>
      )}
    </div>
  );
}
