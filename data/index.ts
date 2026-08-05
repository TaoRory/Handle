import { advantages } from "@/data/advantages";
import { experiences } from "@/data/experiences";
import { faqs } from "@/data/faqs";
import { journeySteps } from "@/data/journey";
import { partners } from "@/data/partners";
import { reasons } from "@/data/reasons";
import { services } from "@/data/services";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/testimonials";

import type {
  Advantage,
  Experience,
  Faq,
  JourneyStep,
  Locale,
  Partner,
  Reason,
  Service,
  Stat,
  Testimonial,
} from "@/types";

/**
 * Thin selectors over the mock collections.
 *
 * Components only ever call these — never the raw objects. When the content
 * moves to a CMS, each body becomes a `fetch()` and no view has to change.
 */

export const getReasons = (locale: Locale): Reason[] => reasons[locale];
export const getAdvantages = (locale: Locale): Advantage[] => advantages[locale];
export const getJourneySteps = (locale: Locale): JourneyStep[] => journeySteps[locale];
export const getServices = (locale: Locale): Service[] => services[locale];
export const getExperiences = (locale: Locale): Experience[] => experiences[locale];
export const getPartners = (locale: Locale): Partner[] => partners[locale];
export const getTestimonials = (locale: Locale): Testimonial[] => testimonials[locale];
export const getStats = (locale: Locale): Stat[] => stats[locale];
export const getFaqs = (locale: Locale): Faq[] => faqs[locale];

/**
 * The review average, kept but not published.
 *
 * `AggregateRating` was removed from the JSON-LD because the testimonials
 * behind it are placeholder copy, and a review score no patient gave is a
 * policy violation rather than a rounding error. This stays so the node can go
 * back in unchanged the day the reviews are real — do not delete it as dead
 * code.
 */
export function getAggregateRating(locale: Locale) {
  const list = testimonials[locale];
  const total = list.reduce((sum, item) => sum + item.rating, 0);
  return {
    ratingValue: (total / list.length).toFixed(1),
    reviewCount: list.length,
  };
}

export {
  advantages,
  experiences,
  faqs,
  journeySteps,
  partners,
  reasons,
  services,
  stats,
  testimonials,
};
