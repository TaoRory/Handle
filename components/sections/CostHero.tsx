import Link from "next/link";

import { ConsultationLink } from "@/components/layout/ConsultationLink";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

import type { CostPageContent, Locale } from "@/types";

interface CostHeroProps {
  copy: CostPageContent["hero"];
  locale: Locale;
  /** Anchor the secondary button jumps to — the band with the table. */
  tableId: string;
}

/**
 * The cost page's opening.
 *
 * No photograph and no decorative layer. The homepage hero has a job this one
 * does not: it has to make a stranger stay. A reader who has landed here typed
 * a price question, and the fastest honest thing to do is answer it — the copy
 * is the hero, and the second button puts the table one press away.
 */
export function CostHero({ copy, locale, tableId }: CostHeroProps) {
  return (
    <section
      aria-labelledby="cost-hero-title"
      className="bg-cream relative isolate overflow-hidden pt-[calc(var(--header-h)+56px)] pb-[clamp(56px,7vw,104px)] lg:pt-[calc(var(--header-h)+88px)]"
    >
      {/* One soft warm wash off the top-right, well behind the text. */}
      <span
        aria-hidden="true"
        className="from-gold-100/60 pointer-events-none absolute -top-40 -right-32 -z-10 size-[36rem] rounded-full bg-gradient-to-b to-transparent blur-3xl"
      />

      <Container>
        <div className="flex max-w-[46rem] flex-col gap-6">
          <Reveal index={1}>
            <h1 id="cost-hero-title" className="text-h1 text-ink max-w-[18ch]">
              {copy.title}{" "}
              <span className="font-display text-gold-700 italic">{copy.accent}</span>
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="text-lead text-ink-600 max-w-[62ch]">{copy.lead}</p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ConsultationLink size="lg" locale={locale} className="rounded-sm">
                {copy.primaryCta}
                <ArrowTrail />
              </ConsultationLink>

              <Button asChild variant="outline" size="lg" className="rounded-sm">
                <Link href={`#${tableId}`}>{copy.secondaryCta}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
