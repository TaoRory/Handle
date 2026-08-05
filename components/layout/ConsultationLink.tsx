"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SECTION_IDS, routePath } from "@/lib/site-config";

import type { ButtonProps } from "@/components/ui/button";
import type { Locale } from "@/types";

/** The form's first field carries this so any CTA can hand focus to it. */
export const CONSULTATION_FIELD_ATTR = "data-consultation-first";

/**
 * A "free consultation" button.
 *
 * A real anchor to the closing band, so it survives without JavaScript, opens
 * in a new tab on middle-click and copies as a link — none of which a button
 * with a scroll handler does. The smooth scroll is the browser's, from
 * `scroll-behavior` in globals.css, and `scroll-mt` on the band keeps the
 * heading clear of the sticky header.
 *
 * The one thing added on top: focus lands in the first field, so a visitor can
 * start typing the moment the page settles rather than tabbing there from the
 * top. `preventScroll` is what makes that compatible with the smooth scroll —
 * a plain `focus()` jumps instantly and cancels it.
 *
 * The href is the full path and not a bare `#lien-he`, because this button is
 * in the header on every route and the form only exists on one of them. A bare
 * hash on `/vi/chi-phi` matches nothing and the button silently does nothing —
 * the failure a header CTA can least afford. Same-page it still behaves as an
 * anchor; from anywhere else it navigates and then lands on the band. The focus
 * hand-off is a no-op on that second path, since the field is not in the
 * document yet, which is why it was already written to tolerate its absence.
 */
export function ConsultationLink({
  children,
  locale,
  onNavigate,
  ...props
}: ButtonProps & {
  locale: Locale;
  /** Lets the mobile drawer close itself before the page moves. */
  onNavigate?: () => void;
}) {
  return (
    <Button asChild {...props}>
      <Link
        href={`${routePath(locale)}#${SECTION_IDS.cta}`}
        onClick={() => {
          onNavigate?.();
          requestAnimationFrame(() => {
            const field = document.querySelector<HTMLElement>(
              `[${CONSULTATION_FIELD_ATTR}]`,
            );
            field?.focus({ preventScroll: true });
          });
        }}
      >
        {children}
      </Link>
    </Button>
  );
}
