import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

import type { CostFactor, CostPageContent } from "@/types";

interface CostFactorsProps {
  id: string;
  copy: CostPageContent["factors"];
  factors: CostFactor[];
}

/**
 * What moves a quote inside its band.
 *
 * Four neutral cards and no gold one. The highlight variant marks the card
 * carrying the argument, and here no single factor outranks the others — the
 * point is that all four apply at once. Emphasising one would be decoration
 * pretending to be a claim.
 */
export function CostFactors({ id, copy, factors }: CostFactorsProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} tone="cream">
      <Container>
        <SectionHeading
          id={headingId}
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <ul className="mt-12 grid gap-[var(--gap-card)] sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {factors.map((factor, index) => (
            <li key={factor.id} className="h-full">
              <Reveal index={index} className="h-full">
                <Card variant="cream" padding="lg" className="h-full gap-5 rounded-sm">
                  <IconTile tone="transparent" name={factor.icon} />
                  <div className="flex flex-col gap-3">
                    <CardTitle className="text-[1.125rem] leading-snug">
                      {factor.title}
                    </CardTitle>
                    <CardBody>{factor.body}</CardBody>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
