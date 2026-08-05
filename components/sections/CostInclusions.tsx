import { Check, X } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

import type { CostInclusion, CostPageContent } from "@/types";

interface CostInclusionsProps {
  id: string;
  copy: CostPageContent["inclusions"];
  items: CostInclusion[];
}

function InclusionList({
  title,
  items,
  isIncluded,
}: {
  title: string;
  items: CostInclusion[];
  isIncluded: boolean;
}) {
  const Mark = isIncluded ? Check : X;

  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-brand text-eyebrow text-ink uppercase">{title}</h3>

      <ul className="flex flex-col gap-px">
        {items.map((item) => (
          <li
            key={item.id}
            className="border-line/70 flex items-start gap-4 border-b py-4 last:border-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                "rounded-pill mt-0.5 grid size-6 shrink-0 place-items-center",
                isIncluded ? "bg-gold-100 text-gold-700" : "bg-cream-500/60 text-ink-400",
              )}
            >
              <Mark className="size-3.5" strokeWidth={2.25} />
            </span>

            <Icon name={item.icon} className="text-ink-600 mt-0.5 size-[1.125rem]" />

            {/* Both columns read at `ink-600`. The excluded lines were `ink-400`,
                which measured 4.48:1 on cream-300 — under the 4.5 floor, and
                under it for the lines a reader is most likely to feel misled
                about later. The distinction is carried by the heading and the
                mark instead, which is where it has to live anyway: a
                differentiator made only of lightness is no differentiator at
                all for anyone not seeing the two columns side by side. */}
            <span
              className={cn(
                "text-[0.9375rem] leading-relaxed",
                isIncluded ? "text-ink-800" : "text-ink-600",
              )}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * What the quote covers, beside what it does not.
 *
 * Two columns rather than one list with ticks and crosses mixed through it:
 * the exclusions are the half that earns the inclusions any credit, and buried
 * in a single list they read as afterthoughts. Given equal width, they read as
 * a position.
 *
 * The tick and cross are `aria-hidden` and the two groups are separated by real
 * headings, so the distinction survives without colour or iconography — a list
 * that means the opposite of what it looks like is the worst failure available
 * here.
 */
export function CostInclusions({ id, copy, items }: CostInclusionsProps) {
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

        <Reveal index={3}>
          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
            <InclusionList
              title={copy.includedLabel}
              items={items.filter((item) => item.isIncluded)}
              isIncluded
            />
            <InclusionList
              title={copy.excludedLabel}
              items={items.filter((item) => !item.isIncluded)}
              isIncluded={false}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
