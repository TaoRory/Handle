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
  getJourneySteps,
  getPartners,
  getReasons,
  getServices,
  getTestimonials,
} from "@/data";
import { buildJsonLd } from "@/lib/seo";
import { SECTION_IDS } from "@/lib/site-config";

import type { Locale } from "@/types";

/**
 * Below-the-fold, animation-heavy bands are split out of the initial bundle.
 * They still render on the server — this defers the JavaScript, not the HTML.
 */
const JourneyTimeline = dynamic(() =>
  import("@/components/sections/JourneyTimeline").then((m) => m.JourneyTimeline),
);
const ServicesAndLifestyle = dynamic(() =>
  import("@/components/sections/ServicesAndLifestyle").then(
    (m) => m.ServicesAndLifestyle,
  ),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials),
);

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

      <CtaBanner id={SECTION_IDS.cta} copy={content.cta} />
    </>
  );
}
