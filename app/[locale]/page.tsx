import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { AboutHandle } from "@/components/sections/AboutHandle";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import { PartnerCarousel } from "@/components/sections/PartnerCarousel";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { WhyVietnam } from "@/components/sections/WhyVietnam";
import { getContent, isLocale } from "@/content";
import {
  getAdvantages,
  getExperiences,
  getFaqs,
  getJourneySteps,
  getPartners,
  getReasons,
  getServices,
  getStats,
  getTestimonials,
} from "@/data";
import { buildJsonLd } from "@/lib/seo";
import { SECTION_IDS, siteConfig } from "@/lib/site-config";

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
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials),
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
  const content = getContent(locale);
  const titleBase = locale === "vi" ? "Chăm sóc sức khỏe tại Việt Nam" : "Healthcare in Vietnam";
  const description = content.hero.lead;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${titleBase}`,
      template: `%s · ${siteConfig.name}`,
    },
    description,
    keywords:
      locale === "vi"
        ? [
          "điều trị tại Việt Nam",
          "du lịch y tế Việt Nam",
          "chi phí y tế Việt Nam",
          "concierge y tế",
          "bệnh viện quốc tế Việt Nam",
        ]
        : [
          "medical tourism Vietnam",
          "healthcare in Vietnam",
          "medical concierge",
          "treatment abroad",
          "international hospitals Vietnam",
        ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        vi: "/vi",
        en: "/en",
        "x-default": "/vi",
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: content.htmlLang.replace("-", "_"),
      url: `${siteConfig.url}/${locale}`,
      title: `${siteConfig.name} — ${titleBase}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${titleBase}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
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
      <script
        type="application/ld+json"
        // Static, build-time JSON from our own data — no user input reaches it.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(locale, content)),
        }}
      />

      <Hero copy={content.hero} />

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
      />

      <Testimonials
        id={SECTION_IDS.testimonials}
        copy={content.testimonials}
        testimonials={getTestimonials(locale)}
        labels={content.a11y}
      />

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
