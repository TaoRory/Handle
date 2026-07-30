"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { Icon } from "@/components/ui/icon";
import { EASE_EXPO, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

import type { JourneyStep } from "@/types";

/**
 * The nine-step rail.
 *
 * Horizontal on `lg` and up, vertical below — one component, two layouts, so
 * the content is authored once. The connecting line fills in proportion to how
 * far the section has scrolled through the viewport, which makes the progress
 * feel earned rather than decorative.
 */
export function JourneyRail({ steps }: { steps: JourneyStep[] }) {
  const railRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 78%", "end 55%"],
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const progress = useTransform(smoothed, (value) =>
    prefersReducedMotion ? 1 : value,
  );

  return (
    <ol
      ref={railRef}
      className={cn(
        "relative mt-14 lg:mt-16",
        // Mobile: single column with a rail down the left gutter.
        "flex flex-col gap-8 pl-16",
        // Desktop: nine equal columns, rail running through the icon centres.
        "lg:grid lg:grid-cols-9 lg:gap-x-2 lg:gap-y-0 lg:pl-0",
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

      {/* ---- Rail: horizontal at lg and up ---- */}
      <span
        aria-hidden="true"
        className="bg-line absolute top-7 right-[5.55%] left-[5.55%] hidden h-px lg:block"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="bg-gold absolute top-7 right-[5.55%] left-[5.55%] hidden h-px origin-left lg:block"
      />

      {steps.map((step, index) => (
        <motion.li
          key={step.id}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{
            duration: 0.5,
            ease: EASE_EXPO,
            delay: Math.min(index, 5) * 0.06,
          }}
          className="group/step relative lg:flex lg:flex-col lg:items-center lg:px-1 lg:text-center"
        >
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

          <span className="font-brand text-gold-600 mt-0 block text-[0.6875rem] tracking-[0.18em] lg:mt-4">
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
