"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { EASE_EXPO } from "@/lib/motion";

/**
 * The intro logo, rebuilt so the hand can move independently of the H.
 *
 * Source of truth is `Intro/logo intro.png` in the repo root. That file is a
 * flat raster, so nothing in it can be animated on its own — the two slabs of
 * the H are redrawn here as vector paths (measured off the original: bars 76
 * units wide, 361 tall, outer corners r=30, inner corners square), and the hand
 * is extracted from the PNG as a transparent cut-out including the cream
 * knockout ring the logo puts between the hand and the bars.
 *
 * All geometry below is in the original artwork's coordinate space, offset so
 * the H's left edge sits at x=70 and there is room to the left for the hand to
 * fly in from.
 */

/** Palette lifted from the supplied artwork, not from the site tokens. */
const TAUPE = "#9F8772";
const TAN = "#D5BFA8";

const BAR_W = 76;
const BAR_H = 361;
const LEFT_X = 70;
const RIGHT_X = 280;
const RADIUS = 30;

/** Where the left bar changes tone — under where the hand lands. */
const TONE_SPLIT = 180;

const VIEW_W = 426;

/** Rounded on the outer side only, square where it meets the crossbar. */
function barPath(x: number, side: "left" | "right") {
  const r = RADIUS;
  return side === "left"
    ? `M${x + BAR_W} 0 L${x + r} 0 A${r} ${r} 0 0 0 ${x} ${r} L${x} ${BAR_H - r} A${r} ${r} 0 0 0 ${x + r} ${BAR_H} L${x + BAR_W} ${BAR_H} Z`
    : `M${x} 0 L${x + BAR_W - r} 0 A${r} ${r} 0 0 1 ${x + BAR_W} ${r} L${x + BAR_W} ${BAR_H - r} A${r} ${r} 0 0 1 ${x + BAR_W - r} ${BAR_H} L${x} ${BAR_H} Z`;
}

/** The hand cut-out's box, in the same coordinate space as the bars. */
const HAND = { x: 6, y: 92, w: 414, h: 190 };

const asPercent = (value: number, total: number) => `${(value / total) * 100}%`;

interface IntroMarkProps {
  altText: string;
  /** Timings are owned by `IntroCurtain`, which holds the whole timeline. */
  markDuration: number;
  handDelay: number;
  handDuration: number;
}

export function IntroMark({
  altText,
  markDuration,
  handDelay,
  handDuration,
}: IntroMarkProps) {
  return (
    <div
      className="relative w-[190px] sm:w-[240px]"
      style={{ aspectRatio: `${VIEW_W} / ${BAR_H}` }}
    >
      {/* ---- The H ---- */}
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
        </defs>

        <path d={barPath(LEFT_X, "left")} fill={TAN} />
        {/* The darker upper-left segment: in the artwork it reads as the arm
            the hand is attached to. Its lower edge is covered once the hand
            lands, which is why the split sits under the landing position. */}
        <rect
          x={LEFT_X}
          y={0}
          width={BAR_W}
          height={TONE_SPLIT}
          fill={TAUPE}
          clipPath="url(#intro-left-bar)"
        />
        <path d={barPath(RIGHT_X, "right")} fill={TAN} />
      </motion.svg>

      {/* ---- The hand, flying in from the left ---- */}
      <motion.div
        className="absolute"
        style={{
          left: asPercent(HAND.x, VIEW_W),
          top: asPercent(HAND.y, BAR_H),
          width: asPercent(HAND.w, VIEW_W),
          height: asPercent(HAND.h, BAR_H),
        }}
        initial={{ x: "-108%", y: "14%", opacity: 0 }}
        animate={{ x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: handDuration, ease: EASE_EXPO, delay: handDelay }}
      >
        <Image
          src="/intro/hand.png"
          alt={altText}
          fill
          sizes="(max-width: 640px) 190px, 240px"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
