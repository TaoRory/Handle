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
 * Placeholder contact details — replace before launch.
 */
export const siteConfig = {
  name: "Handle",
  /* Branded searches arrive as both. Declared to schema.org so the two resolve
     to one entity instead of competing for the same result. */
  alternateName: "Handle Vietnam",
  wordmark: "HANDLE",
  domain: DOMAIN,
  url: SITE_URL,
  email: "contact@handle.vn",
  phone: "+84 28 1234 5678",
  whatsapp: "+84 28 1234 5678",
  /* Zalo is how Vietnamese patients and their families actually message. */
  zalo: "+84 28 1234 5678",
  addressLines: ["Tầng 5, 123 Nguyễn Huệ", "Quận 1, TP. Hồ Chí Minh, Việt Nam"],
  socials: {
    facebook: "https://facebook.com/handle.vn",
    instagram: "https://instagram.com/handle.vn",
    youtube: "https://youtube.com/@handle.vn",
    linkedin: "https://linkedin.com/company/handle-vn",
  },
} as const;

export const contactLinks = {
  tel: `tel:${toDialString(siteConfig.phone)}`,
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
