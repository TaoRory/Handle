import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail, Icon } from "@/components/ui/icon";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { SECTION_IDS, contactLinks } from "@/lib/site-config";

import type { SiteContent } from "@/types";

interface AboutHandleProps {
  id: string;
  step: string;
  copy: SiteContent["about"];
}

/**
 * The turn in the narrative: the four problems above, answered.
 *
 * This is the page's first loud surface. Everything before it is cream, so
 * dropping to a full ink panel here does two jobs at once — it marks where the
 * argument pivots from *problem* to *answer*, and it gives the eye somewhere to
 * land after four neutral bands. The second ink surface is the closing CTA;
 * nothing between them competes.
 */
export function AboutHandle({ id, step, copy }: AboutHandleProps) {
  return (
    <section
      id={id}
      aria-labelledby="about-title"
      className="relative scroll-mt-[calc(var(--header-h)+24px)] overflow-hidden py-4"
    >
      <Container>
        <div className="bg-ink relative isolate overflow-hidden rounded-xl">
          {/* Warm bloom behind the copy column, and a gold rule along the top. */}
          <span
            aria-hidden="true"
            className="rounded-pill absolute -top-40 -right-24 -z-10 size-[560px] bg-[radial-gradient(circle,rgba(201,168,106,0.26)_0%,transparent_66%)] blur-2xl"
          />
          <span
            aria-hidden="true"
            className="via-gold/70 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
          />

          <div className="relative grid items-center gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-14 lg:p-12 xl:gap-16">
            <Reveal direction="left">
              <Media
                asset={copy.media}
                seed="about"
                ratio="wide"
                rounded="lg"
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="shadow-lg"
              />
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal>
                <Eyebrow step={step} tone="cream">
                  {copy.eyebrow}
                </Eyebrow>
              </Reveal>

              <Reveal index={1}>
                <h2 id="about-title" className="text-h2 text-cream-100 max-w-[18ch]">
                  {copy.title}{" "}
                  <span className="font-display text-gold italic">{copy.accent}</span>
                </h2>
              </Reveal>

              {copy.body.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 24)} index={index + 2}>
                  <p className="text-cream/70 max-w-[58ch] text-[1.0625rem] leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal index={4}>
                <ul className="flex flex-wrap gap-2">
                  {copy.pills.map((pill) => (
                    <li
                      key={pill.id}
                      className="border-cream/15 text-cream/80 rounded-pill inline-flex items-center gap-2 border px-3.5 py-2 text-[0.8125rem]"
                    >
                      <Icon
                        name={pill.icon}
                        className="text-gold size-3.5"
                        strokeWidth={1.75}
                      />
                      {pill.label}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal index={5}>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg">
                    <Link href={contactLinks.whatsapp}>
                      {copy.action}
                      <ArrowTrail />
                    </Link>
                  </Button>

                  <Link
                    href={`#${SECTION_IDS.journey}`}
                    className="group/link text-cream/70 hover:text-gold inline-flex items-center gap-2 px-2 text-sm font-medium transition-colors duration-200"
                  >
                    {copy.secondaryAction}
                    <ArrowTrail />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
