import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatUsdBand, formatVndBand, savingPercent } from "@/lib/price";

import type { CostItem, CostPageContent, Locale } from "@/types";

interface CostTableProps {
  id: string;
  copy: CostPageContent["table"];
  items: CostItem[];
  locale: Locale;
}

/**
 * The bands, as a real table.
 *
 * A real `<table>` and not a grid of cards: this is tabular data with a header
 * row that means something, and a screen reader announcing "Cấy ghép implant,
 * Tại Việt Nam, $700 – $1,600" is only possible if the columns are declared.
 * The cards-on-mobile alternative needs the same content in the DOM twice,
 * which is two sources of truth for the one number on the site a reader might
 * act on.
 *
 * So it scrolls sideways below `lg` instead, with the procedure column pinned
 * so the figures never lose their label. The scroll container carries
 * `tabIndex` and a role on purpose — a region that scrolls must be reachable
 * by keyboard, and without them the only way to see the comparison column on a
 * phone is a gesture a keyboard user does not have.
 */
export function CostTable({ id, copy, items, locale }: CostTableProps) {
  const headingId = `${id}-title`;

  /* Pinned column: the same background and inset shadow on header and body
     cells, so the seam reads as one edge while the rest slides under it. */
  const pinned =
    "sticky left-0 z-10 bg-surface shadow-[1px_0_0_0_var(--color-line)] lg:shadow-none";

  return (
    <Section id={id} labelledBy={headingId} tone="surface">
      <Container>
        <SectionHeading
          id={headingId}
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <Reveal index={3} className="mt-12 lg:mt-14">
          <div
            role="region"
            aria-labelledby={headingId}
            tabIndex={0}
            className="border-line focus-visible:outline-gold-700 -mx-5 overflow-x-auto rounded-lg border-y px-5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:mx-0 sm:border sm:px-0"
          >
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">{copy.caption}</caption>

              <thead>
                <tr className="border-line border-b">
                  <th
                    scope="col"
                    className={`text-ink-400 px-5 py-4 text-xs font-medium tracking-[0.14em] uppercase ${pinned}`}
                  >
                    {copy.colProcedure}
                  </th>
                  <th
                    scope="col"
                    className="text-ink-400 px-5 py-4 text-xs font-medium tracking-[0.14em] uppercase"
                  >
                    {copy.colVietnam}
                  </th>
                  <th
                    scope="col"
                    className="text-ink-400 px-5 py-4 text-xs font-medium tracking-[0.14em] uppercase"
                  >
                    {copy.colAbroad}
                  </th>
                  <th
                    scope="col"
                    className="text-ink-400 px-5 py-4 text-right text-xs font-medium tracking-[0.14em] uppercase"
                  >
                    {copy.colSaving}
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-line/70 last:border-0 border-b align-top"
                  >
                    <th scope="row" className={`px-5 py-5 font-normal ${pinned}`}>
                      <span className="text-ink block text-[0.9375rem] font-medium">
                        {item.procedure}
                      </span>
                      <span className="text-ink-400 mt-1 block text-sm">{item.unit}</span>
                      {item.note ? (
                        <span className="text-ink-400 mt-2 block max-w-[34ch] text-sm">
                          {item.note}
                        </span>
                      ) : null}
                    </th>

                    <td className="px-5 py-5">
                      <span className="text-ink block text-[0.9375rem] font-medium">
                        {formatUsdBand(item.usd)}
                      </span>
                      <span className="text-ink-400 mt-1 block text-sm">
                        {formatVndBand(item.vnd, locale)}
                      </span>
                    </td>

                    <td className="text-ink-400 px-5 py-5 text-[0.9375rem]">
                      {formatUsdBand(item.abroad)}
                    </td>

                    <td className="px-5 py-5 text-right">
                      {/* The one gold element in this band — and the number the
                          whole page exists to state. */}
                      <span className="text-gold-700 font-brand text-lg tracking-tight">
                        −{savingPercent(item.usd, item.abroad)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal index={4}>
          <p className="text-ink-400 mt-6 max-w-[72ch] text-sm">{copy.disclaimer}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
