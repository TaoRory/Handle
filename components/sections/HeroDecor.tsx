"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The hero's background layer: a warm wash, two soft blooms and a hairline
 * grid. Purely decorative, so it is `aria-hidden` and isolated behind the
 * content.
 *
 * Parallax travel is capped at 40px per the motion spec, and disabled outright
 * under `prefers-reduced-motion`.
 */
export function HeroDecor() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const slowY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 40],
  );
  const fastY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -28],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash — cream lifting into white towards the top-right. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_8%,#FFFFFF_0%,#FBFAF7_38%,#F6F3EE_72%)]" />

      {/* Hairline grid, fading out before it reaches the copy. */}
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,#E6E0D6_1px,transparent_1px),linear-gradient(to_bottom,#E6E0D6_1px,transparent_1px)] [mask-image:radial-gradient(88%_70%_at_50%_0%,#000_0%,transparent_78%)] [background-size:96px_96px] opacity-[0.55]" />

      <motion.span
        style={{ y: slowY }}
        className="rounded-pill absolute -top-24 -left-32 size-[520px] bg-[radial-gradient(circle,rgba(201,168,106,0.20)_0%,transparent_66%)] blur-2xl"
      />
      <motion.span
        style={{ y: fastY }}
        className="rounded-pill absolute top-40 -right-40 size-[620px] bg-[radial-gradient(circle,rgba(168,162,156,0.22)_0%,transparent_64%)] blur-2xl"
      />

      {/* Bottom feather so the hero dissolves into the partner band. */}
      <div className="from-cream absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
    </div>
  );
}
