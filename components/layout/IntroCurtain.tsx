"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { IntroMark } from "@/components/layout/IntroMark";
import { INTRO_SESSION_KEY } from "@/lib/intro";
import { EASE_EXPO } from "@/lib/motion";

/* Re-exported so existing imports keep working; the value itself lives in a
   non-client module — see the note there. */
export { INTRO_SESSION_KEY } from "@/lib/intro";

/**
 * Intro timeline, in seconds. Kept in one place because the steps have to stay
 * in step with each other — nudging any single delay in isolation is how an
 * intro ends up feeling ragged.
 *
 *   0.00  the mark fades in                      (0.70s)
 *   0.12  the stems draw outward from the centre line (0.62s, done 0.74)
 *   0.80  the crossbar draws left to right       (0.90s, lands at 1.70)
 *   0.90  the skip control fades up
 *   1.90  HANDLE and the tagline fade up together (0.40s, ends 2.30)
 *   2.30  ── one full second of stillness, so the lockup can be read ──
 *   3.30  the curtain lifts                      (0.65s)
 *
 * Two steps are not declared here. The bar growth and the crossbar draw are both
 * CSS animations in `globals.css` (`--animate-intro-bar`,
 * `--animate-intro-bridge`), because Motion withholds its animations under
 * reduced motion and would leave the H as two slivers with no middle. Their
 * delays and durations are the numbers the rest of this sequence is set against,
 * so the two files have to move together.
 *
 * The two lines of type share one delay on purpose: they are one lockup, and
 * staggering them made the tagline read as an afterthought rather than part of
 * the mark. The type still arrives after the crossbar has landed — the mark
 * completing itself is the thing to watch.
 */
const TIMING = {
  mark: { duration: 0.7 },
  skip: { delay: 0.9 },
  /** Shared by both lines of type. Keep them equal. */
  type: { delay: 1.9, duration: 0.4 },
  exit: { duration: 0.65 },
} as const;

/**
 * How long the curtain holds before it starts lifting.
 * Set to the type landing (2.30s) plus the one second of reading time.
 */
const INTRO_DURATION_MS = 3300;

interface IntroCurtainProps {
  skipLabel: string;
  /** Announced to screen readers while the curtain holds the viewport. */
  loadingLabel: string;
}

/**
 * Plain opacity fade for the two lines of type.
 *
 * Opacity only, and that is the point: it is not a transform, so
 * `MotionProvider` does not withhold it under reduced motion. Anything that
 * moved the text into place — a sliding cover, a clip-path wipe, a translate —
 * would be withheld there and leave the words hidden for exactly the users the
 * setting is meant to help. A fade is the one reveal that cannot fail that way.
 */
function FadeIn({
  children,
  delay,
  duration = 0.4,
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, ease: EASE_EXPO, delay }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Brand intro.
 *
 * The two stems draw outward from the centre line, then the crossbar draws
 * across between them, left to right, bridging the two into an H. The wordmark
 * and tagline fade up together beneath it afterwards: the mark completing
 * itself is the thing to watch, the words only need to arrive.
 *
 * Constraints this respects:
 * - **Once per session.** An intro you cannot get past is a toll booth. The
 *   flag lives in `sessionStorage`, and an inline script in the layout reads it
 *   before first paint, so a returning visitor never sees a frame of curtain.
 * - **Always skippable.** Any click, any key, or the skip button ends it.
 * - **Reduced motion.** Handled by `MotionProvider`, not by branching here:
 *   the transforms are simply withheld, so the mark and the type fade up in
 *   place. Branching on the preference in render would change the SSR output
 *   and break hydration for those users.
 * - **Never gates content.** The page renders underneath the whole time; this
 *   is a cover, not a gate, so crawlers are unaffected and the `<noscript>`
 *   rule in globals.css removes it entirely without JavaScript.
 */
export function IntroCurtain({ skipLabel, loadingLabel }: IntroCurtainProps) {
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
          {/* A flat field, and now simply because nothing needs to be behind a
              thin gold stroke on cream. The original reason — a hand cut-out
              carrying a baked-in cream knockout ring that any tint would expose
              as an outline — went with the hand. */}
          <div className="relative flex flex-col items-center">
            <IntroMark markDuration={TIMING.mark.duration} />

            {/* Wordmark and tagline take the header lockup's colours now that
                the mark does: gold mark, ink word, `ink-400` tagline. They were
                the old artwork's taupe and tan, which read as a third palette
                the moment the mark stopped being that drawing.

                Sizes still come from the artwork's proportions rather than
                being picked — cap height 0.32 of the H's, the word about 2.5x
                its width. `leading-[0.74]` crops the line box to the caps so
                the gaps below match too. */}
            <FadeIn
              delay={TIMING.type.delay}
              duration={TIMING.type.duration}
              className="font-brand text-ink mt-[30px] text-[clamp(2.25rem,12vw,4.25rem)] leading-[0.74] font-medium tracking-[0.12em] sm:mt-[38px] sm:text-[5.4rem]"
            >
              HANDLE
            </FadeIn>

            <FadeIn
              delay={TIMING.type.delay}
              duration={TIMING.type.duration}
              className="font-brand text-ink-400 mt-[11px] text-[clamp(0.6rem,3.1vw,0.95rem)] leading-[0.74] tracking-[0.15em] uppercase sm:mt-[14px] sm:text-[1.2rem]"
            >
              You heal. We handle the rest.
            </FadeIn>
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
