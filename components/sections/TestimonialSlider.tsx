"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Media } from "@/components/ui/media";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

import type { Testimonial } from "@/types";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  labels: {
    previous: string;
    next: string;
    goToSlide: string;
    slideStatus: string;
  };
}

/**
 * Patient stories carousel.
 *
 * Accessibility contract: real `<button>` controls with labels, a polite live
 * region announcing position, arrow-key support, and autoplay that stops on
 * hover *and* on focus so a keyboard user is never chasing a moving target.
 * Autoplay never starts when the visitor prefers reduced motion.
 */
export function TestimonialSlider({ testimonials, labels }: TestimonialSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [Autoplay({ delay: 6500, stopOnInteraction: true, stopOnFocusIn: true })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  // `loop: true` makes one snap per slide, so the dot count is known up front
  // and never has to be read back out of the carousel into React state.
  const snapCount = testimonials.length;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    // Only ever set state from the carousel's own events: the effect body
    // subscribes, it does not synchronise.
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (typeof window === "undefined" || !emblaApi) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) emblaApi.plugins().autoplay?.stop();
  }, [emblaApi]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  };

  const status = labels.slideStatus
    .replace("{current}", String(selectedIndex + 1))
    .replace("{total}", String(snapCount));

  return (
    <div className="relative">
      <div
        ref={emblaRef}
        onKeyDown={onKeyDown}
        role="group"
        aria-roledescription="carousel"
        tabIndex={0}
        className="focus-visible:outline-gold-600 overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {/* Gutter via negative margin + per-slide left padding, so the first
            and last cards sit flush with the container edges. */}
        <ul className="-ml-[var(--gap-card)] flex touch-pan-y">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="min-w-0 shrink-0 grow-0 basis-full pl-[var(--gap-card)] md:basis-1/2 lg:basis-1/3"
            >
              <figure className="border-line bg-surface flex h-full flex-col overflow-hidden rounded-lg border shadow-xs">
                <div className="flex gap-4 p-4 sm:gap-5 sm:p-5">
                  <Media
                    asset={testimonial.media}
                    seed={testimonial.id}
                    ratio="square"
                    rounded="md"
                    sizes="96px"
                    className="w-24 shrink-0 sm:w-28"
                  />

                  <div className="flex min-w-0 flex-col justify-center gap-1.5">
                    <Rating
                      value={testimonial.rating}
                      label={`${testimonial.rating}/5`}
                    />
                    <figcaption className="min-w-0">
                      <span className="text-ink block truncate text-[0.9375rem] font-medium">
                        {testimonial.author}
                      </span>
                      <span className="text-ink-400 block truncate text-xs">
                        {testimonial.location}
                      </span>
                      <span className="text-gold-600 mt-1 block truncate text-[0.6875rem]">
                        {testimonial.context}
                      </span>
                    </figcaption>
                  </div>
                </div>

                <blockquote className="border-line/70 relative flex-1 border-t px-5 pt-5 pb-6">
                  <Quote
                    className="text-gold/20 absolute top-4 right-4 size-7"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  {/* Right padding clears the quote glyph on the first line. */}
                  <p className="text-ink-600 relative pr-6 text-[0.9375rem] leading-relaxed">
                    {testimonial.quote}
                  </p>
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <p aria-live="polite" className="sr-only">
        {status}
      </p>

      {/* ---- Controls ---- */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label={labels.previous}
          className="border-line bg-surface text-ink-600 hover:border-gold hover:text-gold-600 rounded-pill inline-flex size-11 items-center justify-center border transition-colors duration-200"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </button>

        <ul className="flex items-center gap-2">
          {Array.from({ length: snapCount }, (_, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`${labels.goToSlide} ${index + 1}`}
                aria-current={index === selectedIndex ? "true" : undefined}
                className={cn(
                  "rounded-pill block h-1.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  index === selectedIndex
                    ? "bg-gold w-7"
                    : "hover:bg-stone w-1.5 bg-stone-300",
                )}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={scrollNext}
          aria-label={labels.next}
          className="border-line bg-surface text-ink-600 hover:border-gold hover:text-gold-600 rounded-pill inline-flex size-11 items-center justify-center border transition-colors duration-200"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
