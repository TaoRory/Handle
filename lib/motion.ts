import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language.
 *
 * Rules from CLAUDE.md: entrances travel at most 24px, run 0.5s on an expo-out
 * curve, fire once, and collapse to a plain fade under `prefers-reduced-motion`.
 * Components import these instead of inventing their own timings.
 */

export const EASE_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  micro: 0.2,
  entrance: 0.5,
  hero: 0.7,
  drift: 1.2,
} as const;

/** The viewport contract every `whileInView` in the project uses. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export const transition: Transition = {
  duration: DURATION.entrance,
  ease: EASE_EXPO,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { ...transition, duration: DURATION.hero } },
};

/** Applied to a list wrapper; children inherit the delay. Capped at 6 steps. */
export function staggerContainer(step = 0.07, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: step, delayChildren },
    },
  };
}

/** Reduced-motion replacement: opacity only, no transform, near-instant. */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.micro } },
};
