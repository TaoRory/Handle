import { Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

import type { PageBandCopy, ServiceDetail } from "@/types";

interface ServiceFactsProps {
  id: string;
  factsCopy: PageBandCopy;
  suitedCopy: PageBandCopy;
  facts: ServiceDetail["facts"];
  suitedFor: string[];
}

/**
 * The planning numbers, and who the specialty suits.
 *
 * Together in one band because they answer the same question from two sides —
 * "can I actually do this" — and separating them across two full-height
 * sections put a viewport of whitespace between a fact and its context.
 *
 * The facts are a `<dl>`. They are label-and-value pairs, and a grid of `div`s
 * would leave a screen reader reading "Days in Vietnam" and "5–7 days" as two
 * unrelated fragments.
 */
export function ServiceFacts({
  id,
  factsCopy,
  suitedCopy,
  facts,
  suitedFor,
}: ServiceFactsProps) {
  const headingId = `${id}-title`;
  const suitedId = `${id}-suited`;

  return (
    <Section id={id} labelledBy={headingId} tone="cream300">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeading
              id={headingId}
              title={factsCopy.title}
              accent={factsCopy.accent}
              lead={factsCopy.lead}
            />

            <Reveal index={3} className="mt-10">
              <dl className="grid gap-px sm:grid-cols-2">
                {facts.map((fact) => (
                  <div
                    key={fact.id}
                    className="border-line/70 flex flex-col gap-2 border-b py-5 sm:pr-8"
                  >
                    <dt className="text-ink-600 flex items-center gap-2.5 text-sm">
                      <Icon name={fact.icon} className="text-ink-400 size-4" />
                      {fact.label}
                    </dt>
                    <dd className="font-brand text-ink text-[1.375rem] tracking-tight">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal index={2}>
            <div className="border-line bg-cream-100 rounded-lg border p-7 lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:p-8">
              <h2 id={suitedId} className="text-h3 text-ink">
                {suitedCopy.title}{" "}
                {suitedCopy.accent ? (
                  <span className="font-display text-gold-700 italic">
                    {suitedCopy.accent}
                  </span>
                ) : null}
              </h2>

              <ul aria-labelledby={suitedId} className="mt-6 flex flex-col gap-4">
                {suitedFor.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="bg-gold-100 text-gold-700 rounded-pill mt-0.5 grid size-6 shrink-0 place-items-center"
                    >
                      <Check className="size-3.5" strokeWidth={2.25} />
                    </span>
                    <span className="text-ink-800 text-[0.9375rem] leading-relaxed">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
