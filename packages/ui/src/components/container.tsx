import * as React from "react";
import { cn } from "../cn";

/**
 * Page gutter + max width. Every template section sits inside one of these
 * so horizontal rhythm is identical across the platform.
 */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1216px] px-6", className)}
      {...props}
    />
  );
}
