import { getFaqs, getServices } from "@/data";
import { getKeywords } from "@/lib/seo";
import { SECTION_IDS, siteConfig } from "@/lib/site-config";

import type { Faq, Locale, SiteContent } from "@/types";

/**
 * The site-wide graph: who this business is. Emitted by the layout, so it is
 * on every route.
 *
 * Nodes are grouped by lifetime, not crammed into one script. The rule the
 * earlier fix established was never "one script per page" — it was that one
 * `@id` must never carry two different bodies, which is what happened when the
 * layout and the homepage each defined `#organization` their own way. These
 * nodes describe the organisation and are identical everywhere; the ones that
 * describe a particular URL live with that URL and use `@id`s of their own.
 * Disjoint identifiers across two scripts is exactly what schema.org's `@id`
 * mechanism is for, and it stops every sub-page from restating the homepage's
 * `WebPage` node as though it were its own.
 *
 * The `MedicalProcedure` catalogue exists for answer engines rather than for a
 * rich result. A model summarising "medical concierge Vietnam" can lift a named
 * specialty straight out of this; it cannot reliably lift the same thing out of
 * a grid of `div`s.
 *
 * Deliberately absent: `AggregateRating`. The testimonials behind it are
 * placeholder copy, and publishing a review score that no real patient gave is
 * a policy violation with a manual action attached, not a small exaggeration.
 * Restore it when the reviews are real — the average is already computed by
 * `getAggregateRating`.
 */
export function generateSiteSchema(locale: Locale, content: SiteContent) {
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

/**
 * The homepage's own nodes: what this particular URL is.
 *
 * Split out of the site graph above because it was travelling with it. Every
 * route rendered the layout, so `/vi/chi-phi` was serving a `WebPage` node
 * whose `@id` and `url` were the homepage's, alongside the homepage's seven
 * FAQ answers — telling a crawler that the cost page is the homepage, and
 * putting the same questions on every URL of the site.
 */
export function generateHomeSchema(locale: Locale, content: SiteContent) {
  const baseUrl = siteConfig.url;
  const pageUrl = `${baseUrl}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        /* The whole h1, accent included. It used to be `titleLead` alone, which
           was harmless while the accent was a separate word ("Handled.") and
           became a dangling em dash the moment the headline turned into one
           sentence broken across the two fields. */
        name: `${content.hero.titleLead.replace("\n", " ")} ${content.hero.titleAccent}`,
        description: content.hero.lead,
        inLanguage: content.htmlLang,
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#medical-business` },
        primaryImageOfPage: `${baseUrl}/og.jpg`,
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
    ],
  };
}

/**
 * The graph for a standalone page.
 *
 * Deliberately smaller than the homepage's. `Organization`, `MedicalBusiness`
 * and `WebSite` are already defined, with `@id`s, on a page a crawler has
 * almost certainly already fetched; restating them here in an abbreviated form
 * would put two different bodies behind one identifier, which is the exact
 * failure that collapsed the two homepage scripts into one. These nodes point
 * at those instead.
 *
 * `BreadcrumbList` earns its place now that there is a hierarchy to describe —
 * on a one-page site it was a fabricated trail, which is why it was skipped.
 *
 * `faqs` is optional, and when it is passed the questions are the same ones
 * rendered on the page. There is no second copy of this content anywhere.
 */
export function generatePageSchema({
  locale,
  htmlLang,
  path,
  name,
  description,
  trail,
  faqs,
}: {
  locale: Locale;
  htmlLang: string;
  /** Segments below the locale, e.g. `["dich-vu", "nha-khoa"]`. */
  path: string[];
  name: string;
  description: string;
  /** Visible breadcrumb labels, root first, including the current page. */
  trail: { label: string; path: string[] }[];
  faqs?: Faq[];
}) {
  const baseUrl = siteConfig.url;
  const pageUrl = [baseUrl, locale, ...path].join("/");

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name,
      description,
      inLanguage: htmlLang,
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": `${baseUrl}/#medical-business` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        item: [baseUrl, locale, ...crumb.path].join("/"),
      })),
    },
  ];

  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: htmlLang,
      isPartOf: { "@id": `${baseUrl}/#website` },
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
