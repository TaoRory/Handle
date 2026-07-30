import { en } from "@/content/en";
import { vi } from "@/content/vi";

import { LOCALES, type Locale, type SiteContent } from "@/types";

export const DEFAULT_LOCALE: Locale = "vi";

const dictionaries: Record<Locale, SiteContent> = { vi, en };

/** The one accessor components use. Swap the body for a CMS fetch later. */
export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Short labels for the language switcher. */
export const LOCALE_LABELS: Record<Locale, { short: string; long: string }> = {
  vi: { short: "VI", long: "Tiếng Việt" },
  en: { short: "EN", long: "English" },
};

export { en, vi };
