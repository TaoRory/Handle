import type { Locale } from "@/types";

/**
 * The share card, shared by the layout and the homepage.
 *
 * It has to be reachable from both: Next merges metadata shallowly, so a page
 * that redeclares `openGraph` replaces the layout's wholesale — including the
 * images — and the card silently disappears from exactly the page that gets
 * shared.
 */
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Handle — Chăm sóc sức khỏe tại Việt Nam. Handled.",
};

/**
 * The meta description, in one place.
 *
 * It was written out twice — once in the layout, once in the page — which is
 * how two descriptions drift apart and a crawler ends up picking whichever it
 * happened to read.
 */
export function getMetaDescription(locale: Locale) {
  return locale === "vi"
    ? "Chăm sóc sức khỏe tại Việt Nam cùng Handle: tư vấn, đặt lịch, phiên dịch, di chuyển và theo dõi sau điều trị cho khách quốc tế."
    : "Healthcare in Vietnam with Handle: consultation, scheduling, interpreting, transfers and follow-up for international patients.";
}

/** Same reasoning as the description: one list, two consumers. */
export function getKeywords(locale: Locale) {
  return locale === "vi"
    ? [
        "chăm sóc sức khỏe tại Việt Nam",
        "điều trị tại Việt Nam",
        "du lịch y tế Việt Nam",
        "chi phí y tế Việt Nam",
        "concierge y tế",
        "bệnh viện quốc tế Việt Nam",
      ]
    : [
        "medical tourism Vietnam",
        "healthcare in Vietnam",
        "medical concierge",
        "treatment abroad",
        "international hospitals Vietnam",
      ];
}

/** Canonical plus the hreflang set. Identical for every locale, so shared. */
export const LANGUAGE_ALTERNATES = {
  vi: "/vi",
  en: "/en",
  "x-default": "/vi",
} as const;

export function getLocalePageTitle(locale: Locale, variant: "home" | "section") {
  if (locale === "vi") {
    return variant === "home"
      ? "Điều trị tại Việt Nam"
      : "Chăm sóc sức khỏe tại Việt Nam";
  }

  return variant === "home"
    ? "Medical Tourism Vietnam"
    : "Handle Healthcare in Vietnam";
}

/**
 * Whether this deployment should be indexed.
 *
 * Only a Vercel preview is held back, and the check is written that way round
 * on purpose: keying on `VERCEL_ENV === "production"` means every build that is
 * not on Vercel — a self-hosted one, a different platform, a local `next start`
 * — silently ships `noindex` on the whole site. Failing open is the safer
 * default for the one flag that can make a site invisible.
 */
export const IS_INDEXABLE = process.env.VERCEL_ENV !== "preview";

export const ROBOTS = {
  index: IS_INDEXABLE,
  follow: IS_INDEXABLE,
  googleBot: {
    index: IS_INDEXABLE,
    follow: IS_INDEXABLE,
    "max-image-preview": "large",
  },
} as const;
