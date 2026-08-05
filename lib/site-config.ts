import { toDialString } from "@/lib/utils";

/**
 * Single source of truth for anything that is the same in every language:
 * URLs, phone numbers, section anchors.
 *
 * Placeholder contact details — replace before launch.
 */
export const siteConfig = {
  name: "Handle",
  wordmark: "HANDLE",
  domain: "handlevietnam.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://handlevietnam.com",
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
