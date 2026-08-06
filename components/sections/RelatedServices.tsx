import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowTrail, Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ROUTES, routePath } from "@/lib/site-config";

import type { Locale, PageBandCopy, Service } from "@/types";

interface RelatedServicesProps {
  id: string;
  copy: PageBandCopy;
  services: Service[];
  locale: Locale;
}

/**
 * The other five specialties.
 *
 * Not decoration. Six pages that only link upward to the homepage are six
 * dead ends, and a crawler arriving on one of them has nowhere to go — this is
 * what turns the set into a section of a site rather than six orphans that
 * happen to share a layout. It is also the cheapest thing a reader who landed
 * on the wrong specialty can use.
 */
export function RelatedServices({ id, copy, services, locale }: RelatedServicesProps) {
  const headingId = `${id}-title`;

  return (
    <Section id={id} labelledBy={headingId} tone="cream">
      <Container>
        <SectionHeading id={headingId} title={copy.title} accent={copy.accent} />

        <ul className="mt-10 grid gap-[var(--gap-card)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.id}>
              <Reveal index={index}>
                <Link
                  href={routePath(locale, ROUTES.services, service.slug)}
                  className="group/link border-line bg-surface hover:border-gold/45 focus-visible:outline-gold-700 flex h-full items-center gap-4 rounded-sm border p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <Icon name={service.icon} className="text-ink-600 size-5" />
                  <span className="text-ink flex-1 text-[0.9375rem] font-medium">
                    {service.title}
                  </span>
                  <ArrowTrail className="text-ink-400" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
