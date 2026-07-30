import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

import type { Reason, SectionCopy } from "@/types";

/** One pain-point card. Numbered, so the four read as an argument, not a list. */
function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  return (
    <Reveal index={index} className="h-full">
      <Card isInteractive padding="lg" className="h-full gap-5">
        <div className="flex items-start justify-between gap-4">
          <IconTile
            name={reason.icon}
            className="group-hover/card:bg-gold-100 group-hover/card:text-gold-600 group-hover/card:ring-gold/35"
          />
          <span className="font-brand group-hover/card:text-gold/60 text-2xl leading-none text-stone-300 transition-colors duration-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <CardTitle className="text-[1.1875rem] leading-snug">
            {reason.title}
          </CardTitle>
          <CardBody>{reason.body}</CardBody>
        </div>
      </Card>
    </Reveal>
  );
}

interface WhyVietnamProps {
  copy: SectionCopy;
  reasons: Reason[];
  id: string;
}

export function WhyVietnam({ copy, reasons, id }: WhyVietnamProps) {
  return (
    <Section id={id} labelledBy="why-vietnam-title" tone="cream">
      <Container>
        <SectionHeading
          id="why-vietnam-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <ul className="mt-14 grid gap-[var(--gap-card)] sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <li key={reason.id} className="h-full">
              <ReasonCard reason={reason} index={index} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
