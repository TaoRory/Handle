"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { EASE_EXPO } from "@/lib/motion";

export const INTRO_SESSION_KEY = "handle:intro-played";
const INTRO_DURATION_MS = 2600;

interface IntroCurtainProps {
  skipLabel: string;
  /** Announced to screen readers while the curtain holds the viewport. */
  loadingLabel: string;
}

/**
 * Brand intro.
 *
 * The idea comes straight out of the guideline's own note on the mark: the
 * crossbar of the H is curved "để tạo cảm giác nâng đỡ" — so that it feels like
 * it is being held up. The animation shows exactly that. The two stems draw in,
 * a hand rises from below carrying the crossbar, sets it in place, and
 * withdraws. Handle is the hand that hands it over.
 *
 * Constraints this respects:
 * - **Once per session.** An intro you cannot get past is a toll booth. The
 *   flag lives in `sessionStorage`, and an inline script in the layout reads it
 *   before first paint, so a returning visitor never sees a frame of curtain.
 * - **Always skippable.** Any click, any key, or the skip button ends it.
 * - **Reduced motion.** Handled by `MotionProvider`, not by branching here:
 *   every transform below is simply withheld, leaving the mark to fade up in
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

  const stemTransition = { duration: 0.5, ease: EASE_EXPO } as const;

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
          transition={{ duration: 0.6, ease: EASE_EXPO }}
        >
          {/* Warm bloom so the cream field is not flat while we wait. */}
          <span
            aria-hidden="true"
            className="rounded-pill absolute size-[560px] bg-[radial-gradient(circle,rgba(201,168,106,0.16)_0%,transparent_68%)] blur-2xl"
          />

          <div className="relative flex flex-col items-center">
            <div className="relative h-[132px] w-[122px] sm:h-[156px] sm:w-[144px]">
              {/* Stems draw top-to-bottom. */}
              <svg
                viewBox="0 0 48 52"
                fill="none"
                className="text-ink absolute inset-0 size-full"
                aria-hidden="true"
              >
                <motion.path
                  d="M6 4v44"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ ...stemTransition, delay: 0.1 }}
                />
                <motion.path
                  d="M42 4v44"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ ...stemTransition, delay: 0.22 }}
                />
              </svg>

              {/* The crossbar rides up on the hand and stays behind. */}
              <motion.svg
                viewBox="0 0 48 52"
                fill="none"
                className="text-ink absolute inset-0 size-full"
                aria-hidden="true"
                initial={{ opacity: 0, y: "22%", scale: 0.94 }}
                animate={{ opacity: 1, y: "0%", scale: 1 }}
                transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.45 }}
              >
                <path
                  d="M11.5 27C17 24.5 31 24.5 36.5 27"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* The hand: rises carrying the bar, then withdraws. */}
              <motion.svg
                viewBox="0 0 48 52"
                fill="none"
                className="text-gold absolute inset-0 size-full"
                aria-hidden="true"
                initial={{ opacity: 0, y: "34%" }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: ["34%", "16%", "16%", "24%"],
                }}
                transition={{
                  duration: 1.3,
                  times: [0, 0.34, 0.66, 1],
                  ease: EASE_EXPO,
                  delay: 0.42,
                }}
              >
                {/* Palm-up hand, offering. Sits just under the crossbar. */}
                <path
                  d="M15.5 35.5c-1.4-1.9-2.1-3.3-2.1-4.4 0-1 .8-1.7 1.7-1.7.7 0 1.3.4 1.7 1l1.3 2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.1 32.4v-4.6c0-.9.8-1.7 1.7-1.7s1.7.8 1.7 1.7v4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.5 31.8v-4.9c0-.9.8-1.7 1.7-1.7s1.7.8 1.7 1.7v4.9"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.9 31.8v-4c0-.9.8-1.7 1.7-1.7s1.7.8 1.7 1.7v6.1c0 3.4-2.6 5.6-6 5.6-2.8 0-4.9-1-6.8-3.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Two short rising strokes: the gesture of handing over. */}
                <path
                  d="M31.5 30.5l2.4-2.4M34.5 33.2l3-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </motion.svg>
            </div>

            <motion.span
              className="font-brand text-ink mt-7 text-[1.5rem] leading-none sm:text-[1.75rem]"
              initial={{ opacity: 0, letterSpacing: "0.62em" }}
              animate={{ opacity: 1, letterSpacing: "0.30em" }}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: 1 }}
            >
              HANDLE
            </motion.span>

            <motion.span
              className="font-brand text-ink-400 mt-4 text-[0.625rem] tracking-[0.20em] uppercase sm:text-[0.6875rem]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_EXPO, delay: 1.45 }}
            >
              You heal. We handle the rest.
            </motion.span>
          </div>

          <motion.button
            type="button"
            onClick={dismiss}
            className="text-ink-400 hover:text-ink focus-visible:outline-gold-600 absolute bottom-8 text-xs underline underline-offset-4 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            {skipLabel}
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
