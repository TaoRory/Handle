"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { Icon } from "@/components/ui/icon";
import { EASE_EXPO, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

import type { MotionValue } from "framer-motion";
import type { JourneyStep } from "@/types";

/** Steps per row from `lg` up. Nine across left each column ~130px wide at
 *  1440 — about fourteen characters — so the body copy shredded. Five gives it
 *  240px and the band reads as two legs of one journey rather than a ticker. */
const COLS = 5;

/**
 * The line from one node to the next, and the gold that fills it.
 *
 * Drawn per step rather than as one bar across the band, because a single
 * absolutely-positioned line cannot survive the steps wrapping onto a second
 * row. Each segment reaches from its own node's centre to the next one's, which
 * means the last node in a row simply does not draw one and the wrap is free.
 */
function RailSegment({
  progress,
  from,
  to,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
}) {
  const fill = useTransform(progress, [from, to], [0, 1], { clamp: true });

  return (
    <span
      aria-hidden="true"
      className="absolute top-7 left-1/2 hidden h-px w-[calc(100%+1rem)] lg:block"
    >
      <span className="bg-line absolute inset-0" />
      <motion.span
        style={{ scaleX: fill }}
        className="bg-gold absolute inset-0 origin-left"
      />
    </span>
  );
}

/**
 * The nine-step rail.
 *
 * Horizontal on `lg` and up, vertical below — one component, two layouts, so
 * the content is authored once. The connecting line fills in proportion to how
 * far the section has scrolled through the viewport, which makes the progress
 * feel earned rather than decorative.
 *
 * The fill is scroll-linked rather than self-animating, so it stays on under
 * reduced motion: it only ever moves in response to the reader's own scrolling,
 * which is not the kind of movement that setting is protecting against.
 */
export function JourneyRail({ steps }: { steps: JourneyStep[] }) {
  const railRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 78%", "end 55%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <ol
      ref={railRef}
      className={cn(
        "relative mt-14 lg:mt-16",
        // Mobile: single column with a rail down the left gutter.
        "flex flex-col gap-8 pl-16",
        // Desktop: five to a row, the rail running through the icon centres.
        "lg:grid lg:grid-cols-5 lg:gap-x-4 lg:gap-y-14 lg:pl-0",
      )}
    >
      {/* ---- Rail: vertical below lg ---- */}
      <span
        aria-hidden="true"
        className="bg-line absolute top-2 bottom-2 left-[27px] w-px lg:hidden"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: progress }}
        className="bg-gold absolute top-2 bottom-2 left-[27px] w-px origin-top lg:hidden"
      />

      {steps.map((step, index) => (
        <motion.li
          key={step.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{
            duration: 0.5,
            ease: EASE_EXPO,
            delay: Math.min(index, 5) * 0.06,
          }}
          className="group/step relative lg:flex lg:flex-col lg:items-center lg:px-2 lg:text-center"
        >
          {/* No segment off the last node of a row, or off the last step. */}
          {index < steps.length - 1 && (index + 1) % COLS !== 0 ? (
            <RailSegment
              progress={progress}
              from={index / (steps.length - 1)}
              to={(index + 1) / (steps.length - 1)}
            />
          ) : null}

          {/* Node */}
          <span
            className={cn(
              "border-line bg-surface text-ink-400 rounded-pill absolute top-0 -left-16 inline-flex size-14 items-center justify-center border",
              "transition-[border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              "group-hover/step:border-gold group-hover/step:text-gold-600 group-hover/step:shadow-[0_0_0_6px_rgba(201,168,106,0.10)]",
              "lg:static lg:size-14",
            )}
          >
            <Icon name={step.icon} className="size-[22px]" strokeWidth={1.4} />
          </span>

          <span className="font-brand text-gold-700 mt-0 block text-[0.6875rem] tracking-[0.18em] lg:mt-4">
            {step.step}
          </span>

          <h3 className="text-ink mt-1.5 text-[0.9375rem] leading-snug font-medium lg:text-sm">
            {step.title}
          </h3>

          <p className="text-ink-400 mt-2 max-w-[42ch] text-[0.8125rem] leading-relaxed lg:max-w-none lg:text-xs">
            {step.body}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
