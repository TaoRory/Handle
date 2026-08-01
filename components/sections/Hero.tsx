import Link from "next/link";
import { Play } from "lucide-react";

import { ConsultationLink } from "@/components/layout/ConsultationLink";
import { HeroDecor } from "@/components/sections/HeroDecor";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail, Icon } from "@/components/ui/icon";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { SECTION_IDS } from "@/lib/site-config";

import type { HeroCopy } from "@/types";

/** Shared by both hero placements so they resolve to one download. */
const HERO_SIZES = "(max-width: 1023px) 100vw, 58vw";

/**
 * The first screen.
 *
 * The media is full-bleed: it runs off the right edge of the viewport rather
 * than sitting in a contained column, which is what makes the fold read as a
 * scene the visitor has walked into instead of a two-column layout. A cream
 * scrim gradient carries the left third so the headline keeps its contrast
 * floor over whatever the image turns out to be.
 *
 * Below `lg` the media becomes a full-width band under the copy — still
 * edge-to-edge, but never behind text, because a scrim strong enough to make
 * body copy legible on a phone would kill the photograph anyway.
 *
 * Server-rendered apart from `HeroDecor` and the `Reveal` wrappers, so the LCP
 * headline is in the initial HTML rather than waiting on hydration.
 */
export function Hero({ copy }: { copy: HeroCopy }) {
  const [titleLine1, titleLine2] = copy.titleLead.split("\n");

  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby="hero-title"
      className="relative isolate pt-[calc(var(--header-h)+32px)] lg:pt-[calc(var(--header-h)+64px)]"
    >
      <HeroDecor />

      {/* ---- Full-bleed media, desktop ---- */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] lg:block xl:w-[56%]"
      >
        {/*
          This layer and the band below are the same photograph at two
          placements, and `display: none` does not stop a browser fetching an
          image. They therefore declare an identical `sizes` so both resolve to
          the same srcset candidate and the second is a cache hit rather than a
          second download of the LCP image. Only the band carries the alt.
        */}
        <Media
          asset={copy.media}
          seed="hero"
          ratio="fill"
          rounded="none"
          priority
          sizes={HERO_SIZES}
          className="size-full"
        />

        {/* Scrim: opaque under the copy, clear over the subject. */}
        <span
          aria-hidden="true"
          className="from-cream via-cream/70 absolute inset-0 bg-gradient-to-r via-25% to-transparent"
        />
        <span
          aria-hidden="true"
          className="from-cream absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent"
        />
      </div>

      <Container size="wide">
        <div className="lg:max-w-[52%] xl:max-w-[50%]">
          <Reveal>
            <h1 id="hero-title" className="text-display text-ink max-w-[13ch]">
              {titleLine1}
              <br />
              {titleLine2}
              <br />
              <span className="font-display text-gold italic">{copy.titleAccent}</span>
            </h1>
          </Reveal>

          <Reveal index={1}>
            <p className="text-ink-600 text-lead mt-7 max-w-[52ch]">{copy.lead}</p>
          </Reveal>

          <Reveal index={2}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ConsultationLink size="lg" className="rounded-sm">
                {copy.primaryCta}
                <ArrowTrail />
              </ConsultationLink>

              <Button asChild variant="outline" size="lg" className="rounded-sm">
                <Link href={`#${SECTION_IDS.about}`}>
                  <span className="bg-gold/15 text-gold-600 rounded-pill -ml-2 inline-flex size-8 items-center justify-center">
                    <Play
                      className="size-3.5 translate-x-px fill-current"
                      aria-hidden="true"
                    />
                  </span>
                  {copy.secondaryCta}
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal index={3}>
            <ul className="mt-11 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {copy.badges.map((badge) => (
                <li key={badge.id} className="flex items-center gap-2.5">
                  <span className="ring-gold/30 bg-gold/10 text-gold-600 rounded-pill inline-flex size-7 items-center justify-center ring-1">
                    <Icon name={badge.icon} className="size-3.5" strokeWidth={1.75} />
                  </span>
                  <span className="text-ink-600 text-sm">{badge.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Reserves the space the partner panel overlaps into. Below `lg` the
            panel overlaps the media band instead, so no reserve is needed. */}
        <div className="hidden h-28 lg:block" aria-hidden="true" />
      </Container>

      {/* ---- Full-bleed media, mobile and tablet ---- */}
      <Reveal className="lg:hidden">
        <Media
          asset={copy.media}
          seed="hero"
          ratio="wide"
          rounded="none"
          priority
          sizes={HERO_SIZES}
        />
      </Reveal>
    </section>
  );
}
