import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatAudBand, formatCostPrice } from "@/lib/price";
import { ROUTES, routePath } from "@/lib/site-config";

import type { CostCategory, CostItem, CostPageContent, Locale, Service } from "@/types";

interface CostTableProps {
  id: string;
  copy: CostPageContent["table"];
  categories: CostCategory[];
  items: CostItem[];
  locale: Locale;
  /** Used to link a category heading through to the specialty that performs it. */
  services: Service[];
}

/**
 * The published schedule, as one table grouped by specialty.
 *
 * A real `<table>` and not a grid of cards: this is tabular data with a header
 * row that means something, and a screen reader announcing "Nội soi dạ dày,
 * Chi phí ước tính, A$150 – A$300" is only possible if the columns are
 * declared. The cards-on-mobile alternative needs the same content in the DOM
 * twice, which is two sources of truth for the numbers a reader might act on.
 *
 * So it scrolls sideways below `lg` instead, with the service column pinned so
 * the figures never lose their label. The scroll container carries `tabIndex`
 * and a role on purpose — a region that scrolls has to be reachable by
 * keyboard, and without them the estimate column is reachable on a phone only
 * by a gesture a keyboard user does not have.
 *
 * Each specialty gets its own `<tbody>` opened by a `<th scope="colgroup">`,
 * so the grouping is structure rather than a bold line. The journey range sits
 * in that header on purpose: a reader scanning for "what will this actually
 * cost" should meet the coordinated range before the cheapest single line.
 */
export function CostTable({
  id,
  copy,
  categories,
  items,
  locale,
  services,
}: CostTableProps) {
  const headingId = `${id}-title`;
  const priceLabels = { quote: copy.quoteLabel, included: copy.includedLabel };
  const slugFor = (serviceId?: string) =>
    serviceId ? services.find((service) => service.id === serviceId)?.slug : undefined;

  /* Pinned column: the same background and inset edge on header and body cells,
     so the seam reads as one line while the rest slides under it. */
  const pinned =
    "sticky left-0 z-10 bg-surface shadow-[1px_0_0_0_var(--color-line)] lg:shadow-none";
  const headCell =
    "text-ink-400 px-5 py-4 text-xs font-medium tracking-[0.14em] uppercase";

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
            <table className="w-full min-w-[52rem] border-collapse text-left">
              <caption className="sr-only">{copy.caption}</caption>

              <thead>
                <tr className="border-line border-b">
                  <th scope="col" className={`${headCell} ${pinned}`}>
                    {copy.colService}
                  </th>
                  <th scope="col" className={headCell}>
                    {copy.colCovers}
                  </th>
                  <th scope="col" className={`${headCell} text-right`}>
                    {copy.colEstimated}
                  </th>
                </tr>
              </thead>

              {categories.map((category) => {
                const rows = items.filter((item) => item.categoryId === category.id);
                if (!rows.length) return null;

                const slug = slugFor(category.serviceId);

                return (
                  <tbody key={category.id} className="border-line border-b last:border-0">
                    <tr className="bg-cream-100">
                      <th
                        scope="colgroup"
                        colSpan={3}
                        className="px-5 pt-7 pb-5 text-left font-normal"
                      >
                        <span className="flex flex-col gap-2">
                          <span className="text-ink text-[1.0625rem] font-medium">
                            {slug ? (
                              <Link
                                href={routePath(locale, ROUTES.services, slug)}
                                className="hover:text-gold-700 focus-visible:outline-gold-700 rounded-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                {category.title}
                              </Link>
                            ) : (
                              category.title
                            )}
                          </span>

                          <span className="text-ink-600 max-w-[86ch] text-sm">
                            {category.intro}
                          </span>

                          {category.journey.length ? (
                            <span className="mt-1 flex flex-wrap gap-x-6 gap-y-1">
                              {category.journey.map((entry) => (
                                <span
                                  key={entry.id}
                                  className="text-ink-600 text-sm whitespace-nowrap"
                                >
                                  {entry.label}:{" "}
                                  <span className="text-gold-700 font-brand">
                                    {formatAudBand(entry.aud)}
                                  </span>
                                </span>
                              ))}
                            </span>
                          ) : null}
                        </span>
                      </th>
                    </tr>

                    {rows.map((item) => (
                      <tr key={item.id} className="border-line/70 border-t align-top">
                        <th
                          scope="row"
                          className={`text-ink px-5 py-5 text-[0.9375rem] font-medium ${pinned}`}
                        >
                          {item.procedure}
                        </th>

                        <td className="text-ink-600 max-w-[52ch] px-5 py-5 text-sm leading-relaxed">
                          {item.covers}
                        </td>

                        <td className="px-5 py-5 text-right whitespace-nowrap">
                          <span
                            className={
                              item.price.kind === "band"
                                ? "text-gold-700 font-brand text-[1.0625rem] tracking-tight"
                                : "text-ink-400 text-sm"
                            }
                          >
                            {formatCostPrice(item.price, priceLabels)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                );
              })}
            </table>
          </div>
        </Reveal>

        <Reveal index={4}>
          <p className="text-ink-400 mt-6 max-w-[80ch] text-sm">{copy.disclaimer}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
