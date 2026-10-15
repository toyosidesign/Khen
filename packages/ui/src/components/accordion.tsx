"use client";

import * as React from "react";
import { cn } from "../cn";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Index of the item open on first render. Pass null for all-closed. */
  defaultOpen?: number | null;
}

/**
 * Single-open accordion. Used by the FAQ section of every marketing template,
 * so it lives here rather than in any one template.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  className,
  ...props
}: AccordionProps) {
  const [open, setOpen] = React.useState<number | null>(defaultOpen);

  return (
    <div className={cn("w-full", className)} {...props}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b border-neutral-200 py-6">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-5 text-left text-lg font-semibold text-neutral-900"
              >
                {item.question}
                <span className="flex-none text-neutral-400">
                  {isOpen ? <MinusCircle /> : <PlusCircle />}
                </span>
              </button>
            </h3>
            {isOpen && (
              <p className="mt-3 max-w-[90%] text-base text-neutral-500">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PlusCircle() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function MinusCircle() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" />
    </svg>
  );
}
