import type { Locale, PriceBand } from "@/types";

/**
 * Band formatting and the one derived figure on the cost page.
 *
 * Kept out of the components because the specialty pages render the same bands
 * in a different layout, and two copies of a rounding rule is how the same
 * procedure ends up quoted two ways on two pages of the same site.
 */

/** An en dash with hair spaces — a hyphen between numbers reads as minus. */
const RANGE = " – ";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

/** `{ from: 300, to: 1200 }` → `"$300 – $1,200"`. */
export function formatUsdBand(band: PriceBand): string {
  if (band.from === 0 && band.to === 0) return "—";
  return `${usd.format(band.from)}${RANGE}${usd.format(band.to)}`;
}

/**
 * The same band in đồng, carried in millions.
 *
 * Vietnamese prices are spoken in triệu, not in full digits — "104 triệu" is
 * what a reader hears and repeats, while "104.000.000 ₫" is nine characters of
 * noise they have to count. English keeps the unit spelled out because "M ₫"
 * would be guesswork for a reader who has never seen it.
 */
export function formatVndBand(band: PriceBand, locale: Locale): string {
  if (band.from === 0 && band.to === 0) return "—";
  const unit = locale === "vi" ? "triệu ₫" : "million ₫";
  const format = (value: number) => value.toLocaleString(locale === "vi" ? "vi-VN" : "en-US");
  return `${format(band.from)}${RANGE}${format(band.to)} ${unit}`;
}

export function formatAudBand(band: PriceBand): string {
  if (band.from === 0 && band.to === 0) return "—";
  return `${aud.format(band.from)}${RANGE}${aud.format(band.to)}`;
}

/**
 * How far below the comparison band the Vietnamese one sits, as a percentage.
 *
 * Measured midpoint to midpoint. Comparing the two lower bounds, or the low
 * end of one against the high end of the other, would both produce a bigger
 * number and neither would describe a case anyone actually has — the midpoint
 * is the only pairing that is not chosen for how it reads. Rounded to five so
 * the figure does not imply a precision the underlying bands do not have.
 */
export function savingPercent(vietnam: PriceBand, abroad: PriceBand): number {
  if (vietnam.from === 0 && vietnam.to === 0) return 0;
  const mid = (band: PriceBand) => (band.from + band.to) / 2;
  const ratio = 1 - mid(vietnam) / mid(abroad);
  return Math.round((ratio * 100) / 5) * 5;
}
