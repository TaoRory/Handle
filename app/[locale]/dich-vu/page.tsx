import Link from "next/link";
import { notFound } from "next/navigation";

import { PageClosing } from "@/components/sections/PageClosing";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { ArrowTrail, Icon } from "@/components/ui/icon";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { getContent, getPageContent, isLocale } from "@/content";
import { getServiceDetail, getServices } from "@/data";
import { generateServicesIndexSchema, serializeJsonLd } from "@/lib/json-ld";
import { ROBOTS, getOgImage, getOpenGraphLocale } from "@/lib/seo";
import { ROUTES, routePath, siteConfig } from "@/lib/site-config";

import { LOCALES, type Locale } from "@/types";

import type { Metadata } from "next";

/**
 * `/[locale]/dich-vu` — the specialty listing.
 *
 * Exists so the specialty pages have a parent. Without it the middle breadcrumb
 * crumb is either a link to a 404 or a `ListItem` with no `item`, and the set
 * reads as unrelated pages rather than a section of a site.
 *
 * It carries its own query as well — "dịch vụ y tế tại Việt Nam" is broader
 * than any one specialty — so the cards show each page's own summary rather
 * than repeating the homepage grid's one-liners.
 */
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
  const { service } = getPageContent(locale);
  const path = routePath(locale, ROUTES.services);
  const socialTitle = `${service.index.metaTitle} · ${siteConfig.name}`;
  const ogImage = getOgImage(locale);

  return {
    title: service.index.metaTitle,
    description: service.index.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        vi: routePath("vi", ROUTES.services),
        en: routePath("en", ROUTES.services),
        "x-default": routePath("vi", ROUTES.services),
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: getOpenGraphLocale(locale),
      url: `${siteConfig.url}${path}`,
      title: socialTitle,
      description: service.index.metaDescription,
      alternateLocale: locale === "vi" ? ["en_US"] : ["vi_VN"],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: service.index.metaDescription,
      images: [ogImage],
    },
    robots: ROBOTS,
  };
}

export default async function ServicesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;
  const content = getContent(locale);
  const { service: copy } = getPageContent(locale);
  const services = getServices(locale);

  const home = content.nav.links[0].label;
  const schema = generateServicesIndexSchema({
    locale,
    htmlLang: content.htmlLang,
    name: copy.index.metaTitle,
    description: copy.index.metaDescription,
    trail: [
      { label: home, path: [] },
      { label: copy.breadcrumbRoot, path: [ROUTES.services] },
    ],
    services,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />

      <section
        aria-labelledby="services-index-title"
        className="bg-cream relative isolate overflow-hidden pt-[calc(var(--header-h)+56px)] pb-[clamp(40px,5vw,72px)] lg:pt-[calc(var(--header-h)+88px)]"
      >
        <span
          aria-hidden="true"
          className="from-gold-100/60 pointer-events-none absolute -top-40 -right-32 -z-10 size-[36rem] rounded-full bg-gradient-to-b to-transparent blur-3xl"
        />

        <Container>
          <div className="flex max-w-[46rem] flex-col gap-6">
            <Reveal index={1}>
              <h1 id="services-index-title" className="text-h1 text-ink max-w-[18ch]">
                {copy.index.title}{" "}
                <span className="font-display text-gold-700 italic">
                  {copy.index.accent}
                </span>
              </h1>
            </Reveal>

            <Reveal index={2}>
              <p className="text-lead text-ink-600 max-w-[62ch]">{copy.index.lead}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="pb-10">
        <Breadcrumb
          label={copy.breadcrumbRoot}
          items={[
            { label: home, href: routePath(locale) },
            { label: copy.breadcrumbRoot },
          ]}
        />
      </Container>

      <section
        aria-labelledby="services-overview-title"
        className="bg-cream-100 border-line/70 border-y py-[clamp(56px,7vw,96px)]"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-16">
            <div>
              <h2
                id="services-overview-title"
                className="text-h2 text-ink max-w-[18ch]"
              >
                {copy.index.overview.title}{" "}
                <span className="font-display text-gold-700 italic">
                  {copy.index.overview.accent}
                </span>
              </h2>
              <p className="text-ink-600 mt-6 max-w-[58ch] leading-relaxed">
                {copy.index.overview.lead}
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {copy.index.overview.items.map((item, index) => (
                <li
                  key={item.id}
                  className="border-line bg-surface grid gap-3 rounded-lg border p-6 lg:grid-cols-[2.5rem_1fr]"
                >
                  <span
                    aria-hidden="true"
                    className="font-brand text-gold-700 text-sm tracking-[0.12em]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-ink font-medium">{item.title}</h3>
                    <p className="text-ink-600 mt-2 text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="services-list-title"
        className="bg-surface relative overflow-hidden pt-[clamp(48px,6vw,88px)] pb-[clamp(64px,8vw,120px)]"
      >
        <Container>
          <h2 id="services-list-title" className="text-h2 text-ink mb-10 max-w-[24ch]">
            {copy.index.listTitle}
          </h2>

          <ul className="grid gap-[var(--gap-card)] md:grid-cols-2 lg:grid-cols-3">
            {services.map((item, index) => {
              const detail = getServiceDetail(locale, item.id);

              return (
                <li key={item.id} className="h-full">
                  <Reveal index={index} className="h-full">
                    <Link
                      href={routePath(locale, ROUTES.services, item.slug)}
                      className="group/card group/link border-line bg-cream-100 hover:border-gold/45 focus-visible:outline-gold-700 flex h-full flex-col overflow-hidden rounded-lg border transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <Media
                        asset={item.media}
                        seed={item.id}
                        ratio="landscape"
                        rounded="none"
                        hasHoverZoom
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px"
                      />

                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <div className="flex items-center gap-3">
                          <Icon name={item.icon} className="text-ink-600 size-5" />
                          <h2 className="text-ink text-[1.0625rem] font-medium">
                            {item.title}
                          </h2>
                        </div>

                        <p className="text-ink-600 text-[0.9375rem] leading-relaxed">
                          {detail?.metaDescription ?? item.body}
                        </p>

                        <span className="text-gold-700 mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium">
                          {copy.index.cardAction}
                          <ArrowTrail />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <PageClosing id="lien-he" copy={copy.closing} locale={locale} />
    </>
  );
}
