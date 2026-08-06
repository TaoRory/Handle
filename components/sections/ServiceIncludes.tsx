import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

import type { PageBandCopy, ServiceDetail } from "@/types";

interface ServiceIncludesProps {
  id: string;
  copy: PageBandCopy;
  items: ServiceDetail["includes"];
}

/** What Handle coordinates for this specialty — four cards, none highlighted. */
export function ServiceIncludes({ id, copy, items }: ServiceIncludesProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} tone="surface">
      <Container>
        <SectionHeading
          id={headingId}
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <ul className="mt-12 grid gap-[var(--gap-card)] sm:grid-cols-2 lg:mt-14">
          {items.map((item, index) => (
            <li key={item.id} className="h-full">
              <Reveal index={index} className="h-full">
                <Card variant="cream" padding="lg" className="h-full gap-5 rounded-sm">
                  <IconTile tone="transparent" name={item.icon} />
                  <div className="flex flex-col gap-3">
                    <CardTitle className="text-[1.125rem] leading-snug">
                      {item.title}
                    </CardTitle>
                    <CardBody>{item.body}</CardBody>
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
