import { ConsultationLink } from "@/components/layout/ConsultationLink";
import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

import type { Locale, PageBandCopy } from "@/types";

interface PageClosingProps {
  id: string;
  copy: PageBandCopy & { action: string };
  locale: Locale;
}

/**
 * The ask, at the foot of a standalone page.
 *
 * Not `CtaBanner`: that band carries the consultation form itself, and there
 * must be exactly one of those on the site. Two live forms on two routes means
 * two sets of field ids, two submissions to reconcile and a second place for the
 * server action's state to be wrong. This sends the reader to the one form
 * instead — the homepage band the whole site already points at.
 *
 * The one accent surface on these pages, and therefore the last thing on them.
 */
export function PageClosing({ id, copy, locale }: PageClosingProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} tone="ink" size="lg">
      <span
        aria-hidden="true"
        className="rounded-pill pointer-events-none absolute -top-32 -right-24 size-[30rem] bg-[radial-gradient(circle,rgba(201,168,106,0.22)_0%,transparent_65%)] blur-3xl"
      />

      <Container className="relative">
        <div className="flex max-w-[42rem] flex-col gap-6">
          <Reveal index={1}>
            <h2 id={headingId} className="text-h2 text-cream-100 max-w-[20ch]">
              {copy.title}{" "}
              {copy.accent ? (
                <span className="font-display text-gold italic">{copy.accent}</span>
              ) : null}
            </h2>
          </Reveal>

          {copy.lead ? (
            <Reveal index={2}>
              <p className="text-lead text-cream/70 max-w-[56ch]">{copy.lead}</p>
            </Reveal>
          ) : null}

          <Reveal index={3}>
            <ConsultationLink
              size="lg"
              locale={locale}
              className="mt-2 self-start rounded-sm"
            >
              {copy.action}
              <ArrowTrail />
            </ConsultationLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
