import { notFound } from "next/navigation";

import { FaqBand } from "@/components/sections/FaqBand";
import { PageClosing } from "@/components/sections/PageClosing";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ServiceCost } from "@/components/sections/ServiceCost";
import { ServiceFacts } from "@/components/sections/ServiceFacts";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceIncludes } from "@/components/sections/ServiceIncludes";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { getContent, getPageContent, isLocale } from "@/content";
import {
  getCostItemsForService,
  getServiceBySlug,
  getServiceDetail,
  getServices,
} from "@/data";
import { generatePageSchema } from "@/lib/json-ld";
import { OG_IMAGE, ROBOTS } from "@/lib/seo";
import { ROUTES, routePath, siteConfig } from "@/lib/site-config";

import { LOCALES, type Locale } from "@/types";

import type { Metadata } from "next";

/**
 * `/[locale]/dich-vu/[slug]` — one page per specialty.
 *
 * Six pages, not one page with six tabs, because Google ranks pages: "trồng
 * răng implant tại Việt Nam" and "chi phí IVF tại Việt Nam" are different
 * queries with different intent, and a single services page competes for
 * neither well.
 *
 * The segment `dich-vu` is shared across locales while the leaf slug is
 * localized — `/en/dich-vu/dental-care`. That looks mixed and is deliberate:
 * `services.ts` already carries a slug per locale, a Vietnamese reader
 * searching "nha khoa" should land on a URL that says so, and duplicating the
 * segment as well would give a crawler two trees to reconcile for no gain.
 *
 * Band order, under the homepage's surface rules:
 *
 *   hero      cream
 *   includes  white
 *   facts     cream-300
 *   cost      white
 *   faq       cream
 *   related   cream      ← same tone, so they read as one closing movement
 *   closing   INK        ← the one accent surface
 */

const BANDS = {
  includes: "ho-tro",
  facts: "ke-hoach",
  cost: "chi-phi-chuyen-khoa",
  faq: "cau-hoi",
  related: "chuyen-khoa-khac",
  closing: "lien-he",
} as const;

/**
 * Every specialty in every locale, prerendered.
 *
 * Built from the services collection rather than a literal list, so a specialty
 * added to the data becomes a page without anyone remembering this file.
 */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getServices(locale).map((service) => ({ locale, slug: service.slug })),
  );
}

/** Locale, service and detail resolved together, or nothing. */
function resolve(rawLocale: string, slug: string) {
  if (!isLocale(rawLocale)) return null;

  const locale = rawLocale as Locale;
  const service = getServiceBySlug(locale, slug);
  if (!service) return null;

  const detail = getServiceDetail(locale, service.id);
  if (!detail) return null;

  return { locale, service, detail };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const resolved = resolve(rawLocale, slug);
  if (!resolved) return {};

  const { locale, detail } = resolved;
  const { htmlLang } = getContent(locale);
  const path = routePath(locale, ROUTES.services, slug);

  /* The layout's `%s · Handle` template applies to this child segment, so the
     brand is not written in by hand — see the note on the cost page. Social
     titles do not inherit the template and carry it explicitly. */
  const socialTitle = `${detail.metaTitle} · ${siteConfig.name}`;

  /* Alternates resolve through each locale's own record: the slugs differ, so
     substituting the locale segment would point `hreflang` at a 404. */
  const viSlug = getServices("vi").find((s) => s.id === detail.id)?.slug;
  const enSlug = getServices("en").find((s) => s.id === detail.id)?.slug;

  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
    alternates:
      viSlug && enSlug
        ? {
            canonical: path,
            languages: {
              vi: routePath("vi", ROUTES.services, viSlug),
              en: routePath("en", ROUTES.services, enSlug),
              "x-default": routePath("vi", ROUTES.services, viSlug),
            },
          }
        : { canonical: path },
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      locale: htmlLang.replace("-", "_"),
      url: `${siteConfig.url}${path}`,
      title: socialTitle,
      description: detail.metaDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: detail.metaDescription,
      images: [OG_IMAGE],
    },
    robots: ROBOTS,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const resolved = resolve(rawLocale, slug);
  if (!resolved) notFound();

  const { locale, service, detail } = resolved;
  const content = getContent(locale);
  const { service: copy } = getPageContent(locale);

  const home = content.nav.links[0].label;
  const related = getServices(locale).filter((item) => item.id !== service.id);

  const schema = generatePageSchema({
    locale,
    htmlLang: content.htmlLang,
    path: [ROUTES.services, slug],
    name: detail.metaTitle,
    description: detail.metaDescription,
    trail: [
      { label: home, path: [] },
      { label: copy.breadcrumbRoot, path: [ROUTES.services] },
      { label: service.title, path: [ROUTES.services, slug] },
    ],
    faqs: detail.faqs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <ServiceHero
        detail={detail}
        media={service.media}
        locale={locale}
        ctaLabel={content.nav.cta}
      />

      {/* Below the hero, as on the cost page: the trail is wayfinding, and over
          the h1 it pushes the page's own answer down the screen. */}
      <Container className="pb-4">
        <Breadcrumb
          label={copy.breadcrumbRoot}
          items={[
            { label: home, href: routePath(locale) },
            {
              label: copy.breadcrumbRoot,
              href: routePath(locale, ROUTES.services),
            },
            { label: service.title },
          ]}
        />
      </Container>

      <ServiceIncludes
        id={BANDS.includes}
        copy={copy.includes}
        items={detail.includes}
      />

      <ServiceFacts
        id={BANDS.facts}
        factsCopy={copy.facts}
        suitedCopy={copy.suitedFor}
        facts={detail.facts}
        suitedFor={detail.suitedFor}
      />

      <ServiceCost
        id={BANDS.cost}
        copy={copy.cost}
        items={getCostItemsForService(locale, service.id)}
        locale={locale}
        costHref={routePath(locale, ROUTES.cost)}
      />

      <FaqBand id={BANDS.faq} copy={copy.faq} items={detail.faqs} />

      <RelatedServices
        id={BANDS.related}
        copy={copy.related}
        services={related}
        locale={locale}
      />

      <PageClosing id={BANDS.closing} copy={copy.closing} locale={locale} />
    </>
  );
}
