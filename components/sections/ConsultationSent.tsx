"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { contactLinks } from "@/lib/site-config";

import type { CtaCopy } from "@/types";

/**
 * The seal.
 *
 * A hairline gold ring closing around an ink tick — the mark a signed record
 * gets, not a notification badge. The whole draw is CSS (`--animate-seal-*` in
 * globals.css) because a Motion stroke-dash animation would be withheld under
 * `prefers-reduced-motion` and leave the ring empty; a CSS one collapses to its
 * drawn final frame instead.
 *
 * Geometry: r=43, so the ring's circumference is 270.2 — hence the 271 dash.
 * The tick measures ~46, rounded to 48. The 120 box is deliberately wider than
 * the mark so the halo has somewhere to expand into; an SVG root clips, and at
 * a tighter viewBox the halo squared off against the edges. Changing r means
 * changing the dash here and the keyframe in globals.css together.
 */
function SealMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-24 items-center justify-center sm:size-28"
    >
      <svg viewBox="0 0 120 120" fill="none" className="size-full">
        {/* One breath outward, then gone. */}
        <circle
          cx="60"
          cy="60"
          r="43"
          className="fill-gold animate-seal-halo origin-center opacity-0 [transform-box:fill-box]"
        />
        {/* The unfilled track, so the ring reads as closing rather than growing. */}
        <circle cx="60" cy="60" r="43" className="stroke-gold/20" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="36" className="fill-cream-100" />
        <circle
          cx="60"
          cy="60"
          r="43"
          className="stroke-gold animate-seal-ring origin-center -rotate-90 [transform-box:fill-box]"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="271"
          strokeDashoffset="271"
        />
        <path
          d="M45 61 L56 72 L76 49"
          className="stroke-ink animate-seal-check"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="48"
          strokeDashoffset="48"
        />
      </svg>
    </span>
  );
}

/**
 * What the card shows once a consultation request is written.
 *
 * Replaces the fields rather than sitting above them: the visitor is done, and
 * leaving a filled-in form on screen invites a second submission. The three
 * steps are here because the anxious half of this audience wants to know what
 * happens next, and "we'll be in touch" does not answer that.
 */
export function ConsultationSent({
  copy,
  chatLabel,
  onReset,
}: {
  copy: CtaCopy["form"]["sent"];
  chatLabel: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center sm:py-4">
      {/* Outside the stagger on purpose: the seal has its own CSS timeline and
          would otherwise be drawing itself behind an opacity-0 wrapper. The
          copy waits it out instead — `delayChildren` covers the ring plus the
          tick, so the words land as the mark completes. */}
      <SealMark />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.07, 0.55)}
        className="flex w-full flex-col items-center gap-5"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-2.5">
          <p className="font-brand text-gold-700 text-xs tracking-[0.18em] uppercase">
            {copy.eyebrow}
          </p>
          <h3 className="text-h3 text-ink mx-auto max-w-[26ch] text-balance">
            {copy.title}{" "}
            <span className="font-display text-gold-700 italic">{copy.accent}</span>
          </h3>
          <p className="text-ink-600 mx-auto max-w-[54ch] text-sm leading-6">
            {copy.lead}
          </p>
        </motion.div>

        <motion.ol
          variants={fadeUp}
          className="border-line grid w-full gap-4 border-t pt-6 text-left sm:grid-cols-3 sm:gap-6"
        >
          {copy.steps.map((step) => (
            <li key={step.id} className="flex items-start gap-3 sm:flex-col sm:gap-2.5">
              <span className="border-line bg-cream-100 rounded-pill text-ink flex size-9 shrink-0 items-center justify-center border">
                <Icon name={step.icon} className="size-4" strokeWidth={1.75} />
              </span>
              <div className="space-y-0.5">
                <p className="text-ink text-sm font-medium">{step.label}</p>
                <p className="text-ink-400 text-xs leading-5">{step.body}</p>
              </div>
            </li>
          ))}
        </motion.ol>

        <motion.div
          variants={fadeUp}
          className="border-line flex w-full flex-col gap-2.5 border-t pt-5 sm:flex-row sm:justify-center"
        >
          <Button asChild variant="primary" size="md" className="rounded-sm">
            <Link
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name="message-circle" className="size-4" strokeWidth={1.75} />
              {chatLabel}
            </Link>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="md"
            className="rounded-sm"
            onClick={onReset}
          >
            {copy.again}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
