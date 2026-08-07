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
    <div className="group/partner flex shrink-0 items-center gap-2.5 px-4 py-2 sm:gap-3.5 sm:px-9">
      {/* `ink-400`, not `stone`. The monogram is the only thing naming the
          partner, and stone on white measured 2.53:1 — the mark was decorative
          in weight while carrying the whole label. */}
      <span className="text-ink-400 group-hover/partner:text-gold-700 font-brand flex size-14 items-center justify-center text-base leading-none tracking-[0.08em] transition-colors duration-300 sm:size-14">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="h-8 w-8 object-contain"
          />
        ) : (
          partner.monogram
        )}
      </span>
      <span className="flex flex-col">
        <span className="text-ink-400 group-hover/partner:text-ink text-sm font-medium whitespace-nowrap transition-colors duration-300 sm:text-[0.9375rem]">
          {partner.name}
        </span>
        {/*
          Hidden below `sm`. Each block was about 250px wide against 350px of
          panel, so a phone saw one and a half partners at a time — a wall of
          logos that cannot show a wall says nothing. The category and city are
          the droppable half; the names are the proof.

          ink-400, not stone: stone at this size measured 2.5:1 on the panel.
        */}
        <span className="text-ink-400 hidden text-xs whitespace-nowrap sm:block">
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
            {/* `border-b`, not just `border-line/70`: the divider was specified
                as a colour and never given a width, so the panel read as one
                undifferentiated white box with things floating in it. */}
            <div className="border-line/70 flex flex-col items-center justify-between gap-1 border-b px-6 py-3.5 sm:flex-row sm:px-8 sm:py-4">
              <h2
                id="partners-title"
                className="text-ink-400 text-eyebrow font-medium uppercase"
              >
                {copy.eyebrow}
              </h2>

              {copy.action ? (
                <Link
                  href={`#${SECTION_IDS.about}`}
                  className="group/link text-gold-700 hover:text-ink inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors duration-200"
                >
                  {copy.action}
                  <ArrowTrail />
                </Link>
              ) : null}
            </div>

            {/* No `durationSeconds`: the speed is a breakpoint decision, so it
                comes from `.marquee-partners` in globals.css. A second Marquee
                for mobile would have put the whole partner list in the DOM
                twice over for a screen reader. */}
            <Marquee className="marquee-partners py-3.5 sm:py-5">
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
