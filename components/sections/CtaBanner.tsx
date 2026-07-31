import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

import type { CtaCopy, Locale } from "@/types";

/**
 * The closing ask.
 *
 * Ink surface — the only large dark field on the page — so the last thing a
 * visitor sees carries the most contrast.
 *
 * Stacked rather than split: the heading runs across the top and the form sits
 * full width beneath it. A two-column version left most of one side empty at
 * desktop widths, and a form is easier to fill when its fields are wide and
 * few rows deep than when they are stacked in a narrow column.
 */
export function CtaBanner({
  id,
  copy,
  locale,
}: {
  id: string;
  copy: CtaCopy;
  locale: Locale;
}) {
  return (
    <section
      id={id}
      aria-labelledby="cta-title"
      className="relative scroll-mt-[calc(var(--header-h)+24px)] snap-start pb-16 lg:pb-24"
    >
      <Container>
        <div className="bg-ink relative isolate mt-14 overflow-hidden rounded-sm px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          {/* Warm bloom behind the copy, and a gold hairline along the top. */}
          <span
            aria-hidden="true"
            className="rounded-pill absolute -top-32 -right-24 -z-10 size-[520px] bg-[radial-gradient(circle,rgba(201,168,106,0.28)_0%,transparent_65%)] blur-2xl"
          />
          <span
            aria-hidden="true"
            className="via-gold/70 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
          />

          <Reveal className="flex flex-col gap-4">
            <h2 id="cta-title" className="text-h2 text-cream-100 max-w-[24ch]">
              {copy.title}{" "}
              <span className="font-display text-gold italic">{copy.accent}</span>
            </h2>
            <p className="text-cream/70 text-lead max-w-[62ch]">{copy.lead}</p>
          </Reveal>

          <Reveal index={1} className="mt-10 lg:mt-12">
            <ConsultationForm copy={copy.form} locale={locale} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
