import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /**
   * Surface the eyebrow sits on, not the colour it paints.
   * `gold` = light neutral surface · `cream` = ink surface · `onGold` = the
   * gold accent band, where a gold chip would of course disappear.
   */
  tone?: "gold" | "cream" | "onGold";
  /**
   * Optional section ordinal. Kept for API compatibility, but no longer
   * rendered because the user requested text-only section labels.
   */
  step?: string;
}

/** The small letterspaced label above a section title. */
export function Eyebrow({ children, className, tone = "gold", step }: EyebrowProps) {
  const label = {
    gold: "text-gold-600",
    cream: "text-cream/75",
    onGold: "text-ink/65",
  }[tone];

  const chip = {
    gold: "bg-gold text-ink",
    cream: "bg-gold text-ink",
    onGold: "bg-ink text-gold",
  }[tone];

  const rule = {
    gold: "bg-gold",
    cream: "bg-cream/40",
    onGold: "bg-ink/30",
  }[tone];

  return (
    <span
      className={cn(
        "font-brand text-eyebrow inline-flex items-center gap-3 uppercase",
        label,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-8", rule)} />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  /** Section ordinal shown in the eyebrow chip. */
  step?: string;
  title: string;
  /** The single word set in the display serif and gold. */
  accent?: string;
  lead?: string;
  className?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
  tone?: "ink" | "cream";
  /** Slot for a trailing action (usually a "see all" link). */
  action?: ReactNode;
}

/**
 * Title + lead, with the project's one-accent-word rule baked in.
 */
export function SectionHeading({
  id,
  title,
  accent,
  lead,
  className,
  align = "start",
  as: Tag = "h2",
  tone = "ink",
  action,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCentered && "items-center text-center",
        action && "sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-4", isCentered && "items-center")}>
        <Reveal index={1}>
          <Tag
            id={id}
            className={cn(
              Tag === "h1" ? "text-h1" : "text-h2",
              "max-w-[22ch]",
              isCentered && "mx-auto max-w-[24ch]",
              tone === "cream" ? "text-cream-100" : "text-ink",
            )}
          >
            {title}
            {accent ? (
              <>
                {" "}
                <span className="font-display text-gold italic">{accent}</span>
              </>
            ) : null}
          </Tag>
        </Reveal>

        {lead ? (
          <Reveal index={2}>
            <p
              className={cn(
                "text-lead max-w-[62ch]",
                tone === "cream" ? "text-cream/75" : "text-ink-600",
              )}
            >
              {lead}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal index={3} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
