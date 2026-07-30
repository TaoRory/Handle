import { getAggregateRating } from "@/data";
import { siteConfig } from "@/lib/site-config";

import type { Locale, SiteContent } from "@/types";

/**
 * JSON-LD for the homepage.
 *
 * `MedicalBusiness` rather than plain `Organization`, because that is what a
 * medical-concierge operator is in schema.org terms — and it is what unlocks
 * the richer result treatment for health queries.
 */
export function buildJsonLd(locale: Locale, content: SiteContent) {
  const rating = getAggregateRating(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        slogan: content.footer.tagline,
        sameAs: Object.values(siteConfig.socials),
      },
      {
        "@type": "MedicalBusiness",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        parentOrganization: { "@id": `${siteConfig.url}/#organization` },
        url: `${siteConfig.url}/${locale}`,
        description: content.hero.lead,
        priceRange: "$$",
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.addressLines[0],
          addressLocality: "Ho Chi Minh City",
          addressCountry: "VN",
        },
        areaServed: "Vietnam",
        availableLanguage: ["vi", "en"],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating.ratingValue,
          reviewCount: rating.reviewCount,
          bestRating: "5",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: content.htmlLang,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}
