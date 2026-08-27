import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatAudBand, formatCostPrice } from "@/lib/price";

import type { CostCategory, CostItem, ServicePageContent } from "@/types";

interface ServiceCostProps {
  id: string;
  copy: ServicePageContent["cost"];
  category?: CostCategory;
  items: CostItem[];
  /** Link through to the full schedule. */
  costHref: string;
}

/**
 * This specialty's rows from the published schedule.
 *
 * A definition list rather than the table used on `/chi-phi`: one specialty in
 * isolation has no other specialty to be compared against, so the header row
 * that makes the full table a table has nothing left to organise here. Each row
 * is a term and its price, with the description under it.
 *
 * The journey range leads, ahead of every individual line. The schedule's own
 * guidance is explicit about this and the reason is sound — a page that opens
 * on the cheapest consultation fee anchors the reader there and makes the rest
 * of the care read as an upsell.
 *
 * The numbers come from the same records the cost page renders, so the two
 * cannot disagree. That is the failure worth designing against: a reader who
 * finds two prices for one procedure on one site stops believing either.
 */
export function ServiceCost({ id, copy, category, items, costHref }: ServiceCostProps) {
  const headingId = `${id}-title`;
  const priceLabels = { quote: copy.quoteLabel, included: copy.includedLabel };

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
          <>
            {category?.journey.length ? (
              <Reveal index={3} className="mt-10">
                <ul className="flex flex-wrap gap-3">
                  {category.journey.map((entry) => (
                    <li
                      key={entry.id}
                      className="border-gold-700/25 bg-gold-100/50 flex flex-col gap-1 rounded-sm border px-5 py-4"
                    >
                      <span className="text-ink-600 text-sm">{entry.label}</span>
                      <span className="font-brand text-gold-700 text-xl tracking-tight">
                        {formatAudBand(entry.aud)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal index={4} className="mt-10">
              <dl className="border-line border-t">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border-line/70 grid gap-x-8 gap-y-2 border-b py-5 sm:grid-cols-[minmax(0,1fr)_auto]"
                  >
                    <dt className="text-ink text-[0.9375rem] font-medium">
                      {item.procedure}
                    </dt>

                    <dd
                      className={
                        item.price.kind === "band"
                          ? "text-gold-700 font-brand text-[1.0625rem] tracking-tight sm:row-span-2 sm:self-start sm:text-right"
                          : "text-ink-400 text-sm sm:row-span-2 sm:self-start sm:text-right"
                      }
                    >
                      {formatCostPrice(item.price, priceLabels)}
                    </dd>

                    {/* Second `dd` for the same term: the description belongs to
                        the row, and a `<p>` here would close the definition
                        list item early. */}
                    <dd className="text-ink-600 max-w-[68ch] text-sm leading-relaxed">
                      {item.covers}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal index={5}>
              <p className="text-ink-400 mt-6 max-w-[72ch] text-sm">{copy.disclaimer}</p>
            </Reveal>
          </>
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
