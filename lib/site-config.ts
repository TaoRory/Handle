import { toDialString } from "@/lib/utils";

const DOMAIN = "handlevietnam.com";

/**
 * The canonical origin — hardcoded, and deliberately not read from
 * `NEXT_PUBLIC_SITE_URL`.
 *
 * That variable was still set to `https://handle.vn` in Vercel after the domain
 * moved, and `handle.vn` does not resolve at all. Every canonical, `hreflang`,
 * `og:url`, sitemap entry and JSON-LD `@id` on the live site therefore named a
 * non-existent origin — and a canonical naming another origin is an instruction
 * to index *that* one instead. The production site was telling Google to drop
 * it, which no amount of schema or copy can compensate for.
 *
 * The canonical domain is a fact about the business, not a property of a
 * deployment, so it belongs in a reviewed file rather than a dashboard field
 * nobody reads twice. Previews are `noindex` regardless (`IS_INDEXABLE`), so a
 * canonical pointing at production is the correct answer there too.
 */
export const SITE_URL = `https://${DOMAIN}`;

/**
 * Single source of truth for anything that is the same in every language:
 * URLs, phone numbers, section anchors.
 *
 * The hotlines and the email are the real ones. The street address and the
 * social handles are still placeholders — replace before launch.
 */
export const siteConfig = {
  name: "Handle",
  /* Branded searches arrive as both. Declared to schema.org so the two resolve
     to one entity instead of competing for the same result. */
  alternateName: "Handle Vietnam",
  wordmark: "HANDLE",
  domain: DOMAIN,
  url: SITE_URL,
  email: "handlevietnam@gmail.com",

  /**
   * Two hotlines, in reading order: Vietnam first because it is the primary
   * market, Australia second because it is where most of the overseas audience
   * calls from.
   *
   * `display` carries the international prefix even for the Vietnamese line,
   * which locally is dialled as 077. A reader in Sydney cannot use 077, and a
   * reader in Hanoi can use +84 — the form that works for everybody is the one
   * that ships. `dial` is what the `tel:` href needs: digits and a plus, no
   * spaces.
   */
  phones: [
    { id: "vn", display: "+84 77 333 3247", dial: "+84773333247" },
    { id: "au", display: "+61 424 648 595", dial: "+61424648595" },
  ],

  /*
   * ⚠️ Which line each messaging app is registered to is an assumption.
   *
   * Zalo is a Vietnamese app, so it points at the Vietnamese number; WhatsApp
   * is what the Australian audience uses, so it points at the Australian one.
   * Both are guesses about where an account actually exists, and a chat link
   * to a number with no account fails silently — the visitor sees WhatsApp
   * shrug rather than an error. Confirm both before launch.
   */
  whatsapp: "+61424648595",
  zalo: "+84773333247",
  addressLines: ["Tầng 5, 123 Nguyễn Huệ", "Quận 1, TP. Hồ Chí Minh, Việt Nam"],
  socials: {
    facebook: "https://facebook.com/handle.vn",
    instagram: "https://instagram.com/handle.vn",
    youtube: "https://youtube.com/@handle.vn",
    linkedin: "https://linkedin.com/company/handle-vn",
  },
} as const;

export const contactLinks = {
  /** The Vietnamese line, for the single-number places. */
  tel: `tel:${siteConfig.phones[0].dial}`,
  /** Both lines, in order, ready to render. */
  phones: siteConfig.phones.map((phone) => ({
    ...phone,
    href: `tel:${phone.dial}`,
  })),
  mail: `mailto:${siteConfig.email}`,
  whatsapp: `https://wa.me/${toDialString(siteConfig.whatsapp).replace("+", "")}`,
  zalo: `https://zalo.me/${toDialString(siteConfig.zalo).replace("+", "")}`,
} as const;

/**
 * Homepage anchors.
 *
 * These become real routes in phase 2; keeping them in one object means the
 * nav, the footer and the sections can never drift apart.
 */
export const SECTION_IDS = {
  hero: "trang-chu",
  partners: "doi-tac",
  whyVietnam: "vi-sao-viet-nam",
  about: "gioi-thieu",
  whyUs: "vi-sao-handle",
  journey: "hanh-trinh",
  stats: "con-so",
  services: "dich-vu",
  experiences: "trai-nghiem",
  testimonials: "cau-chuyen",
  faq: "cau-hoi",
  cta: "lien-he",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/**
 * Real routes, below the locale segment.
 *
 * The path segments are shared across locales, matching what `SECTION_IDS`
 * already does for anchors — `/en/dich-vu/...` rather than a parallel English
 * tree. A per-locale segment map would mean two URLs per page for a crawler to
 * reconcile, and `hreflang` already tells it which language it is looking at.
 *
 * Leaf slugs *are* localized, because `services.ts` carries a slug per locale
 * and a Vietnamese reader searching "nha khoa" should land on a URL that says
 * so. Segments shared, leaves localized.
 */
export const ROUTES = {
  cost: "chi-phi",
  services: "dich-vu",
} as const;

/** `("en", "dich-vu", "dental-care")` → `"/en/dich-vu/dental-care"`. */
export function routePath(locale: string, ...segments: string[]): string {
  return `/${[locale, ...segments].filter(Boolean).join("/")}`;
}

/**
 * Resolve a stored href against the current locale.
 *
 * Three forms, and the distinction is the leading character:
 *
 *   `"#gioi-thieu"`      → `/vi#gioi-thieu`      a band of the homepage
 *   `"chi-phi"`          → `/vi/chi-phi`         a route below the locale
 *   `"https://…"`, `"tel:…"`                     left exactly as written
 *
 * Anchors need resolving because the nav and footer stored them while there was
 * only one page to anchor into. From any second route a bare `#gioi-thieu`
 * matches nothing and the link silently does nothing — the reader clicks and
 * stays where they were.
 *
 * Route links are stored without the locale for the same reason they are stored
 * without the origin: a record that names its own language cannot be reused by
 * the other one, and a CMS should never have to know which locale it is being
 * read in.
 */
export function resolveHref(href: string, locale: string): string {
  if (href.startsWith("#")) return `${routePath(locale)}${href}`;
  if (/^([a-z]+:|\/)/i.test(href)) return href;
  return routePath(locale, href);
}

/**
 * Reading order of the numbered bands.
 *
 * Since the eyebrow chips were removed, the only consumer is the fixed
 * `SectionNav` down the right edge — position in the page is now stated once,
 * in one place. The hero and the partner strip are deliberately excluded:
 * they are the cover, not a chapter.
 */
export const SECTION_ORDER = [
  SECTION_IDS.whyVietnam,
  SECTION_IDS.about,
  SECTION_IDS.whyUs,
  SECTION_IDS.journey,
  SECTION_IDS.stats,
  SECTION_IDS.services,
  SECTION_IDS.testimonials,
  SECTION_IDS.faq,
] as const;

/** `"gioi-thieu"` → `"02"`. Returns `""` for sections outside the sequence. */
export function sectionStep(id: string): string {
  const index = (SECTION_ORDER as readonly string[]).indexOf(id);
  return index === -1 ? "" : String(index + 1).padStart(2, "0");
}
