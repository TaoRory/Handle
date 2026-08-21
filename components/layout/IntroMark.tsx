"use client";

import { motion } from "framer-motion";

import { EASE_EXPO } from "@/lib/motion";

/**
 * The intro logo, rebuilt so the crossbar can draw itself independently of the
 * two stems.
 *
 * Source of truth is `Intro/logo intro.png` in the repo root. That file is a
 * flat raster, so nothing in it can be animated on its own — the two slabs of
 * the H are redrawn here as vector paths, measured off the original (bars 76
 * units wide, 361 tall, outer corners r=30, inner corners square).
 *
 * The hand that used to fly in from the left and complete the mark is gone. In
 * its place the crossbar draws across, left to right, bridging the two stems
 * into an H. Same idea — the mark assembles itself rather than appearing — with
 * one fewer raster to keep in sync, and it survives at any size because
 * everything on screen is now vector.
 *
 * All geometry below is in the original artwork's coordinate space.
 */

/** Palette lifted from the supplied artwork, not from the site tokens. */
const TAUPE = "#9F8772";
const TAN = "#D5BFA8";

const BAR_W = 76;
const BAR_H = 361;
const LEFT_X = 70;
const RIGHT_X = 280;
const RADIUS = 30;

/**
 * Where both bars change tone, and the line the crossbar bridges.
 *
 * The two bars alternate across it: the left is dark above and light below, the
 * right light above and dark below. That diagonal is the point of the mark —
 * the crossbar lands on the line where the tones swap.
 */
const TONE_SPLIT = 180;

const VIEW_W = 426;

/**
 * The crossbar.
 *
 * Ends sit deep inside each stem rather than at their inner edges: the bar is
 * painted *under* the stems, so the buried portion is hidden and the visible
 * span appears to emerge from solid material instead of butting against it.
 * That also means butt caps are correct here — a round cap would only ever
 * render inside a stem, and at `stroke-dashoffset: 1` some browsers draw a
 * round cap as a stray dot.
 *
 * The curve rises about 28 units over its span, so it reads as a bridge rather
 * than a plank. `Q` and not `C`: one control point is all a symmetric arc
 * needs, and it keeps the apex exactly at the midpoint.
 */
const BRIDGE_D = `M100 ${TONE_SPLIT} Q213 ${TONE_SPLIT - 28} 326 ${TONE_SPLIT}`;
const BRIDGE_W = 66;

/** Rounded on the outer side only, square where it meets the crossbar. */
function barPath(x: number, side: "left" | "right") {
  const r = RADIUS;
  return side === "left"
    ? `M${x + BAR_W} 0 L${x + r} 0 A${r} ${r} 0 0 0 ${x} ${r} L${x} ${BAR_H - r} A${r} ${r} 0 0 0 ${x + r} ${BAR_H} L${x + BAR_W} ${BAR_H} Z`
    : `M${x} 0 L${x + BAR_W - r} 0 A${r} ${r} 0 0 1 ${x + BAR_W} ${r} L${x + BAR_W} ${BAR_H - r} A${r} ${r} 0 0 1 ${x + BAR_W - r} ${BAR_H} L${x} ${BAR_H} Z`;
}

interface IntroMarkProps {
  /** Timings are owned by `IntroCurtain`, which holds the whole timeline. */
  markDuration: number;
}

export function IntroMark({ markDuration }: IntroMarkProps) {
  return (
    <div
      className="relative w-[190px] sm:w-[240px]"
      style={{ aspectRatio: `${VIEW_W} / ${BAR_H}` }}
    >
      <motion.svg
        viewBox={`0 0 ${VIEW_W} ${BAR_H}`}
        fill="none"
        className="absolute inset-0 size-full"
        aria-hidden="true"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: markDuration, ease: EASE_EXPO }}
      >
        <defs>
          <clipPath id="intro-left-bar">
            <path d={barPath(LEFT_X, "left")} />
          </clipPath>
          <clipPath id="intro-right-bar">
            <path d={barPath(RIGHT_X, "right")} />
          </clipPath>
        </defs>

        {/*
          First in document order, so the stems paint over it. `pathLength={1}`
          normalises the curve so the dash offset is a fraction rather than a
          measured length — nothing here needs to know how long the arc is, and
          the keyframes in `globals.css` stay readable. The resting
          `strokeDashoffset` is 0, which is the state reduced motion collapses
          to: fully drawn.
        */}
        <path
          d={BRIDGE_D}
          stroke={TAUPE}
          strokeWidth={BRIDGE_W}
          strokeLinecap="butt"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          className="animate-intro-bridge"
        />

        {/*
          Each bar is laid down light, then the dark half painted over it and
          clipped back to the bar's own rounded outline — which is what keeps
          the corner radii intact at the top of the left bar and the bottom of
          the right one. The seam falls on the line the crossbar bridges, so
          neither edge is ever seen hard against the other.

          The group around each bar is what grows. It starts squashed to a
          sliver about its own centre, so the mark opens as two horizontal
          dashes on the line the crossbar will later cross, then extends to full
          height. `transform-box: fill-box` puts the origin at the bar's centre
          rather than the SVG's, which is what makes the two grow in place
          instead of sliding toward the middle.

          The growth is a CSS animation, not a Motion one. `MotionConfig
          reducedMotion="user"` withholds a Motion transform, which here would
          leave both bars frozen as slivers — no H at all — for exactly the
          people that setting protects. A CSS animation with `forwards`
          collapses to its final frame under the reduce block instead.
        */}
        <g className="animate-intro-bar origin-center [transform-box:fill-box]">
          <path d={barPath(LEFT_X, "left")} fill={TAN} />
          <rect
            x={LEFT_X}
            y={0}
            width={BAR_W}
            height={TONE_SPLIT}
            fill={TAUPE}
            clipPath="url(#intro-left-bar)"
          />
        </g>

        <g className="animate-intro-bar origin-center [transform-box:fill-box]">
          <path d={barPath(RIGHT_X, "right")} fill={TAN} />
          <rect
            x={RIGHT_X}
            y={TONE_SPLIT}
            width={BAR_W}
            height={BAR_H - TONE_SPLIT}
            fill={TAUPE}
            clipPath="url(#intro-right-bar)"
          />
        </g>
      </motion.svg>
    </div>
  );
}
