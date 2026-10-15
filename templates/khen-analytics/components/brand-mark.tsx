import { cn } from "@tp/ui";

/**
 * Wordmark. The gradient reads straight off the brand token ramp, so a reskin
 * moves the logo with everything else.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 text-xl font-bold", className)}>
      <span className="grid h-[30px] w-[30px] flex-none place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-700">
        <span className="h-3 w-3 rotate-45 rounded-[3px] bg-neutral-0" />
      </span>
      Khen
    </span>
  );
}
