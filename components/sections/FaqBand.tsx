import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

import type { Faq, PageBandCopy } from "@/types";

interface FaqBandProps {
  id: string;
  copy: PageBandCopy;
  items: Faq[];
  tone?: "cream" | "surface";
}

/**
 * The question list on a standalone page, and the reason that page can be
 * quoted by an answer engine.
 *
 * These are the same records the route declares as `FAQPage`, so each answer
 * has to survive being lifted out and read alone — an answer that opens with
 * "as mentioned above" is worthless to the thing most likely to repeat it.
 *
 * Shared by the cost page and all six specialty pages rather than copied per
 * route: a second file with the same accordion in it is a second place for the
 * open-by-default behaviour to drift.
 *
 * A server component. `Accordion` and its parts already carry `"use client"`,
 * and everything passed to them here is serialisable, so this band never ships.
 */
export function FaqBand({ id, copy, items, tone = "cream" }: FaqBandProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} tone={tone}>
      <Container size="narrow">
        <SectionHeading
          id={headingId}
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <Reveal index={3} className="mt-10">
          <Accordion type="single" collapsible defaultValue={items[0]?.id}>
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
