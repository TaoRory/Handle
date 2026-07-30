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
  domain: "handle.vn",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://handle.vn",
  email: "contact@handle.vn",
  phone: "+84 28 1234 5678",
  whatsapp: "+84 28 1234 5678",
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
  services: "dich-vu",
  experiences: "trai-nghiem",
  testimonials: "cau-chuyen",
  cta: "lien-he",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
