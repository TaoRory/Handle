import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SECTION_IDS } from "@/lib/site-config";

import type { Partner, SectionCopy } from "@/types";

/**
 * One partner mark.
 *
 * Drawn as a monogram lockup rather than a real logo file — see the note in
 * `data/partners.ts`. Greyscale at rest, warming to ink and gold on hover, so
 * the wall reads as a texture until you look at it directly.
 */
function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="group/partner flex shrink-0 items-center gap-3.5 px-7 py-2 sm:px-9">
      <span className="text-stone group-hover/partner:text-gold-600 font-brand flex size-11 items-center justify-center rounded-md text-sm tracking-[0.08em] transition-colors duration-300">
        {partner.logo ? (
          <img src={partner.logo} alt={`${partner.name} logo`} className="h-6 w-auto" />
        ) : (
          partner.monogram
        )}
      </span>
      <span className="flex flex-col">
        <span className="text-ink-400 group-hover/partner:text-ink text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-300">
          {partner.name}
        </span>
        <span className="text-stone text-[0.6875rem] whitespace-nowrap">
          {partner.kind} · {partner.city}
        </span>
      </span>
    </div>
  );
}

interface PartnerCarouselProps {
  copy: SectionCopy;
  partners: Partner[];
}

/**
 * The trust band directly under the hero.
 *
 * Lifted into a floating panel that straddles the hero and the next section —
 * the same device as the reference, but built as a single elevated surface
 * rather than a bordered box.
 */
export function PartnerCarousel({ copy, partners }: PartnerCarouselProps) {
  return (
    // Pulled up so the panel straddles the bottom edge of the hero media —
    // the device that ties the fold together instead of leaving the logo wall
    // floating in its own band of empty cream.
    <section
      id={SECTION_IDS.partners}
      aria-labelledby="partners-title"
      className="relative z-20 -mt-14 pb-8 sm:-mt-16 lg:-mt-24"
    >
      <Container size="wide">
        <Reveal>
          <div className="border-line bg-surface mt-12 overflow-hidden rounded-sm border shadow-md">
            <div className="border-line/70 flex flex-col items-center justify-between gap-2 px-6 py-4 sm:flex-row sm:px-8">
              <h2
                id="partners-title"
                className="text-ink-400 text-eyebrow font-medium uppercase"
              >
                {copy.eyebrow}
              </h2>

              {copy.action ? (
                <Link
                  href={`#${SECTION_IDS.about}`}
                  className="group/link text-gold-600 hover:text-ink inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                >
                  {copy.action}
                  <ArrowTrail />
                </Link>
              ) : null}
            </div>

            <Marquee durationSeconds={52} className="py-5">
              {partners.map((partner) => (
                <PartnerLogo key={partner.id} partner={partner} />
              ))}
            </Marquee>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
