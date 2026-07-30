import Link from "next/link";

import { JourneyRail } from "@/components/sections/JourneyRail";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactLinks } from "@/lib/site-config";

import type { JourneyStep, SectionCopy } from "@/types";

interface JourneyTimelineProps {
  id: string;
  step: string;
  copy: SectionCopy;
  steps: JourneyStep[];
}

/** The mechanism band — how the promise actually gets delivered. */
export function JourneyTimeline({ id, step, copy, steps }: JourneyTimelineProps) {
  return (
    <Section id={id} labelledBy="journey-title" tone="cream">
      <Container size="wide">
        <SectionHeading
          id="journey-title"
          step={step}
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <JourneyRail steps={steps} />

        <Reveal index={2} className="mt-14 flex justify-center lg:mt-16">
          <Button asChild variant="outline" size="lg">
            <Link href={contactLinks.whatsapp}>
              {copy.action}
              <ArrowTrail />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
