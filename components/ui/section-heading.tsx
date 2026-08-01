import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

/**
 * There is deliberately no `Eyebrow` here any more.
 *
 * The numbered chip and its uppercase label were removed from the whole site:
 * a band now opens straight on its heading. Anything that wants a kicker above
 * a title should make the case for bringing the component back rather than
 * re-inventing a one-off — the previous half-state, where some sections kept a
 * label and others did not, is exactly what this avoids.
 *
 * Position in the page is still communicated, just once and in one place: the
 * fixed `SectionNav` down the right edge.
 */

interface SectionHeadingProps {
  id: string;
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
                <span className="font-display text-gold-700 italic">{accent}</span>
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
