"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { ArrowTrail } from "@/components/ui/icon";

import type { Partner, SiteContent } from "@/types";

interface PartnerDialogProps {
  copy: SiteContent["partners"];
  partners: Partner[];
}

/**
 * The full partner list, behind "Xem tất cả đối tác".
 *
 * The marquee is a texture — it scrolls, it repeats, and a reader who wants to
 * check whether a particular hospital is on it has to wait for the loop to come
 * round. This is the same records held still, in a grid, readable in one pass.
 *
 * A dialog and not a page, unlike the services listing: there is nothing here
 * to rank for and nothing to link to. It is a list of names a visitor checks
 * once, mid-scroll, and then carries on reading — sending them to another URL
 * to see it would cost them their place in the argument for no gain. (The
 * consultation form stays a page for the opposite reason: it is the end of that
 * argument, and a modal that skips the argument also skips the reason to fill
 * it in.)
 *
 * Radix supplies the focus trap, `Esc`, scroll lock, `aria-modal` and returning
 * focus to the trigger on close. This file supplies only the skin.
 */
export function PartnerDialog({ copy, partners }: PartnerDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="group/link text-gold-700 hover:text-ink focus-visible:outline-gold-700 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {copy.action}
          <ArrowTrail />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in bg-ink/45 fixed inset-0 z-[90] backdrop-blur-sm" />

        <Dialog.Content
          className="bg-cream-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed top-1/2 left-1/2 z-[100] flex max-h-[min(85dvh,46rem)] w-[calc(100vw-2rem)] max-w-[64rem] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg shadow-lg duration-200"
          // Radix would otherwise pull focus to the first tabbable thing, which
          // is the close button — announcing "close" before the heading. The
          // panel takes it instead, so the title is read first.
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement).focus();
          }}
          tabIndex={-1}
        >
          <div className="border-line/70 flex items-start justify-between gap-6 border-b px-6 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-col gap-2">
              <Dialog.Title className="text-h3 text-ink max-w-[26ch]">
                {copy.title}
              </Dialog.Title>
              <Dialog.Description className="text-ink-600 max-w-[62ch] text-sm">
                {copy.dialogLead}
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={copy.closeLabel}
                className="border-line text-ink-600 hover:border-gold hover:text-ink focus-visible:outline-gold-700 rounded-pill inline-flex size-11 shrink-0 items-center justify-center border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          {/* The list scrolls, not the page behind it. `tabIndex` because a
              scrollable region has to be reachable without a pointer. */}
          <div
            tabIndex={0}
            className="focus-visible:outline-gold-700 flex-1 overflow-y-auto px-6 py-6 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:px-8"
          >
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <li key={partner.id}>
                  <div className="border-line bg-surface flex h-full items-center gap-4 rounded-sm border p-4">
                    <span className="bg-cream-100 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md">
                      {partner.logo ? (
                        /* eslint-disable-next-line @next/next/no-img-element --
                           matches the marquee: these are small fixed-size marks,
                           and routing ten of them through the optimizer for a
                           panel that opens on demand buys nothing. */
                        <img
                          src={partner.logo}
                          alt=""
                          className="size-9 object-contain"
                        />
                      ) : (
                        <span className="font-brand text-ink-400 text-xs tracking-[0.08em]">
                          {partner.monogram}
                        </span>
                      )}
                    </span>

                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-ink text-[0.9375rem] leading-snug font-medium">
                        {partner.name}
                      </span>
                      <span className="text-ink-600 text-xs">
                        {partner.kind} · {partner.city}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
