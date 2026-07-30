"use client";

import { MotionConfig } from "framer-motion";

import type { ReactNode } from "react";

/**
 * Site-wide motion policy.
 *
 * `reducedMotion="user"` makes Motion itself drop transform and layout
 * animations for anyone who prefers reduced motion, while still allowing
 * opacity to cross-fade. That matters for correctness, not just tidiness:
 * branching on `useReducedMotion()` inside a component changes what gets
 * rendered, and because the server always assumes "no preference" while the
 * client knows the truth, every such branch is a hydration mismatch waiting for
 * the first visitor who has the setting on.
 *
 * So the rule is: **never let `prefersReducedMotion` decide markup or an
 * `initial` prop.** Declare the animation once, and let this provider withhold
 * the parts that would move.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
