"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { IntroMark } from "@/components/layout/IntroMark";
import { EASE_EXPO } from "@/lib/motion";

export const INTRO_SESSION_KEY = "handle:intro-played";

/**
 * Intro timeline, in seconds. Kept in one place because the steps have to stay
 * in step with each other — nudging any single delay in isolation is how an
 * intro ends up feeling ragged.
 *
 *   0.00  the H settles in                       (0.70s)
 *   0.45  the hand flies in from the left        (1.05s, lands at 1.50)
 *   0.90  the skip control fades up
 *   1.55  HANDLE wipes left to right             (0.75s, ends 2.30)
 *   2.05  the tagline wipes left to right        (0.65s, ends 2.70)
 *   2.70  ── one full second of stillness, so the lockup can be read ──
 *   3.70  the curtain lifts                      (0.65s)
 */
const TIMING = {
  mark: { duration: 0.7 },
  hand: { delay: 0.45, duration: 1.05 },
  skip: { delay: 0.9 },
  wordmark: { delay: 1.55, duration: 0.75 },
  tagline: { delay: 2.05, duration: 0.65 },
  exit: { duration: 0.65 },
} as const;

/** How long the curtain holds before it starts lifting. */
const INTRO_DURATION_MS = 3700;

interface IntroCurtainProps {
  skipLabel: string;
  /** Announced to screen readers while the curtain holds the viewport. */
  loadingLabel: string;
  /** Alt text for the hand mark. */
  markLabel: string;
}

/**
 * Wipe that uncovers its content from the left edge to the right.
 *
 * `clipPath` rather than a sliding cover: a cover would have to be a transform,
 * and `MotionProvider` withholds transforms under reduced motion — which would
 * leave the text permanently hidden for exactly those users. Clip paths are not
 * transforms, so the reveal still completes. Opacity rides along as a second
 * belt: if the clip path ever failed to interpolate, the text would still end
 * up visible rather than blank.
 */
function WipeIn({
  children,
  delay,
  duration = 0.6,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration, ease: EASE_EXPO, delay }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Brand intro.
 *
 * The H stands, then the hand flies in from the left and completes it — the
 * mark assembling itself around the gesture the brand is named for. The
 * wordmark and tagline then wipe in from left to right, in reading order.
 *
 * Constraints this respects:
 * - **Once per session.** An intro you cannot get past is a toll booth. The
 *   flag lives in `sessionStorage`, and an inline script in the layout reads it
 *   before first paint, so a returning visitor never sees a frame of curtain.
 * - **Always skippable.** Any click, any key, or the skip button ends it.
 * - **Reduced motion.** Handled by `MotionProvider`, not by branching here:
 *   the transforms are simply withheld, so the mark and the type fade and wipe
 *   in place. Branching on the preference in render would change the SSR output
 *   and break hydration for those users.
 * - **Never gates content.** The page renders underneath the whole time; this
 *   is a cover, not a gate, so crawlers are unaffected and the `<noscript>`
 *   rule in globals.css removes it entirely without JavaScript.
 */
export function IntroCurtain({
  skipLabel,
  loadingLabel,
  markLabel,
}: IntroCurtainProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const dismiss = useCallback(() => {
    setIsPlaying(false);
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      // Private browsing can throw on write; the intro simply replays.
    }
  }, []);

  /**
   * Decides how long the curtain holds.
   *
   * `sessionStorage` cannot be read during render without risking a hydration
   * mismatch, and writing state straight into an effect body causes a cascading
   * render. So the decision only changes the *delay*: a returning visitor gets
   * zero, which dismisses on the next tick — and the inline script in the
   * layout has already hidden the element via CSS by then, so not a frame of it
   * is ever visible.
   */
  useEffect(() => {
    let hasPlayed = false;
    try {
      hasPlayed = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    } catch {
      hasPlayed = false;
    }

    // `?intro=off` bypasses the curtain. Screenshot and end-to-end runners
    // cannot wait out an animation reliably, and every visual-regression test
    // would otherwise capture whichever frame it happened to land on.
    const isDisabled =
      new URLSearchParams(window.location.search).get("intro") === "off";

    const timer = window.setTimeout(
      dismiss,
      hasPlayed || isDisabled ? 0 : INTRO_DURATION_MS,
    );
    return () => window.clearTimeout(timer);
  }, [dismiss]);

  // Any interaction skips ahead.
  useEffect(() => {
    if (!isPlaying) return;

    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("keydown", dismiss);
    return () => {
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, [isPlaying, dismiss]);

  // Hold the scroll position while the curtain is up.
  useEffect(() => {
    if (!isPlaying) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isPlaying]);

  return (
    <AnimatePresence>
      {isPlaying ? (
        <motion.div
          id="intro-curtain"
          role="status"
          aria-live="polite"
          aria-label={loadingLabel}
          className="bg-cream fixed inset-0 z-[200] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-4%" }}
          transition={{ duration: TIMING.exit.duration, ease: EASE_EXPO }}
        >
          {/* Deliberately a flat field. The hand cut-out carries the logo's
              cream knockout ring baked into the PNG, so anything that tints the
              background behind the mark — a bloom, a gradient — makes that ring
              read as a visible outline instead of disappearing into the page. */}
          <div className="relative flex flex-col items-center">
            <IntroMark
              altText={markLabel}
              markDuration={TIMING.mark.duration}
              handDelay={TIMING.hand.delay}
              handDuration={TIMING.hand.duration}
            />

            {/* Type sizes are derived from the supplied artwork rather than
                picked: there the wordmark's cap height is 0.32 of the H's, and
                the word runs about 2.5x the H's width. `leading-[0.74]` crops
                the line box to the caps so the gaps below match too. */}
            <WipeIn
              delay={TIMING.wordmark.delay}
              duration={TIMING.wordmark.duration}
              className="font-brand mt-[30px] text-[clamp(2.25rem,12vw,4.25rem)] leading-[0.74] font-medium tracking-[0.12em] text-[#9F8772] sm:mt-[38px] sm:text-[5.4rem]"
            >
              HANDLE
            </WipeIn>

            <WipeIn
              delay={TIMING.tagline.delay}
              duration={TIMING.tagline.duration}
              className="font-brand mt-[11px] text-[clamp(0.6rem,3.1vw,0.95rem)] leading-[0.74] tracking-[0.15em] text-[#C4B2A0] uppercase sm:mt-[14px] sm:text-[1.2rem]"
            >
              You heal. We handle the rest.
            </WipeIn>
          </div>

          <motion.button
            type="button"
            onClick={dismiss}
            className="text-ink-400 hover:text-ink focus-visible:outline-gold-600 absolute bottom-8 text-xs underline underline-offset-4 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: TIMING.skip.delay }}
          >
            {skipLabel}
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
