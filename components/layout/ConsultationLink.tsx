"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/lib/site-config";

import type { ButtonProps } from "@/components/ui/button";

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
 */
export function ConsultationLink({
  children,
  onNavigate,
  ...props
}: ButtonProps & {
  /** Lets the mobile drawer close itself before the page moves. */
  onNavigate?: () => void;
}) {
  return (
    <Button asChild {...props}>
      <Link
        href={`#${SECTION_IDS.cta}`}
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
