"use client";

import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail, Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactLinks } from "@/lib/site-config";

import type { Faq as FaqRecord, SectionCopy } from "@/types";

interface FaqProps {
  id: string;
  copy: SectionCopy;
  faqs: FaqRecord[];
  /** Copy for the help card beside the list. */
  help: { title: string; body: string; action: string };
}

/**
 * Objection handling, immediately before the ask.
 *
 * Deliberately the last thing a reader meets: by this point they are either
 * convinced or stuck on one specific worry, and this is where that worry gets
 * answered without making them write an email. `type="single"` with
 * `collapsible` keeps one answer open at a time, so the section never grows
 * into a wall of text.
 */
export function Faq({ id, copy, faqs, help }: FaqProps) {
  return (
    <Section id={id} labelledBy="faq-title" tone="surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="faq-title"
              title={copy.title}
              accent={copy.accent}
              lead={copy.lead}
            />

            <Reveal index={2} className="mt-10">
              <Accordion type="single" collapsible defaultValue={faqs[0]?.id}>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          {/* Help card — the escape hatch for anything the list did not cover. */}
          <Reveal index={1} className="lg:pt-4">
            <div className="bg-ink relative overflow-hidden rounded-xl p-8 lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <span
                aria-hidden="true"
                className="rounded-pill absolute -top-20 -right-16 size-64 bg-[radial-gradient(circle,rgba(201,168,106,0.30)_0%,transparent_66%)] blur-2xl"
              />

              <div className="relative flex flex-col gap-4">
                <span className="bg-gold/15 text-gold inline-flex size-11 items-center justify-center rounded-md">
                  <Icon name="message-circle" className="size-5" strokeWidth={1.5} />
                </span>

                <h3 className="text-h3 text-cream-100">{help.title}</h3>
                <p className="text-cream/65 text-[0.9375rem] leading-relaxed">
                  {help.body}
                </p>

                <Button asChild variant="onDark" size="md" className="mt-2 w-full">
                  <Link
                    href={contactLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {help.action}
                    <ArrowTrail />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
