import Link from "next/link";

import { ArrowTrail, Icon } from "@/components/ui/icon";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { SECTION_IDS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import type { SectionCopy, Service } from "@/types";

/** One specialty card. Hover zooms the media and slides the label forward. */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal index={index} className="h-full">
      <Link
        href={`#${SECTION_IDS.cta}`}
        className={cn(
          "group/card border-line bg-surface relative flex h-full flex-col overflow-hidden rounded-lg border",
          "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "hover:border-gold/45 hover:-translate-y-1 hover:shadow-md",
        )}
      >
        <Media
          asset={service.media}
          seed={service.id}
          ratio="landscape"
          rounded="none"
          hasHoverZoom
          sizes="(max-width: 640px) 45vw, (max-width: 1280px) 30vw, 200px"
        />

        <div className="flex flex-1 flex-col gap-1.5 px-4 py-4">
          <span className="flex items-center gap-2">
            <Icon
              name={service.icon}
              className="text-gold size-4 shrink-0"
              strokeWidth={1.5}
            />
            <span className="text-ink text-[0.9375rem] leading-snug font-medium">
              {service.title}
            </span>
          </span>
          <span className="text-ink-400 text-xs leading-relaxed">{service.body}</span>
        </div>
      </Link>
    </Reveal>
  );
}

interface MedicalServicesProps {
  copy: SectionCopy;
  services: Service[];
}

/**
 * The clinical half of the two-column proof band.
 *
 * Renders as a `<section>` nested inside `ServicesAndLifestyle`, which owns the
 * landmark and the shared vertical rhythm.
 */
export function MedicalServices({ copy, services }: MedicalServicesProps) {
  return (
    <section aria-labelledby="services-title" className="flex flex-col">
      <Reveal index={1}>
        {/* Matches the min-height on the experiences heading — see the note
            there; the two columns must share a baseline. */}
        <h2
          id="services-title"
          className="text-h3 text-ink sm:text-h2 mt-4 xl:min-h-[2.28em]"
        >
          {copy.title}
        </h2>
      </Reveal>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.id} className="h-full">
            <ServiceCard service={service} index={index} />
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
