import { getServices } from "@/data";
import { ROUTES, routePath, siteConfig } from "@/lib/site-config";

import { LOCALES, type Locale } from "@/types";

import type { MetadataRoute } from "next";

export const revalidate = 3600;

/** Flipped on when `app/[locale]/dich-vu/[slug]` ships. */
const SERVICE_PAGES_LIVE = false;

/**
 * Every indexable URL, with its alternates.
 *
 * Built from the same `ROUTES` constants and the same `services` collection the
 * pages render from, rather than from a hand-written list. A sitemap maintained
 * separately from the router is a sitemap that goes stale on the first route
 * anyone adds without remembering this file — and a URL missing from it on a
 * domain with no inbound links may simply never be found.
 *
 * Service slugs differ per locale (`nha-khoa` / `dental-care`), so the
 * alternates for those entries are resolved through each locale's own record
 * rather than by substituting the locale segment.
 */
function serviceSlug(locale: Locale, id: string): string | undefined {
  return getServices(locale).find((service) => service.id === id)?.slug;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const absolute = (path: string) => `${siteConfig.url}${path}`;

  const languages = (paths: Record<Locale, string>) => ({
    "x-default": absolute(paths.vi),
    vi: absolute(paths.vi),
    en: absolute(paths.en),
  });

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: absolute(routePath(locale)),
      lastModified,
      changeFrequency: locale === "vi" ? "weekly" : "monthly",
      priority: locale === "vi" ? 1 : 0.9,
      alternates: {
        languages: languages({
          vi: routePath("vi"),
          en: routePath("en"),
        }),
      },
    });

    entries.push({
      url: absolute(routePath(locale, ROUTES.cost)),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: languages({
          vi: routePath("vi", ROUTES.cost),
          en: routePath("en", ROUTES.cost),
        }),
      },
    });

    /* Specialty pages are not listed yet — the route does not exist, and a
       sitemap that advertises 404s costs crawl budget and trust on a domain
       that has neither to spare. Re-enable with `/dich-vu/[slug]`. */
    for (const service of SERVICE_PAGES_LIVE ? getServices(locale) : []) {
      const viSlug = serviceSlug("vi", service.id);
      const enSlug = serviceSlug("en", service.id);

      entries.push({
        url: absolute(routePath(locale, ROUTES.services, service.slug)),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates:
          viSlug && enSlug
            ? {
                languages: languages({
                  vi: routePath("vi", ROUTES.services, viSlug),
                  en: routePath("en", ROUTES.services, enSlug),
                }),
              }
            : undefined,
      });
    }
  }

  return entries;
}
