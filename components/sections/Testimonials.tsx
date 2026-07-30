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
    <Section id={id} labelledBy="testimonials-title" tone="cream">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow={copy.eyebrow}
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
