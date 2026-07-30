"use client";

import { motion } from "framer-motion";

import { DURATION, EASE_EXPO, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

import type { ElementType, ReactNode } from "react";

type RevealDirection = "up" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  direction?: RevealDirection;
  /** Position in a staggered group. Capped at 6 steps, per the motion spec. */
  index?: number;
  delay?: number;
  duration?: number;
}

const offsets: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 16 },
  left: { x: -20 },
  right: { x: 20 },
  none: {},
};

/**
 * The single entrance-animation wrapper used across the site.
 *
 * Owns the viewport contract (`once: true`) and the stagger cap. It does **not**
 * branch on `useReducedMotion()`: doing so would make the rendered `initial`
 * prop differ between server and client and break hydration for exactly the
 * users it was meant to help. `MotionProvider` withholds the transform instead,
 * leaving a plain fade. See the note there.
 */
export function Reveal({
  children,
  className,
  as = "div",
  direction = "up",
  index = 0,
  delay = 0,
  duration = DURATION.entrance,
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as unknown as typeof motion.div;

  const staggerDelay = Math.min(index, 5) * 0.07 + delay;

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE_EXPO, delay: staggerDelay }}
    >
      {children}
    </MotionTag>
  );
}
