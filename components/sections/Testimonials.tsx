import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

import type { SectionCopy, SiteContent, Testimonial } from "@/types";

interface TestimonialsProps {
  id: string;
  copy: SectionCopy;
  testimonials: Testimonial[];
  labels: SiteContent["a11y"];
}

export function Testimonials({ id, copy, testimonials, labels }: TestimonialsProps) {
  return (
    // A deeper cream than the neighbouring bands: enough separation to read as
    // its own chapter without spending one of the three accent surfaces.
    <Section id={id} labelledBy="testimonials-title" tone="cream300">
      <Container>
        <SectionHeading
          id="testimonials-title"
          title={copy.title}
          accent={copy.accent}
          lead={copy.lead}
        />

        <div className="mt-12 lg:mt-14">
          <TestimonialSlider
            testimonials={testimonials}
            labels={{
              previous: labels.previous,
              next: labels.next,
              goToSlide: labels.goToSlide,
              slideStatus: labels.slideStatus,
            }}
          />
        </div>
      </Container>
    </Section>
  );
}
