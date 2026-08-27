import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatAudBand } from "@/lib/price";

import type { CostPageContent, OtherSpecialty } from "@/types";

interface OtherSpecialtiesProps {
  id: string;
  copy: CostPageContent["others"];
  items: OtherSpecialty[];
}

/**
 * The specialties Handle coordinates without a priced schedule of its own.
 *
 * Cards rather than a fourth column bolted onto the table above. These rows
 * quote a whole care journey where the table quotes procedures, and putting the
 * two in one table would mean two rows at the same indent meaning different
 * things — the reader has no way to tell which is which once they are scrolling
 * a long grid of numbers.
 */
export function OtherSpecialties({ id, copy, items }: OtherSpecialtiesProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} tone="cream300">
      <Container>
        <SectionHeading
          id={headingId}
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <ul className="mt-12 grid gap-[var(--gap-card)] sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.id} className="h-full">
              <Reveal index={index} className="h-full">
                <div className="border-line bg-surface flex h-full flex-col gap-4 rounded-sm border p-6">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-ink text-[1.0625rem] leading-snug font-medium">
                      {item.name}
                    </h3>
                    <p className="text-ink-600 text-sm">{item.covers}</p>
                  </div>

                  <div className="border-line/70 mt-auto flex flex-col gap-1 border-t pt-4">
                    <span className="text-ink-400 text-xs tracking-[0.12em] uppercase">
                      {copy.journeyLabel}
                    </span>
                    <span className="font-brand text-gold-700 text-lg tracking-tight">
                      {formatAudBand(item.journey)}
                    </span>
                  </div>

                  <p className="text-ink-400 text-sm">{item.advanced}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
