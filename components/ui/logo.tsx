import { cn } from "@/lib/utils";

/**
 * The Handle mark, rebuilt as inline SVG from the brand sheet.
 *
 * The construction rules from the guideline are respected: two vertical bars
 * with fully rounded caps, a crossbar that curves rather than sits flat, and a
 * junction cut where the bar meets the stems. Stroke weight is uniform.
 */
function HandleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 52"
      fill="none"
      className={cn("h-full w-auto", className)}
      role="presentation"
      aria-hidden="true"
    >
      {/* Left stem */}
      <path d="M6 4v44" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      {/* Right stem */}
      <path d="M42 4v44" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      {/* Curved crossbar, cut short of each stem — the junction detail.
          Rise is ~7.5% of its span, inside the 5–8% the guideline specifies. */}
      <path
        d="M11.5 27C17 24.5 31 24.5 36.5 27"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface LogoProps {
  /** `icon` = mark only · `wordmark` = mark + HANDLE · `lockup` = + tagline. */
  variant?: "icon" | "wordmark" | "lockup";
  className?: string;
  /** Inverts to cream for dark surfaces. */
  tone?: "ink" | "cream";
}

const markSizes = {
  icon: "h-9",
  wordmark: "h-7 sm:h-8",
  lockup: "h-8 sm:h-9",
} as const;

export function Logo({ variant = "wordmark", className, tone = "ink" }: LogoProps) {
  const color = tone === "cream" ? "text-cream-100" : "text-ink";

  if (variant === "icon") {
    return (
      <span className={cn("inline-flex", markSizes.icon, color, className)}>
        <HandleMark />
        <span className="sr-only">Handle</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", color, className)}>
      <span className={cn("inline-flex shrink-0", markSizes[variant])}>
        <HandleMark />
      </span>

      <span className="flex flex-col justify-center">
        <span
          className={cn(
            "font-brand leading-none font-normal",
            variant === "lockup"
              ? "text-[1.375rem] tracking-[0.30em] sm:text-[1.5rem]"
              : "text-[1.25rem] tracking-[0.30em] sm:text-[1.375rem]",
          )}
        >
          HANDLE
        </span>

        {variant === "lockup" ? (
          <span
            className={cn(
              "font-brand mt-1.5 text-[0.5rem] leading-[1.35] tracking-[0.16em] whitespace-nowrap uppercase sm:text-[0.5625rem]",
              tone === "cream" ? "text-cream/70" : "text-ink-400",
            )}
          >
            You heal. We handle the rest.
          </span>
        ) : null}
      </span>
    </span>
  );
}
