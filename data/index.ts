import { advantages } from "@/data/advantages";
import {
  costCategories,
  costItems,
  otherSpecialties,
} from "@/data/cost-schedule";
import { costFactors, costInclusions } from "@/data/costs";
import { experiences } from "@/data/experiences";
import { faqs } from "@/data/faqs";
import { journeySteps } from "@/data/journey";
import { partners } from "@/data/partners";
import { reasons } from "@/data/reasons";
import { serviceDetails } from "@/data/service-details";
import { services } from "@/data/services";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/testimonials";
import { ROUTES } from "@/lib/site-config";

import type {
  Advantage,
  CostCategory,
  CostFactor,
  CostInclusion,
  CostItem,
  OtherSpecialty,
  Experience,
  Faq,
  JourneyStep,
  Locale,
  Partner,
  Reason,
  Service,
  ServiceDetail,
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
export const getCostItems = (locale: Locale): CostItem[] => costItems[locale];
export const getCostCategories = (locale: Locale): CostCategory[] =>
  costCategories[locale];
export const getOtherSpecialties = (locale: Locale): OtherSpecialty[] =>
  otherSpecialties[locale];
export const getCostInclusions = (locale: Locale): CostInclusion[] =>
  costInclusions[locale];
export const getCostFactors = (locale: Locale): CostFactor[] => costFactors[locale];

/**
 * Specialty page lookups.
 *
 * The slug lives on `Service` and the long-form copy lives on `ServiceDetail`,
 * joined on `id`. Two collections rather than one because the homepage grid
 * needs the card and nothing else — folding a page's worth of prose into the
 * record the grid maps over would ship all six pages' content on the homepage.
 */
export const getServiceDetails = (locale: Locale): ServiceDetail[] =>
  serviceDetails[locale];

export const getServiceBySlug = (locale: Locale, slug: string): Service | undefined =>
  services[locale].find((service) => service.slug === slug);

export const getServiceDetail = (
  locale: Locale,
  id: string,
): ServiceDetail | undefined => serviceDetails[locale].find((detail) => detail.id === id);

/**
 * The priced rows for one specialty, and the range its card should quote.
 *
 * Joined through `CostCategory.serviceId` rather than stored on every row: the
 * schedule groups by specialty already, and repeating the link per row is a
 * second place for it to drift.
 */
export function getCostForService(locale: Locale, serviceId: string) {
  const category = costCategories[locale].find((c) => c.serviceId === serviceId);
  if (!category) return { category: undefined, items: [] as CostItem[] };
  return {
    category,
    items: costItems[locale].filter((item) => item.categoryId === category.id),
  };
}

/**
 * A specialty's path, for the content dictionaries to store as a link.
 *
 * Locale-relative (`dich-vu/nha-khoa`), because `resolveHref` adds the locale
 * at render. Written as a lookup rather than letting the footer repeat the six
 * slugs as literals: a slug edited in `services.ts` would then change the page
 * but not the link to it, and the footer would quietly start pointing at a 404
 * on every page of the site.
 */
export const serviceHref = (locale: Locale, id: string): string => {
  const slug = services[locale].find((service) => service.id === id)?.slug;
  return slug ? `${ROUTES.services}/${slug}` : ROUTES.services;
};

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
