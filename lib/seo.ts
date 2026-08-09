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
  alt: "Handle — Chăm sóc sức khỏe tại Việt Nam, đã có chúng tôi lo.",
};

/**
 * The meta description, in one place.
 *
 * It was written out twice — once in the layout, once in the page — which is
 * how two descriptions drift apart and a crawler ends up picking whichever it
 * happened to read.
 */
export function getMetaDescription(locale: Locale) {
  /*
   * Written to the ~155 characters a result actually shows, leading with the
   * phrase people search rather than with the brand — Google bolds the matched
   * words, and a description that opens on a name nobody is looking for yet
   * wastes the only line of persuasion a new site gets. It closes on the offer
   * because the snippet has to earn the click, not just describe the page.
   */
  return locale === "vi"
    ? "Chăm sóc sức khỏe tại Việt Nam cùng Handle: chọn bệnh viện và bác sĩ, báo giá trước, phiên dịch, di chuyển và theo dõi sau điều trị. Tư vấn miễn phí."
    : "Healthcare in Vietnam with Handle: hospital and surgeon matching, upfront pricing, interpreters, transfers and follow-up after you fly home. Free consultation.";
}

/**
 * The topics this site is about.
 *
 * Google has ignored the `keywords` meta tag for two decades, so on its own
 * this list would be decoration. It earns its place by also feeding
 * `knowsAbout` on the Organization node, which answer engines *do* read when
 * deciding whether an entity is relevant to a question.
 *
 * Weighted towards phrases this page can realistically win. The head term
 * "chăm sóc sức khỏe Việt Nam" is in here because the page genuinely is about
 * it, not because a one-page site is going to outrank the Ministry of Health
 * for it — the entries that will actually convert are the specific ones below.
 */
export function getKeywords(locale: Locale) {
  return locale === "vi"
    ? [
        "chăm sóc sức khỏe tại Việt Nam",
        "du lịch y tế Việt Nam",
        "khám chữa bệnh cho người nước ngoài tại Việt Nam",
        "dịch vụ hỗ trợ y tế cho Việt kiều",
        "chi phí điều trị tại Việt Nam",
        "phiên dịch y tế bệnh viện",
        "đặt lịch khám bệnh viện quốc tế Việt Nam",
        "concierge y tế",
      ]
    : [
        "medical tourism Vietnam",
        "healthcare in Vietnam for foreigners",
        "medical concierge Vietnam",
        "cost of surgery in Vietnam",
        "international hospitals Vietnam",
        "medical interpreter Vietnam",
        "treatment abroad for expats",
      ];
}

/** Canonical plus the hreflang set. Identical for every locale, so shared. */
export const LANGUAGE_ALTERNATES = {
  vi: "/vi",
  en: "/en",
  "x-default": "/vi",
} as const;

/**
 * Titles, sized to the ~60 characters a result renders before truncating.
 *
 * The homepage previously shipped "Điều trị tại Việt Nam | Handle" — thirty
 * characters, half the available line given away, and it dropped the very
 * phrase the layout had been targeting. A title is the strongest on-page
 * ranking signal there is, so the homepage now carries both queries this page
 * can plausibly compete on: the category people search, and the narrower one it
 * actually matches.
 */
export function getLocalePageTitle(locale: Locale, variant: "home" | "section") {
  if (locale === "vi") {
    return variant === "home"
      ? "Chăm sóc sức khỏe & du lịch y tế tại Việt Nam"
      : "Chăm sóc sức khỏe tại Việt Nam";
  }

  return variant === "home"
    ? "Healthcare & Medical Tourism in Vietnam"
    : "Healthcare in Vietnam";
}

/**
 * Search Console / Bing ownership tokens.
 *
 * A domain this new is not found by crawling — nothing links to it yet. Search
 * Console is how the sitemap gets submitted and indexing gets requested, and it
 * needs a verified owner first. Left blank until the tokens exist, and the
 * fields are dropped rather than emitted empty, because a `content=""`
 * verification tag fails verification instead of being ignored.
 */
export function getVerification() {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();

  if (!google && !bing) return undefined;

  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
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
