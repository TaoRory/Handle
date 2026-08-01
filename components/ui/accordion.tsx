"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

/**
 * Accordion, wrapped over Radix.
 *
 * Radix supplies the roles, the `aria-expanded`/`aria-controls` wiring and
 * arrow-key roving focus; this file supplies nothing but the skin. The
 * open/close height transition uses Radix's CSS variables so it stays on the
 * compositor and reduced-motion collapses it via the global rule.
 */

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "border-line group/item border-b transition-colors duration-300",
        "data-[state=open]:border-gold/40",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group/trigger flex flex-1 items-start justify-between gap-6 py-6 text-left",
          "text-ink text-[1.0625rem] leading-snug font-medium",
          "hover:text-gold-700 data-[state=open]:text-gold-700 transition-colors duration-200",
          "focus-visible:outline-gold-600 focus-visible:outline-2 focus-visible:outline-offset-4",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className={cn(
            "border-line text-ink-400 rounded-pill mt-0.5 grid size-8 shrink-0 place-items-center border",
            "transition-[transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover/trigger:border-gold group-hover/trigger:text-gold-600",
            "group-data-[state=open]/trigger:bg-gold group-data-[state=open]/trigger:border-gold",
            "group-data-[state=open]/trigger:text-ink group-data-[state=open]/trigger:rotate-45",
          )}
        >
          <Plus className="size-4" strokeWidth={1.75} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      )}
      {...props}
    >
      <div className={cn("text-ink-600 max-w-[68ch] pr-14 pb-7", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
