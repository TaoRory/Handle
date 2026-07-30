import { notFound } from "next/navigation";

/**
 * Catch-all for unmatched paths under a locale.
 *
 * The root layout lives inside the `[locale]` segment, so an unmatched URL
 * would otherwise fall through to Next's built-in 404 — which renders outside
 * our layout, unstyled and unbranded. Routing every miss through `notFound()`
 * here puts `app/[locale]/not-found.tsx` inside the real chrome, with the right
 * `<html lang>`, and still returns a genuine 404 status.
 *
 * The alternative, `global-not-found.tsx`, is still experimental in Next 16.
 */
export default function CatchAllNotFound() {
  notFound();
}
