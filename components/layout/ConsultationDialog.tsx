"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ButtonProps } from "@/components/ui/button";
import type { CtaCopy, Locale } from "@/types";
import type { ReactNode } from "react";

const ConsultationContext = createContext<{ open: () => void } | null>(null);

/**
 * The consultation dialog, and the one switch that opens it.
 *
 * Every "free consultation" button on the page — header, hero, mobile drawer —
 * used to hand the visitor off to WhatsApp. That is a good path for someone who
 * already wants to talk and a dead end for someone who is still deciding: it
 * leaves the site, needs an app, and asks them to compose the first message
 * themselves. The dialog gives them four fields instead, without losing their
 * place on the page.
 *
 * The closing band keeps its own inline form. That one is the destination at
 * the end of the argument; this one is for the visitor who is convinced early.
 * Both are the same component, so there is one form to maintain — see the
 * `useId` note in `ConsultationForm` for what having two of them on a page
 * costs.
 *
 * Radix supplies the focus trap, `Esc`, scroll lock and `aria-modal`.
 */
export function ConsultationProvider({
  copy,
  locale,
  closeLabel,
  children,
}: {
  copy: CtaCopy;
  locale: Locale;
  closeLabel: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <ConsultationContext.Provider value={value}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in bg-ink/55 fixed inset-0 z-[90] backdrop-blur-sm" />

          <Dialog.Content
            className={cn(
              "bg-surface fixed z-[100] flex flex-col overflow-hidden shadow-lg",
              // A sheet on phones, a centred panel from `sm` up. Its own height
              // is capped so a long form scrolls inside the dialog rather than
              // pushing its footer past the fold.
              "inset-x-0 bottom-0 max-h-[92dvh] rounded-t-lg",
              "sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[88dvh] sm:w-[min(560px,calc(100vw-40px))]",
              "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out data-[state=open]:fade-in duration-300",
            )}
          >
            <div className="border-line flex shrink-0 items-start justify-between gap-6 border-b px-5 py-5 sm:px-7">
              <div className="flex flex-col gap-1.5">
                <Dialog.Title className="text-h3 text-ink">
                  {copy.title}{" "}
                  <span className="font-display text-gold italic">{copy.accent}</span>
                </Dialog.Title>
                <Dialog.Description className="text-ink-600 max-w-[46ch] text-sm leading-6">
                  {copy.lead}
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={closeLabel}
                  className="border-line bg-surface text-ink hover:border-gold rounded-pill inline-flex size-11 shrink-0 items-center justify-center border transition-colors duration-200"
                >
                  <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>

            <div className="overflow-y-auto px-5 py-6 sm:px-7">
              <ConsultationForm copy={copy.form} locale={locale} isCompact />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ConsultationContext.Provider>
  );
}

/**
 * A button that opens the dialog.
 *
 * Deliberately not a `Dialog.Trigger`: the triggers live in server components
 * scattered across the tree, and one shared dialog with a context switch beats
 * a `Dialog.Root` per button, each with its own copy of the form.
 */
export function ConsultationButton({
  children,
  onOpen,
  ...props
}: ButtonProps & { onOpen?: () => void }) {
  const ctx = useContext(ConsultationContext);

  return (
    <Button
      type="button"
      {...props}
      onClick={() => {
        onOpen?.();
        ctx?.open();
      }}
    >
      {children}
    </Button>
  );
}
