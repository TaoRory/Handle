import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

import type { Reason, SectionCopy } from "@/types";

/**
 * One card in the tension band.
 *
 * Three of the four describe a problem and stay neutral; the one flagged as the
 * answer is filled gold. That single accent is what turns a row of equal boxes
 * into an argument with a conclusion — and it is the only gold fill above the
 * stats band, so it reads as emphasis rather than decoration.
 */
function ReasonCard({
  reason,
  index,
  isHighlighted,
}: {
  reason: Reason;
  index: number;
  isHighlighted: boolean;
}) {
  return (
    <Reveal index={index} className="h-full">
      <Card
        variant={isHighlighted ? "gold" : "surface"}
        isInteractive
        padding="md"
        className={cn(
          "h-full flex-row items-start gap-5 rounded-sm",
          isHighlighted
            ? "hover:border-ink/25 hover:shadow-lg"
            : "hover:border-gold/45",
        )}
      >
        {/* No per-card ordinal: numbering the cards would compete with the
            section index down the right edge. Emphasis comes from the gold
            fill on the single positive card instead. */}
        {/* Same treatment as its three neighbours — a bare icon, no container.
            The highlighted card used to box its icon in a translucent square,
            which read as a smudge on the gold and made the one card that is
            supposed to be the answer look like it came from a different set. */}
        <IconTile
          name={reason.icon}
          tone="transparent"
          className={cn(
            "shrink-0",
            isHighlighted ? "text-ink" : "group-hover/card:text-gold-600",
          )}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <CardTitle
            className={cn("text-[1.1875rem] leading-snug", isHighlighted && "text-ink")}
          >
            {reason.title}
          </CardTitle>
          {/* `ink/75` measured 3.0:1 over the gold — the body of the one card
              carrying the argument was the least readable text in the row.
              `ink-800` is solid and 7.4:1. */}
          <CardBody className={cn(isHighlighted && "text-ink-800")}>
            {reason.body}
          </CardBody>
        </div>
      </Card>
    </Reveal>
  );
}

interface WhyVietnamProps {
  copy: SectionCopy;
  reasons: Reason[];
  id: string;
  /** `id` of the reason that carries the gold treatment. */
  highlightId: string;
}

export function WhyVietnam({ copy, reasons, id, highlightId }: WhyVietnamProps) {
  return (
    <Section id={id} labelledBy="why-vietnam-title" tone="cream">
      <Container className="max-w-[90%] xl:max-w-[90%]">
        <SectionHeading
          id="why-vietnam-title"
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <ul className="mt-14 grid gap-[var(--gap-card)] sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <li key={reason.id} className="h-full">
              <ReasonCard
                reason={reason}
                index={index}
                isHighlighted={reason.id === highlightId}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
