import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

import type { Advantage, SectionCopy } from "@/types";

/**
 * One commitment card.
 *
 * The hover state raises the card, warms the icon tile to gold and sweeps a
 * gold hairline across the top edge — three small moves that read as one.
 */
function AdvantageCard({ advantage, index }: { advantage: Advantage; index: number }) {
  return (
    <Reveal index={index} className="h-full">
      <Card variant="cream" isInteractive padding="lg" className="h-full gap-5">
        <span
          aria-hidden="true"
          className="bg-gold absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-x-100"
        />

        <IconTile
          name={advantage.icon}
          className="group-hover/card:bg-gold-100 group-hover/card:text-gold-600 group-hover/card:ring-gold/35"
        />

        <div className="flex flex-col gap-3">
          <CardTitle className="text-[1.1875rem] leading-snug">
            {advantage.title}
          </CardTitle>
          <CardBody>{advantage.body}</CardBody>
        </div>
      </Card>
    </Reveal>
  );
}

interface WhyChooseUsProps {
  id: string;
  copy: SectionCopy;
  advantages: Advantage[];
}

export function WhyChooseUs({ id, copy, advantages }: WhyChooseUsProps) {
  return (
    <Section id={id} labelledBy="why-us-title" tone="surface">
      <Container>
        <SectionHeading
          id="why-us-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
          align="center"
        />

        <ul className="mt-14 grid gap-[var(--gap-card)] sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <li key={advantage.id} className="h-full">
              <AdvantageCard advantage={advantage} index={index} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
