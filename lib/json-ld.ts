import { getAggregateRating } from "@/data";
import { siteConfig } from "@/lib/site-config";

import type { Locale, SiteContent } from "@/types";

export function generateMedicalOrganizationSchema(
  locale: Locale,
  content: SiteContent,
) {
  const rating = getAggregateRating(locale);
  const baseUrl = siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: siteConfig.name,
        url: baseUrl,
        // A real raster, not the .ico: Google reads this as an image and does not
        // reliably decode favicons.
        logo: `${baseUrl}/og.jpg`,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        sameAs: Object.values(siteConfig.socials),
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.addressLines[0],
          addressLocality: "Ho Chi Minh City",
          addressCountry: "VN",
        },
      },
      {
        "@type": "MedicalBusiness",
        "@id": `${baseUrl}/#medical-business`,
        name: siteConfig.name,
        url: `${baseUrl}/${locale}`,
        description: content.hero.lead,
        medicalSpecialty: [
          "Medical Concierge",
          "Healthcare Services",
          "Medical Tourism",
        ],
        areaServed: [
          { "@type": "Country", name: "Vietnam" },
          { "@type": "Place", name: "International" },
        ],
        availableLanguage: ["vi", "en"],
        priceRange: "$$",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          contactType: "customer service",
          availableLanguage: ["Vietnamese", "English"],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating.ratingValue,
          reviewCount: rating.reviewCount,
          bestRating: "5",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: siteConfig.name,
        inLanguage: content.htmlLang,
        publisher: { "@id": `${baseUrl}/#organization` },
      },
    ],
  };
}
