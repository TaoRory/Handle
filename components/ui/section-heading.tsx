import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "cream";
}

/** The small letterspaced label above a section title, with its gold tick. */
export function Eyebrow({ children, className, tone = "gold" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "font-brand text-eyebrow inline-flex items-center gap-3 uppercase",
        tone === "gold" ? "text-gold-600" : "text-cream/70",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-8", tone === "gold" ? "bg-gold" : "bg-cream/40")}
      />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
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
 * Eyebrow + title + lead, with the project's one-accent-word rule baked in.
 */
export function SectionHeading({
  id,
  eyebrow,
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
        {eyebrow ? (
          <Reveal>
            <Eyebrow tone={tone === "cream" ? "cream" : "gold"}>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}

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
