import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /**
   * Seconds for one full pass. Slower reads calmer.
   *
   * Omit it to let CSS decide — the inline variable would beat a class, and the
   * speed has to change at a breakpoint wherever the track's own length does:
   * the same duration over a shorter track is a slower rail, not an equal one.
   */
  durationSeconds?: number;
  direction?: "left" | "right";
  className?: string;
}

/**
 * Infinite logo rail.
 *
 * Runs on a CSS keyframe transform (compositor-only, no JS tick) with the track
 * duplicated so the loop is seamless. Pauses on hover *and* on focus-within, so
 * a keyboard user tabbing through the logos is not chasing a moving target.
 * The global reduced-motion rule in `globals.css` stops it outright.
 *
 * The duplicate track is `aria-hidden`, so assistive tech reads the list once.
 */
export function Marquee({
  children,
  durationSeconds,
  direction = "left",
  className,
}: MarqueeProps) {
  return (
    <div className={cn("pause-running mask-edges relative overflow-hidden", className)}>
      <div
        data-marquee-track
        className="animate-marquee flex w-max items-center will-change-transform motion-reduce:animate-none"
        style={
          {
            ...(durationSeconds
              ? { "--marquee-duration": `${durationSeconds}s` }
              : null),
            animationDirection: direction === "right" ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
