import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be taught about the custom scales declared in
 * `app/globals.css`. Without this it reads `text-h2` as a *colour* utility
 * (the `text-*` group is ambiguous) and silently drops it when a real colour
 * such as `text-ink` appears in the same merge — headings quietly collapse to
 * body size. Same story for `shadow-gold` and `rounded-pill`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "lead", "eyebrow"] }],
      shadow: [{ shadow: ["xs", "sm", "md", "lg", "gold"] }],
      rounded: [{ rounded: ["sm", "md", "lg", "xl", "pill"] }],
    },
  },
});

/**
 * Merge Tailwind classes so that caller-supplied classes always win over a
 * component's defaults. Every `className` in this codebase goes through here.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Small deterministic string hash (FNV-1a, 32-bit).
 *
 * Used to derive stable pseudo-random values for the generated media plates so
 * the server and the client agree — `Math.random()` would hydrate-mismatch.
 */
export function hashSeed(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** A stable pseudo-random generator seeded by `hashSeed`. */
export function seededRandom(seed: string) {
  let state = hashSeed(seed) || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 10_000) / 10_000;
  };
}

/** Clamp a number into an inclusive range. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** `+84 28 1234 5678` → `+842812345678`, for `tel:` and `wa.me` links. */
export function toDialString(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}
