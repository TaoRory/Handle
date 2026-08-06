import { ConsultationLink } from "@/components/layout/ConsultationLink";
import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";

import type { Locale, MediaAsset, ServiceDetail } from "@/types";

interface ServiceHeroProps {
  detail: ServiceDetail;
  media: MediaAsset;
  locale: Locale;
  ctaLabel: string;
}

/**
 * A specialty page's opening: heading, two paragraphs, one photograph.
 *
 * The photograph earns its place here in a way it did not on the cost page —
 * a reader arriving on "trồng răng implant tại Việt Nam" is deciding whether
 * this is a real operation, and the copy alone answers that more slowly. It
 * sits beside the text rather than behind it, so nothing needs a scrim and the
 * heading keeps its full contrast.
 */
export function ServiceHero({ detail, media, locale, ctaLabel }: ServiceHeroProps) {
  return (
    <section
      aria-labelledby="service-title"
      className="bg-cream relative isolate overflow-hidden pt-[calc(var(--header-h)+48px)] pb-[clamp(48px,6vw,88px)] lg:pt-[calc(var(--header-h)+80px)]"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal index={1}>
              <h1 id="service-title" className="text-h1 text-ink max-w-[16ch]">
                {detail.heading}{" "}
                <span className="font-display text-gold-700 italic">
                  {detail.headingAccent}
                </span>
              </h1>
            </Reveal>

            {detail.intro.map((paragraph, index) => (
              <Reveal key={index} index={index + 2}>
                <p className="text-ink-600 max-w-[58ch] text-[1.0625rem] leading-relaxed">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal index={4}>
              <ConsultationLink
                size="lg"
                locale={locale}
                className="mt-2 self-start rounded-sm"
              >
                {ctaLabel}
                <ArrowTrail />
              </ConsultationLink>
            </Reveal>
          </div>

          <Reveal index={2} direction="right">
            {/* `priority`: on this route it is the LCP element. */}
            <Media
              asset={media}
              seed={detail.id}
              ratio="landscape"
              priority
              sizes="(max-width: 1023px) 100vw, 44vw"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
