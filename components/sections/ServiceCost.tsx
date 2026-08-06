import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatUsdBand, formatVndBand, savingPercent } from "@/lib/price";

import type { CostItem, Locale, ServicePageContent } from "@/types";

interface ServiceCostProps {
  id: string;
  copy: ServicePageContent["cost"];
  items: CostItem[];
  locale: Locale;
  /** Link through to the full table. */
  costHref: string;
}

/**
 * This specialty's rows from the cost table.
 *
 * Cards rather than the table used on `/chi-phi`: one or two rows do not need a
 * header row, and a two-row table with four columns reads as a fragment of
 * something else. The numbers come from the same `costItems` records, so the
 * two pages cannot disagree — which is the failure worth designing against
 * here, since a reader who finds two different prices for one procedure on one
 * site stops believing either.
 *
 * A specialty with no rows renders the fallback line instead of an empty band.
 */
export function ServiceCost({ id, copy, items, locale, costHref }: ServiceCostProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} tone="surface">
      <Container>
        <SectionHeading
          id={headingId}
          title={copy.title}
          accent={copy.accent}
          lead={items.length ? copy.lead : undefined}
          action={
            <Button asChild variant="outline" size="md" className="rounded-sm">
              <Link href={costHref} className="group/link">
                {copy.action}
                <ArrowTrail />
              </Link>
            </Button>
          }
        />

        {items.length ? (
          <ul className="mt-12 grid gap-[var(--gap-card)] lg:mt-14 lg:grid-cols-2">
            {items.map((item, index) => (
              <li key={item.id}>
                <Reveal index={index}>
                  <div className="border-line bg-cream-100 flex h-full flex-col gap-5 rounded-lg border p-7">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-ink text-[1.0625rem] font-medium">
                        {item.procedure}
                      </h3>
                      <p className="text-ink-400 text-sm">{item.unit}</p>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-brand text-ink text-2xl tracking-tight">
                        {formatUsdBand(item.usd)}
                      </span>
                      <span className="text-gold-700 font-brand text-lg">
                        −{savingPercent(item.usd, item.abroad)}%
                      </span>
                    </div>

                    <div className="text-ink-600 flex flex-col gap-1 text-sm">
                      <span>{formatVndBand(item.vnd, locale)}</span>
                      <span className="text-ink-400">
                        {formatUsdBand(item.abroad)} · {item.abroadRegion}
                      </span>
                    </div>

                    {item.note ? (
                      <p className="text-ink-400 border-line/70 mt-auto border-t pt-4 text-sm">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal index={3}>
            <p className="text-ink-600 mt-10 max-w-[60ch] text-[1.0625rem]">
              {copy.empty}
            </p>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
