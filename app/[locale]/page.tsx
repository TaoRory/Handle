import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { SectionNav } from "@/components/layout/SectionNav";
import { AboutHandle } from "@/components/sections/AboutHandle";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import { PartnerCarousel } from "@/components/sections/PartnerCarousel";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { WhyVietnam } from "@/components/sections/WhyVietnam";
import { getContent, isLocale } from "@/content";
import { generateHomeSchema, serializeJsonLd } from "@/lib/json-ld";
import {
  ROBOTS,
  getLocalePageTitle,
  getMetaDescription,
  getOgImage,
  getOpenGraphLocale,
} from "@/lib/seo";
import {
  getAdvantages,
  getExperiences,
  getFaqs,
  getJourneySteps,
  getPartners,
  getReasons,
  getServices,
  getStats,
} from "@/data";
import { SECTION_IDS, sectionStep, siteConfig } from "@/lib/site-config";

import type { Locale } from "@/types";

/**
 * Below-the-fold, animation-heavy bands are split out of the initial bundle.
 * They still render on the server — this defers the JavaScript, not the HTML.
 */
const JourneyTimeline = dynamic(() =>
  import("@/components/sections/JourneyTimeline").then((m) => m.JourneyTimeline),
);
const StatsBand = dynamic(() =>
  import("@/components/sections/StatsBand").then((m) => m.StatsBand),
);
const ServicesAndLifestyle = dynamic(() =>
  import("@/components/sections/ServicesAndLifestyle").then(
    (m) => m.ServicesAndLifestyle,
  ),
);
const Faq = dynamic(() => import("@/components/sections/Faq").then((m) => m.Faq));

/**
 * Band order and surface rhythm:
 *
 *   hero      cream gradient
 *   partners  floating white panel
 *   01 why    cream            + one gold highlight card
 *   02 about  INK              ← first accent surface
 *   03 whyUs  white
 *   04 journey cream
 *   05 stats  GOLD             ← second accent surface
 *   06 services white
 *   07 stories cream-300
 *   08 faq    white
 *   cta       INK              ← third accent surface
 *
 * Never two accent surfaces in a row, and never more than three on the page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return {};
  }

  const locale = raw as Locale;
  const title = `${getLocalePageTitle(locale, "home")} | ${siteConfig.name}`;
  const ogImage = getOgImage(locale);

  /*
   * Only what differs from the layout.
   *
   * Next merges page metadata over layout metadata shallowly, so everything
   * repeated here was dead weight in one file or the other — and `openGraph`
   * being replaced rather than merged is precisely how the share card went
   * missing. The homepage needs its own title; the rest it inherits.
   */
  return {
    title,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: getOpenGraphLocale(locale),
      url: `${siteConfig.url}/${locale}`,
      title,
      description: getMetaDescription(locale),
      alternateLocale: locale === "vi" ? ["en_US"] : ["vi_VN"],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: getMetaDescription(locale),
      images: [ogImage],
    },
    robots: ROBOTS,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;
  const content = getContent(locale);

  return (
    <>
      {/* This page's own nodes only. The organisation, the business and the
          website come from the layout with `@id`s of their own; restating any
          of them here is what put two different bodies behind `#organization`
          once already. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateHomeSchema(locale, content)),
        }}
      />
      <SectionNav
        label={content.sectionNav.label}
        items={content.sectionNav.items.map((item) => ({
          ...item,
          step: sectionStep(item.id),
        }))}
      />

      <Hero copy={content.hero} locale={locale} />

      <PartnerCarousel copy={content.partners} partners={getPartners(locale)} />

      <WhyVietnam
        id={SECTION_IDS.whyVietnam}
        copy={content.whyVietnam}
        reasons={getReasons(locale)}
        // The one positive among four problems — it gets the gold fill.
        highlightId="value"
      />

      <AboutHandle id={SECTION_IDS.about} copy={content.about} />

      <WhyChooseUs
        id={SECTION_IDS.whyUs}
        copy={content.whyUs}
        advantages={getAdvantages(locale)}
      />

      <JourneyTimeline
        id={SECTION_IDS.journey}
        copy={content.journey}
        steps={getJourneySteps(locale)}
      />

      <StatsBand id={SECTION_IDS.stats} copy={content.stats} stats={getStats(locale)} />

      <ServicesAndLifestyle
        servicesId={SECTION_IDS.services}
        experiencesId={SECTION_IDS.experiences}
        servicesCopy={content.services}
        experiencesCopy={content.experiences}
        services={getServices(locale)}
        experiences={getExperiences(locale)}
        locale={locale}
      />

      {/* <Testimonials
        id={SECTION_IDS.testimonials}
        copy={content.testimonials}
        testimonials={getTestimonials(locale)}
        labels={content.a11y}
      /> */}

      <Faq
        id={SECTION_IDS.faq}
        copy={content.faq}
        faqs={getFaqs(locale)}
        help={content.faq.help}
      />

      <CtaBanner id={SECTION_IDS.cta} copy={content.cta} locale={locale} />
    </>
  );
}
