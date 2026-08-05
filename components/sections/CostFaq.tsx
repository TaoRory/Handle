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

import type { CostPageContent } from "@/types";

interface CostFaqProps {
  id: string;
  copy: CostPageContent["faq"];
}

/**
 * The cost questions, and the reason this page can be quoted.
 *
 * These six are also the page's `FAQPage` graph, so each answer has to survive
 * being lifted out and read on its own — an answer that starts "as mentioned
 * above" is worthless to the thing most likely to repeat it.
 *
 * Unlike the homepage's, this section is a server component. Nothing here holds
 * state: `Accordion` and its parts already carry `"use client"`, and a server
 * component rendering them passes only serialisable props, so the section
 * itself never needs to ship.
 */
export function CostFaq({ id, copy }: CostFaqProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} tone="cream">
      <Container size="narrow">
        <SectionHeading
          id={headingId}
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <Reveal index={3} className="mt-10">
          <Accordion type="single" collapsible defaultValue={copy.items[0]?.id}>
            {copy.items.map((item) => (
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
