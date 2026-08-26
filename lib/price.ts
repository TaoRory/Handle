import type { CostPrice, PriceBand } from "@/types";

/**
 * Band formatting for the price schedule.
 *
 * Out of the components because the cost table and the specialty pages render
 * the same bands in different layouts, and two copies of a rounding rule is how
 * one procedure ends up quoted two ways on two pages of the same site.
 */

/** An en dash with spaces — a hyphen between two numbers reads as minus. */
const RANGE = " – ";

const digits = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 });

/**
 * `A$`, not the `$` that `currencyDisplay: "narrowSymbol"` produces.
 *
 * A bare dollar sign on a page about medical tourism reads as US dollars to
 * most of the world, and this schedule is Australian. The client's own document
 * writes `A$` for the same reason; `AUD 40` would be unambiguous too but reads
 * like an invoice.
 */
const money = (value: number) => `A$${digits.format(value)}`;

/**
 * `{ from: 3500, to: 8000, isOpenEnded: true }` → `"A$3,500 – A$8,000+"`.
 *
 * The trailing plus is data, not decoration: where the schedule writes it, the
 * upper bound is where a case starts rather than where it stops, and printing
 * the band without it states a ceiling the clinic never offered.
 */
export function formatAudBand(band: PriceBand): string {
  const range = `${money(band.from)}${RANGE}${money(band.to)}`;
  return band.isOpenEnded ? `${range}+` : range;
}

/**
 * One row's price, whatever kind it is.
 *
 * The two non-band cases take their wording from content rather than from here,
 * so "báo giá riêng" and "custom quote" stay in the dictionaries with every
 * other string a reader sees.
 */
export function formatCostPrice(
  price: CostPrice,
  labels: { quote: string; included: string },
): string {
  switch (price.kind) {
    case "band":
      return formatAudBand(price.aud);
    case "quote":
      return labels.quote;
    case "included":
      return labels.included;
  }
}
