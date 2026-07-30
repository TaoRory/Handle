import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { SECTION_IDS, contactLinks } from "@/lib/site-config";

import type { MediaAsset, SectionCopy } from "@/types";

interface AboutHandleProps {
  id: string;
  copy: SectionCopy & { body: string[]; media: MediaAsset };
}

/**
 * The turn in the narrative: the four problems above, answered.
 *
 * A 6/6 split on a raised cream panel. The image sits left and slightly lower
 * than the copy block so the two columns interlock rather than sit in a row.
 */
export function AboutHandle({ id, copy }: AboutHandleProps) {
  return (
    <section
      id={id}
      aria-labelledby="about-title"
      className="relative scroll-mt-[calc(var(--header-h)+24px)] overflow-hidden"
    >
      <Container>
        <div className="border-line bg-cream-100 grain relative overflow-hidden rounded-xl border">
          <div className="relative grid items-center gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-14 lg:p-10 xl:gap-16">
            <Reveal direction="left">
              <Media
                asset={copy.media}
                seed="about"
                ratio="wide"
                rounded="lg"
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="shadow-sm"
              />
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal>
                <Eyebrow>{copy.eyebrow}</Eyebrow>
              </Reveal>

              <Reveal index={1}>
                <h2 id="about-title" className="text-h2 text-ink max-w-[18ch]">
                  {copy.title}{" "}
                  <span className="font-display text-gold italic">{copy.accent}</span>
                </h2>
              </Reveal>

              {copy.body.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 24)} index={index + 2}>
                  <p className="text-ink-600 max-w-[58ch] text-[1.0625rem] leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal index={4}>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg">
                    <Link href={contactLinks.whatsapp}>
                      {copy.action}
                      <ArrowTrail />
                    </Link>
                  </Button>

                  <Link
                    href={`#${SECTION_IDS.journey}`}
                    className="group/link text-ink-600 hover:text-gold-600 inline-flex items-center gap-2 px-2 text-sm font-medium transition-colors duration-200"
                  >
                    Personal Care Plan
                    <ArrowTrail />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Gold hairline anchoring the panel's bottom-left corner. */}
          <span
            aria-hidden="true"
            className="bg-gold/50 absolute bottom-0 left-0 h-px w-24"
          />
        </div>
      </Container>
    </section>
  );
}
