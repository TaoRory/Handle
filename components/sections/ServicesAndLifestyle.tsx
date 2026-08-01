import { LifestyleExperience } from "@/components/sections/LifestyleExperience";
import { MedicalServices } from "@/components/sections/MedicalServices";
import { Container } from "@/components/ui/container";

import type { Experience, SectionCopy, Service } from "@/types";

interface ServicesAndLifestyleProps {
  servicesId: string;
  experiencesId: string;
  servicesCopy: SectionCopy;
  experiencesCopy: SectionCopy;
  services: Service[];
  experiences: Experience[];
}

/**
 * The proof band: what we treat, and what the rest of the stay looks like.
 *
 * The two halves sit side by side from `xl` and stack below, mirroring the
 * reference. They share one vertical rhythm and one divider so the pairing is
 * legible rather than accidental.
 */
export function ServicesAndLifestyle({
  servicesId,
  experiencesId,
  servicesCopy,
  experiencesCopy,
  services,
  experiences,
}: ServicesAndLifestyleProps) {
  return (
    <div className="bg-surface relative">
      <Container>
        <div className="section-y grid gap-16 xl:grid-cols-2 xl:gap-14">
          <div id={servicesId}>
            <MedicalServices copy={servicesCopy} services={services} />
          </div>

          <div id={experiencesId} className="border-line xl:border-l xl:pl-14">
            <LifestyleExperience copy={experiencesCopy} experiences={experiences} />
          </div>
        </div>
      </Container>
    </div>
  );
}
