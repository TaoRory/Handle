import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { contactLinks } from "@/lib/site-config";

import type { CtaCopy } from "@/types";

/**
 * The closing ask.
 *
 * Ink surface — the only large dark field on the page — so the last thing a
 * visitor sees carries the most contrast. Two paths out: an immediate chat, or
 * a scheduled consultation for the more deliberate reader.
 */
export function CtaBanner({ id, copy }: { id: string; copy: CtaCopy }) {
  return (
    <section
      id={id}
      aria-labelledby="cta-title"
      className="relative scroll-mt-[calc(var(--header-h)+24px)] pb-16 lg:pb-24"
    >
      <Container>
        <div className="bg-ink relative isolate overflow-hidden rounded-xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          {/* Warm bloom behind the copy, and a gold hairline along the top. */}
          <span
            aria-hidden="true"
            className="rounded-pill absolute -top-32 -right-24 -z-10 size-[520px] bg-[radial-gradient(circle,rgba(201,168,106,0.28)_0%,transparent_65%)] blur-2xl"
          />
          <span
            aria-hidden="true"
            className="via-gold/70 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
          />

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div className="flex flex-col gap-5">
              <Reveal>
                <h2 id="cta-title" className="text-h2 text-cream-100 max-w-[20ch]">
                  {copy.title}{" "}
                  <span className="font-display text-gold italic">{copy.accent}</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="text-cream/70 text-lead max-w-[54ch]">{copy.lead}</p>
              </Reveal>
            </div>

            <Reveal index={2}>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button asChild variant="whatsapp" size="lg">
                  <Link
                    href={contactLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <MessageCircle
                      className="size-4.5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {copy.whatsapp}
                  </Link>
                </Button>

                <Button asChild variant="onDark" size="lg">
                  <Link href={contactLinks.mail}>
                    {copy.consultation}
                    <ArrowTrail />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
