import Link from "next/link";

import { ArrowTrail, Icon } from "@/components/ui/icon";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { SECTION_IDS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import type { Experience, SectionCopy } from "@/types";

/**
 * One experience tile.
 *
 * Where the service cards put their label below the image, these overlay it —
 * a gradient scrim that deepens on hover, so the two grids read as siblings
 * rather than duplicates.
 */
function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <Reveal index={index} className="h-full">
      <Link
        href={`#${SECTION_IDS.cta}`}
        className={cn(
          "group/card relative flex h-full flex-col overflow-hidden rounded-lg",
          "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "hover:-translate-y-1 hover:shadow-md",
        )}
      >
        <Media
          asset={experience.media}
          seed={experience.id}
          ratio="portrait"
          rounded="none"
          hasHoverZoom
          sizes="(max-width: 640px) 45vw, (max-width: 1280px) 30vw, 200px"
        />

        {/* Scrim — light at rest so the plate still reads, deeper on hover. */}
        <span
          aria-hidden="true"
          className="from-ink/85 via-ink/35 absolute inset-0 bg-gradient-to-t to-transparent opacity-90 transition-opacity duration-300 group-hover/card:opacity-100"
        />

        {/* Title only — the supporting line lives in the record for the detail
            page. Restraint is what keeps this grid feeling expensive. */}
        <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-4 py-4">
          <Icon
            name={experience.icon}
            className="text-gold size-4 shrink-0"
            strokeWidth={1.5}
          />
          <span className="text-cream-100 text-[0.875rem] leading-snug font-medium">
            {experience.title}
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

interface LifestyleExperienceProps {
  copy: SectionCopy;
  experiences: Experience[];
}

export function LifestyleExperience({ copy, experiences }: LifestyleExperienceProps) {
  return (
    <section aria-labelledby="experiences-title" className="flex flex-col">
      <Reveal>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </Reveal>

      <Reveal index={1}>
        {/* min-height reserves two lines so this heading and the services
            heading beside it share a baseline, whatever the language. */}
        <h2
          id="experiences-title"
          className="text-h3 text-ink sm:text-h2 mt-4 xl:min-h-[2.28em]"
        >
          {copy.title}
        </h2>
      </Reveal>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {experiences.map((experience, index) => (
          <li key={experience.id} className="h-full">
            <ExperienceCard experience={experience} index={index} />
          </li>
        ))}
      </ul>

      <Reveal index={3} className="mt-7">
        <Link
          href={`#${SECTION_IDS.cta}`}
          className="group/link border-line hover:border-gold hover:text-gold-600 text-ink-600 rounded-pill inline-flex items-center gap-2 border px-5 py-3 text-sm font-medium transition-colors duration-200"
        >
          {copy.action}
          <ArrowTrail />
        </Link>
      </Reveal>
    </section>
  );
}
