import { siteConfig } from "@/lib/site-config";

import { LOCALES } from "@/types";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "vi" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((alt) => [alt, `${siteConfig.url}/${alt}`]),
      ),
    },
  }));
}
