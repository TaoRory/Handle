"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a number once, when it first enters view.
 *
 * The value arrives as a display string ("2.400", "2,400") so the data layer
 * keeps its locale formatting — Vietnamese groups with `.`, English with `,`.
 * We parse the digits out to animate, then re-apply the original separator, so
 * neither locale has to carry a second numeric field.
 *
 * State is only ever written from `animate`'s `onUpdate` callback; the resting
 * value is derived during render. That keeps the server output (and the no-JS
 * fallback) showing the real figure rather than a zero, and avoids a
 * setState-in-effect cascade.
 */
export function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const [animated, setAnimated] = useState<string | null>(null);

  const target = Number(value.replace(/\D/g, ""));
  const separator = value.includes(".") ? "." : value.includes(",") ? "," : "";
  const shouldAnimate =
    isInView && !prefersReducedMotion && Number.isFinite(target) && target > 0;

  useEffect(() => {
    if (!shouldAnimate) return;

    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const rounded = Math.round(latest).toString();
        setAnimated(
          separator ? rounded.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : rounded,
        );
      },
    });

    return () => controls.stop();
  }, [shouldAnimate, target, separator]);

  return (
    <span ref={ref} className="tabular-nums">
      {animated ?? (shouldAnimate ? "0" : value)}
    </span>
  );
}
