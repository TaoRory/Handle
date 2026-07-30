"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A 2px gold rule across the top of the viewport, filling as the page scrolls.
 *
 * On a page this long the reader has no sense of how much is left; this is the
 * cheapest possible answer to that. It sits above the header and is purely
 * decorative, so it carries `aria-hidden` — the information is duplicated for
 * assistive tech by the section navigation's `aria-current`.
 *
 * Left on under reduced motion: it only ever moves in response to the reader's
 * own scrolling, and removing the indicator would take away information rather
 * than movement.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gold fixed inset-x-0 top-0 z-[90] h-0.5 origin-left"
    />
  );
}
