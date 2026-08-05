import { siteConfig } from "@/lib/site-config";

import { LOCALES } from "@/types";

import type { MetadataRoute } from "next";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: locale === "vi" ? "weekly" : "monthly",
    priority: locale === "vi" ? 1 : 0.9,
    alternates: {
      languages: {
        "x-default": `${siteConfig.url}/vi`,
        vi: `${siteConfig.url}/vi`,
        en: `${siteConfig.url}/en`,
      },
    },
  }));
}
