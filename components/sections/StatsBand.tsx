import { StatCounter } from "@/components/sections/StatCounter";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";

import type { SectionCopy, Stat } from "@/types";

interface StatsBandProps {
  id: string;
  copy: SectionCopy;
  step: string;
  stats: Stat[];
}

/**
 * The gold accent band.
 *
 * One of the page's three loud surfaces (ink · gold · ink), and the only one
 * that is a solid brand colour rather than a neutral. It sits between the
 * journey and the services grid to break the long neutral middle, and it earns
 * the emphasis by carrying the numbers a sceptical reader is actually weighing.
 *
 * Gold at this size only works with ink type on top — never cream. See the
 * contrast floors in CLAUDE.md.
 */
export function StatsBand({ id, copy, step, stats }: StatsBandProps) {
  return (
    <section
      id={id}
      aria-labelledby="stats-title"
      className="bg-gold relative scroll-mt-[calc(var(--header-h)+24px)] overflow-hidden py-16 lg:py-20"
    >
      {/* Two soft blooms keep a flat 1400px field of gold from looking printed. */}
      <span
        aria-hidden="true"
        className="rounded-pill absolute -top-32 -left-24 size-[460px] bg-[radial-gradient(circle,rgba(255,252,244,0.55)_0%,transparent_66%)] blur-2xl"
      />
      <span
        aria-hidden="true"
        className="rounded-pill absolute -right-32 -bottom-40 size-[520px] bg-[radial-gradient(circle,rgba(13,13,13,0.14)_0%,transparent_66%)] blur-2xl"
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-4">
            <Reveal>
              <Eyebrow step={step} tone="onGold">
                {copy.eyebrow}
              </Eyebrow>
            </Reveal>

            <Reveal index={1}>
              <h2 id="stats-title" className="text-h2 text-ink max-w-[18ch]">
                {copy.title}{" "}
                {copy.accent ? (
                  <span className="font-display text-ink/55 italic">{copy.accent}</span>
                ) : null}
              </h2>
            </Reveal>

            {copy.lead ? (
              <Reveal index={2}>
                <p className="text-ink/70 max-w-[46ch] text-[0.9375rem]">{copy.lead}</p>
              </Reveal>
            ) : null}
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <li key={stat.id}>
                <Reveal index={index} className="flex flex-col gap-2.5">
                  {stat.icon ? (
                    <span className="border-ink/20 text-ink/70 inline-flex size-9 items-center justify-center rounded-md border">
                      <Icon name={stat.icon} className="size-4" strokeWidth={1.6} />
                    </span>
                  ) : null}

                  <span className="font-brand text-ink text-[2.25rem] leading-none sm:text-[2.75rem]">
                    <StatCounter value={stat.value} />
                    {stat.suffix ? (
                      <span className="text-ink/50">{stat.suffix}</span>
                    ) : null}
                  </span>

                  <span className="bg-ink/25 h-px w-8" aria-hidden="true" />

                  <span className="text-ink/75 max-w-[20ch] text-[0.8125rem] leading-relaxed">
                    {stat.label}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
