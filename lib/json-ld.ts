import { getFaqs, getServices } from "@/data";
import { getKeywords } from "@/lib/seo";
import { SECTION_IDS, siteConfig } from "@/lib/site-config";

import type { Locale, SiteContent } from "@/types";

/**
 * The page's structured data, as one graph.
 *
 * One graph and not several scripts: every node carries an `@id`, and the
 * cross-references between them (`publisher`, `provider`, `isPartOf`) are what
 * turn a pile of types into a description of a single business. Two scripts
 * declaring the same `@id` with different bodies is worse than none, which is
 * the state this replaced.
 *
 * The `FAQPage` and `Service` nodes exist for answer engines rather than for a
 * rich result. A model summarising "medical concierge Vietnam" can lift a
 * question-and-answer pair or a named specialty straight out of this; it cannot
 * reliably lift the same thing out of an accordion built from `div`s.
 *
 * Deliberately absent: `AggregateRating`. The testimonials behind it are
 * placeholder copy, and publishing a review score that no real patient gave is
 * a policy violation with a manual action attached, not a small exaggeration.
 * Restore it when the reviews are real — the average is already computed by
 * `getAggregateRating`.
 */
export function generateMedicalOrganizationSchema(
  locale: Locale,
  content: SiteContent,
) {
  const baseUrl = siteConfig.url;
  const pageUrl = `${baseUrl}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: siteConfig.name,
        // "Handle" alone is an English verb and a hopeless branded query. The
        // alternate is what people actually type, and declaring it here binds
        // the two to one entity rather than leaving them to compete.
        alternateName: siteConfig.alternateName,
        url: baseUrl,
        // A real raster, not the .ico: Google reads this field as an image and
        // does not reliably decode favicons.
        logo: `${baseUrl}/og.jpg`,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        // The topics this entity is *about*. Nothing here is a claim about
        // outcomes — it is the subject matter of the page, stated in the terms
        // a query would use, which is what an answer engine matches against
        // when deciding whether this organisation is relevant at all.
        knowsAbout: getKeywords(locale),
        knowsLanguage: ["vi", "en"],
        areaServed: { "@type": "Country", name: "Vietnam" },
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
        url: pageUrl,
        description: content.hero.lead,
        parentOrganization: { "@id": `${baseUrl}/#organization` },
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
        // The specialties Handle coordinates, each pointing at the anchor that
        // describes it. This is the list an answer engine reads when asked what
        // the business actually does.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: content.services.title,
          itemListElement: getServices(locale).map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalProcedure",
              "@id": `${pageUrl}#${service.slug}`,
              name: service.title,
              description: service.body,
              url: `${pageUrl}#${SECTION_IDS.services}`,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: content.htmlLang,
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: getFaqs(locale).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: siteConfig.name,
        inLanguage: content.htmlLang,
        publisher: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.hero.titleLead.replace("\n", " "),
        description: content.hero.lead,
        inLanguage: content.htmlLang,
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#medical-business` },
        primaryImageOfPage: `${baseUrl}/og.jpg`,
      },
    ],
  };
}
