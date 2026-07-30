import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

const tones = {
  cream: "bg-cream text-ink",
  surface: "bg-surface text-ink",
  cream300: "bg-cream-300 text-ink",
  ink: "bg-ink text-cream-100",
} as const;

interface SectionProps {
  id: string;
  /** Must match the `id` of the heading element rendered inside. */
  labelledBy: string;
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
  size?: "default" | "lg" | "flush";
}

const sizes = {
  default: "section-y",
  lg: "section-y-lg",
  flush: "",
} as const;

/**
 * A homepage band.
 *
 * Owns the landmark semantics (`aria-labelledby` pointing at the real heading),
 * the vertical rhythm and the surface tone. `relative overflow-hidden` is on by
 * default so decorative absolute layers can never cause horizontal overflow.
 */
export function Section({
  id,
  labelledBy,
  children,
  className,
  tone = "cream",
  size = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative scroll-mt-[calc(var(--header-h)+24px)] overflow-hidden",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </section>
  );
}
