import * as React from "react";
import { cn } from "../cn";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-50 px-3 py-1 " +
        "text-xs font-medium text-brand-700",
        className
      )}
      {...props}
    />
  );
}
