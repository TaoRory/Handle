import Link from "next/link";
import { Play } from "lucide-react";

import { HeroDecor } from "@/components/sections/HeroDecor";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail, Icon } from "@/components/ui/icon";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { SECTION_IDS, contactLinks } from "@/lib/site-config";

import type { HeroCopy } from "@/types";

/**
 * The first screen.
 *
 * A 6/6 split: the promise on the left, the arrival image on the right with two
 * statistics floating over its edge. Server-rendered apart from `HeroDecor`
 * (the parallax layer) and the `Reveal` wrappers, so the LCP text is in the
 * initial HTML rather than waiting on hydration.
 */
export function Hero({ copy }: { copy: HeroCopy }) {
  const [titleLine1, titleLine2] = copy.titleLead.split("\n");

  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+40px)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-h)+72px)] lg:pb-28"
    >
      <HeroDecor />

      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16 xl:gap-20">
          {/* ---- Promise ---- */}
          <div className="flex flex-col">
            <Reveal>
              <h1 id="hero-title" className="text-display text-ink max-w-[13ch]">
                {titleLine1}
                <br />
                {titleLine2}
                <br />
                <span className="font-display text-gold italic">
                  {copy.titleAccent}
                </span>
              </h1>
            </Reveal>

            <Reveal index={1}>
              <p className="text-ink-600 text-lead mt-7 max-w-[54ch]">{copy.lead}</p>
            </Reveal>

            <Reveal index={2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <Link href={contactLinks.whatsapp}>
                    {copy.primaryCta}
                    <ArrowTrail />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
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

          {/* ---- Arrival image + floating statistics ---- */}
          <Reveal direction="right" duration={0.7} className="relative">
            <div className="relative">
              <Media
                asset={copy.media}
                seed="hero"
                ratio="hero"
                rounded="xl"
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="shadow-lg"
              />

              {/* A thin gold frame offset behind the plate — depth without a drop shadow. */}
              <span
                aria-hidden="true"
                className="border-gold/35 pointer-events-none absolute -right-3 -bottom-3 -z-10 h-full w-full rounded-xl border sm:-right-5 sm:-bottom-5"
              />

              <div className="glass border-line/70 absolute -bottom-6 left-4 flex gap-6 rounded-lg border px-5 py-4 shadow-md sm:left-6 sm:gap-8 sm:px-6 lg:-left-4 xl:-left-8">
                {copy.stats.slice(0, 2).map((stat) => (
                  <div key={stat.id} className="flex flex-col">
                    <span className="font-brand text-ink text-2xl leading-none sm:text-[1.75rem]">
                      {stat.value}
                      <span className="text-gold">{stat.suffix}</span>
                    </span>
                    <span className="text-ink-400 mt-1.5 max-w-[16ch] text-xs leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
