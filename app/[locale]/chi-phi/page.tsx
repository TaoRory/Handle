import { notFound } from "next/navigation";

import { CostFactors } from "@/components/sections/CostFactors";
import { CostHero } from "@/components/sections/CostHero";
import { CostInclusions } from "@/components/sections/CostInclusions";
import { CostTable } from "@/components/sections/CostTable";
import { FaqBand } from "@/components/sections/FaqBand";
import { PageClosing } from "@/components/sections/PageClosing";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { getContent, getPageContent, isLocale } from "@/content";
import { getCostFactors, getCostInclusions, getCostItems, getServices } from "@/data";
import { generatePageSchema } from "@/lib/json-ld";
import { OG_IMAGE, ROBOTS } from "@/lib/seo";
import { ROUTES, routePath, siteConfig } from "@/lib/site-config";

import { LOCALES, type Locale } from "@/types";

import type { Metadata } from "next";

/**
 * `/[locale]/chi-phi` — what treatment in Vietnam costs.
 *
 * The first route beyond the homepage, and the one with the clearest reason to
 * exist: "chi phí điều trị tại Việt Nam" is the question this audience actually
 * types, and Google ranks pages rather than sites — the homepage cannot compete
 * for it while its own `h1` is about something else.
 *
 * Band order and surface rhythm, under the same rules as the homepage:
 *
 *   hero        cream
 *   table       white
 *   inclusions  cream-300
 *   factors     white
 *   faq         cream
 *   closing     INK      ← the one accent surface
 */

const BANDS = {
  table: "bang-gia",
  inclusions: "bao-gom",
  factors: "yeu-to",
  faq: "cau-hoi-chi-phi",
  closing: "bao-gia",
} as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};

  const locale = raw as Locale;
  const { cost } = getPageContent(locale);
  const { htmlLang } = getContent(locale);
  const path = routePath(locale, ROUTES.cost);

  /*
   * No ` | Handle` appended here. The layout declares `title.template` as
   * `"%s · Handle"`, and unlike the homepage — which shares a segment with the
   * layout and so never sees the template — this is a child segment, where it
   * does apply. Writing the brand in as well produced "… | Handle · Handle" in
   * the rendered tab. The `openGraph` and `twitter` titles do not inherit the
   * template, so those carry the brand explicitly.
   */
  const title = cost.metaTitle;
  const socialTitle = `${cost.metaTitle} · ${siteConfig.name}`;

  return {
    title,
    description: cost.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        vi: routePath("vi", ROUTES.cost),
        en: routePath("en", ROUTES.cost),
        "x-default": routePath("vi", ROUTES.cost),
      },
    },
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      locale: htmlLang.replace("-", "_"),
      url: `${siteConfig.url}${path}`,
      title: socialTitle,
      description: cost.metaDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: cost.metaDescription,
      images: [OG_IMAGE],
    },
    robots: ROBOTS,
  };
}

export default async function CostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;
  const { cost } = getPageContent(locale);
  const content = getContent(locale);

  const home = content.nav.links[0].label;
  const schema = generatePageSchema({
    locale,
    htmlLang: content.htmlLang,
    path: [ROUTES.cost],
    name: cost.metaTitle,
    description: cost.metaDescription,
    trail: [
      { label: home, path: [] },
      { label: cost.breadcrumb, path: [ROUTES.cost] },
    ],
    faqs: cost.faq.items,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <CostHero copy={cost.hero} locale={locale} tableId={BANDS.table} />

      {/* Below the hero rather than above it: the trail is wayfinding, and
          putting it over the h1 pushes the page's own answer down the screen
          for the sake of a link most readers will never take. */}
      <Container className="pb-4">
        <Breadcrumb
          label={cost.breadcrumb}
          items={[
            { label: home, href: routePath(locale) },
            { label: cost.breadcrumb },
          ]}
        />
      </Container>

      <CostTable
        id={BANDS.table}
        copy={cost.table}
        items={getCostItems(locale)}
        locale={locale}
        services={getServices(locale)}
      />

      <CostInclusions
        id={BANDS.inclusions}
        copy={cost.inclusions}
        items={getCostInclusions(locale)}
      />

      <CostFactors
        id={BANDS.factors}
        copy={cost.factors}
        factors={getCostFactors(locale)}
      />

      <FaqBand id={BANDS.faq} copy={cost.faq} items={cost.faq.items} />

      <PageClosing id={BANDS.closing} copy={cost.closing} locale={locale} />
    </>
  );
}
