"use client";

import { motion } from "framer-motion";

import { EASE_EXPO } from "@/lib/motion";

/**
 * The intro mark: the site's own H, drawn.
 *
 * This used to be a separate drawing — the solid two-tone slabs from
 * `Intro/logo intro.png`, in that artwork's taupe and tan — while the header
 * and footer used the thin-stroke H from `components/ui/logo.tsx`. Two logos in
 * two palettes, and `CLAUDE.md` carried a note to unify them before launch.
 * This is that unification: same geometry as `ui/logo.tsx`, same gold. There is
 * one Handle mark now.
 *
 * Geometry is the brand sheet's, unchanged from `ui/logo.tsx`: stems at x=6 and
 * x=42 over a 48×52 field, stroke 5 with round caps, and a crossbar that curves
 * rather than sitting flat, cut short of each stem — the junction detail. The
 * gap is deliberate; the crossbar is not supposed to touch.
 */

/** The centre line: where the stems start growing and where the crossbar sits. */
const MID = 27;

const STROKE = 5;

/**
 * Each stem is two paths, both starting at the centre line and running in
 * opposite directions, so the pair grows outward from the middle rather than
 * unrolling from one end. A single path drawn with a dash offset can only ever
 * start at one of its ends.
 */
const STEMS = [
  { id: "left-up", d: `M6 ${MID} V4` },
  { id: "left-down", d: `M6 ${MID} V48` },
  { id: "right-up", d: `M42 ${MID} V4` },
  { id: "right-down", d: `M42 ${MID} V48` },
];

/** Curved crossbar. Rise is ~7.5% of its span, inside the guideline's 5–8%. */
const BRIDGE = `M11.5 ${MID}C17 24.5 31 24.5 36.5 ${MID}`;

interface IntroMarkProps {
  /** Timings are owned by `IntroCurtain`, which holds the whole timeline. */
  markDuration: number;
}

export function IntroMark({ markDuration }: IntroMarkProps) {
  /*
   * `pathLength={1}` normalises every stroke, so one dash pattern and one
   * keyframe serve strokes of five different lengths. The resting
   * `strokeDashoffset` is 0 — the state reduced motion collapses to, which is
   * the mark fully drawn.
   *
   * `"1 2"` and not `1`: the gap has to be longer than the dash, or the pattern
   * repeats within the path and a round cap lands a stray dot at one end. See
   * the keyframe in `globals.css`.
   */
  const draw = {
    pathLength: 1,
    strokeDasharray: "1 2",
    strokeDashoffset: 0,
    strokeWidth: STROKE,
    strokeLinecap: "round",
    fill: "none",
  } as const;

  return (
    <motion.svg
      viewBox="0 0 48 52"
      className="stroke-gold-600 w-[124px] sm:w-[158px]"
      aria-hidden="true"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: markDuration, ease: EASE_EXPO }}
    >
      {STEMS.map((stem) => (
        <path key={stem.id} d={stem.d} className="animate-intro-stem" {...draw} />
      ))}

      <path d={BRIDGE} className="animate-intro-bridge" {...draw} />
    </motion.svg>
  );
}
