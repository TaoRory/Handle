import QRCode from "qrcode";
import Image from "next/image";

import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { contactLinks } from "@/lib/site-config";

import type { CtaCopy, Locale } from "@/types";

/**
 * The closing ask.
 *
 * Ink surface — the only large dark field on the page — so the last thing a
 * visitor sees carries the most contrast. Two paths out: an immediate chat, or
 * a scheduled consultation for the more deliberate reader.
 */
export async function CtaBanner({
  id,
  copy,
  locale,
}: {
  id: string;
  copy: CtaCopy;
  locale: Locale;
}) {
  const qrDataUrl = await QRCode.toDataURL(contactLinks.whatsapp, {
    margin: 1,
    width: 240,
    errorCorrectionLevel: "M",
    color: {
      dark: "#0D0D0D",
      light: "#FFFFFF",
    },
  });

  return (
    <section
      id={id}
      aria-labelledby="cta-title"
      className="relative scroll-mt-[calc(var(--header-h)+24px)] pb-16 lg:pb-24"
    >
      <Container>
        <div className="bg-ink relative isolate mt-14 overflow-hidden rounded-sm px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          {/* Warm bloom behind the copy, and a gold hairline along the top. */}
          <span
            aria-hidden="true"
            className="rounded-pill absolute -top-32 -right-24 -z-10 size-[520px] bg-[radial-gradient(circle,rgba(201,168,106,0.28)_0%,transparent_65%)] blur-2xl"
          />
          <span
            aria-hidden="true"
            className="via-gold/70 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
          />

          <div className="grid  gap-12 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:gap-16">
            <div className="flex flex-col justify-between gap-5 lg:pt-2">
              <Reveal>
                <h2 id="cta-title" className="text-h2 text-cream-100 max-w-[20ch]">
                  {copy.title} {" "}
                  <span className="font-display text-gold italic">{copy.accent}</span>
                </h2>
                <p className="text-cream/70 text-lead max-w-[54ch]">{copy.lead}</p>
              </Reveal>

              <Reveal index={2}>
                <div className="mt-3 flex max-w-[34rem] flex-col gap-4 rounded-sm border border-cream/10 bg-cream/5 p-5 sm:p-6">
                  <div className="space-y-1.5">
                    <p className="font-brand text-gold text-xs tracking-[0.18em] uppercase">
                      {copy.form.qrEyebrow}
                    </p>
                    <p className="text-cream-100 text-sm font-medium">{copy.form.qrTitle}</p>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="border-cream/15 bg-surface inline-flex self-start rounded-sm border p-3 shadow-[0_10px_30px_-18px_rgba(13,13,13,0.75)]">
                      <div className="relative size-[164px] overflow-hidden rounded-sm bg-white p-2 sm:size-[176px]">
                        <Image
                          src={qrDataUrl}
                          alt="Mã QR mở WhatsApp để liên hệ Handle"
                          fill
                          sizes="176px"
                          className="object-contain p-2"
                          unoptimized
                          priority={false}
                        />
                      </div>
                    </div>

                    <div className="flex max-w-[24ch] flex-col gap-3">
                      <p className="text-cream/70 text-sm leading-6">{copy.form.qrLead}</p>
                      <Button asChild variant="onDark" size="md" className="w-fit rounded-sm">
                        <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                          {copy.form.qrAction}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)] xl:items-stretch">
              <Reveal index={3}>
                <ConsultationForm copy={copy.form} locale={locale} />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
