"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, ShieldCheck } from "lucide-react";

import { submitConsultation } from "@/app/actions/consultation";
import { CONSULTATION_FIELD_ATTR } from "@/components/layout/ConsultationLink";
import { ConsultationSent } from "@/components/sections/ConsultationSent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DURATION, EASE_EXPO } from "@/lib/motion";
import { contactLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { consultationInitialState } from "@/types";

import type { CtaCopy, Locale } from "@/types";

interface ConsultationFormProps {
  copy: CtaCopy["form"];
  locale: Locale;
}

// 14px is the floor this project holds type to, so the fields get tighter by
// losing padding rather than by shrinking the text.
const fieldBase =
  "border-line bg-cream-100 text-ink placeholder:text-ink-400 focus-visible:border-gold focus-visible:ring-gold/20 w-full rounded-sm border px-3.5 py-2.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2";

/** Opacity only, so `MotionConfig reducedMotion="user"` still cross-fades it. */
const swap = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

/**
 * The consultation form, and the confirmation that replaces it.
 *
 * Laid out wide rather than tall: the three short fields share a row from `sm`
 * up, and only the free-text box takes the full width. The heading for the
 * section lives in `CtaBanner` above, so this card opens straight on its own
 * short kicker and the fields.
 *
 * On success the fields give way to `ConsultationSent` inside the same card.
 * A status line alone was too quiet an answer for the one moment on the page
 * where the visitor has actually committed to something.
 */
export function ConsultationForm({ copy, locale }: ConsultationFormProps) {
  // Namespaced rather than literal. There is one form on the page today, but a
  // second copy anywhere would otherwise duplicate every id and silently point
  // its labels and aria-describedby at the first one.
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;

  const [state, formAction, isPending] = useActionState(
    submitConsultation,
    consultationInitialState,
  );

  // `useActionState` has no reset, so "send another" is tracked beside it. Any
  // new submission clears the flag on its way through `handleAction`.
  const [isDismissed, setIsDismissed] = useState(false);
  const isSent = state.success && !isDismissed;

  function handleAction(formData: FormData) {
    setIsDismissed(false);
    formAction(formData);
  }

  // Dropped once the confirmation is dismissed: a blank form sitting under
  // "we received your details" reads as though this empty one had been sent.
  const status = isDismissed ? "" : state.message;

  // Three states, not two. Before anything is submitted the line carries the
  // response-time hint, which is neutral information — painting that red made
  // an untouched form look like it had already failed.
  const statusTone = !status
    ? "text-ink-600"
    : state.success
      ? "text-success"
      : "text-danger";

  return (
    <Card variant="surface" padding="md" className="rounded-sm shadow-lg">
      {/*
        A live region that outlives the swap. The confirmation panel mounts
        fresh, and a region that did not exist a moment ago is unreliably
        announced; this one is always in the tree. It carries the success
        sentence only — the form's own status line already announces errors.
      */}
      <p className="sr-only" role="status" aria-live="polite">
        {isSent ? state.message : ""}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {isSent ? (
          <motion.div
            key="sent"
            {...swap}
            transition={{ duration: DURATION.entrance, ease: EASE_EXPO }}
          >
            <ConsultationSent
              copy={copy.sent}
              chatLabel={copy.chatLabel}
              onReset={() => setIsDismissed(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            {...swap}
            transition={{ duration: DURATION.micro, ease: EASE_EXPO }}
          >
            <p className="font-brand text-gold mb-5 text-xs tracking-[0.18em] uppercase">
              {copy.eyebrow}
            </p>

            <form action={handleAction} className="space-y-4">
              <input type="hidden" name="locale" value={locale} />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor={fieldId("fullName")}
                    className="text-ink text-sm font-medium"
                  >
                    {copy.nameLabel}
                  </label>
                  <input
                    // What the "free consultation" links hand focus to once the
                    // page has scrolled here.
                    {...{ [CONSULTATION_FIELD_ATTR]: "" }}
                    id={fieldId("fullName")}
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder={copy.namePlaceholder}
                    className={cn(
                      fieldBase,
                      state.fieldErrors?.fullName && "border-danger/70",
                    )}
                    aria-invalid={Boolean(state.fieldErrors?.fullName)}
                    aria-describedby={
                      state.fieldErrors?.fullName
                        ? fieldId("fullName-error")
                        : undefined
                    }
                    required
                  />
                  {state.fieldErrors?.fullName ? (
                    <p id={fieldId("fullName-error")} className="text-danger text-xs">
                      {state.fieldErrors.fullName}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor={fieldId("email")}
                    className="text-ink text-sm font-medium"
                  >
                    {copy.emailLabel}
                  </label>
                  <input
                    id={fieldId("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder={copy.emailPlaceholder}
                    className={cn(
                      fieldBase,
                      state.fieldErrors?.email && "border-danger/70",
                    )}
                    aria-invalid={Boolean(state.fieldErrors?.email)}
                    aria-describedby={
                      state.fieldErrors?.email ? fieldId("email-error") : undefined
                    }
                    required
                  />
                  {state.fieldErrors?.email ? (
                    <p id={fieldId("email-error")} className="text-danger text-xs">
                      {state.fieldErrors.email}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor={fieldId("phone")}
                    className="text-ink text-sm font-medium"
                  >
                    {copy.phoneLabel}
                  </label>
                  <input
                    id={fieldId("phone")}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder={copy.phonePlaceholder}
                    className={cn(
                      fieldBase,
                      state.fieldErrors?.phone && "border-danger/70",
                    )}
                    aria-invalid={Boolean(state.fieldErrors?.phone)}
                    aria-describedby={
                      state.fieldErrors?.phone ? fieldId("phone-error") : undefined
                    }
                    required
                  />
                  {state.fieldErrors?.phone ? (
                    <p id={fieldId("phone-error")} className="text-danger text-xs">
                      {state.fieldErrors.phone}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={fieldId("message")}
                  className="text-ink text-sm font-medium"
                >
                  {copy.messageLabel}
                </label>
                <textarea
                  id={fieldId("message")}
                  name="message"
                  rows={3}
                  placeholder={copy.messagePlaceholder}
                  className={cn(
                    fieldBase,
                    "resize-none",
                    state.fieldErrors?.message && "border-danger/70",
                  )}
                  aria-invalid={Boolean(state.fieldErrors?.message)}
                  aria-describedby={
                    state.fieldErrors?.message ? fieldId("message-error") : undefined
                  }
                  required
                />
                {state.fieldErrors?.message ? (
                  <p id={fieldId("message-error")} className="text-danger text-xs">
                    {state.fieldErrors.message}
                  </p>
                ) : null}
              </div>

              {/* Actions and reassurance share the last row: the buttons sit left,
                  the status line and chips fill the space that would otherwise be
                  empty beside them. */}
              <div className="border-line flex flex-col gap-4 border-t pt-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="rounded-sm"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    ) : null}
                    {copy.submit}
                  </Button>

                  <Button asChild variant="outline" size="md" className="rounded-sm">
                    <Link
                      href={contactLinks.whatsapp}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <MessageCircle
                        className="size-4"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {copy.chatLabel}
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-col gap-2 lg:items-end lg:text-right">
                  <p className={cn("text-sm", statusTone)} aria-live="polite">
                    {status || copy.hint}
                  </p>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {copy.chips.map((chip) => (
                      <span
                        key={chip}
                        className="border-line text-ink-600 bg-cream-100 inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs"
                      >
                        <ShieldCheck
                          className="text-gold size-3"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {chip}
                      </span>
                    ))}
                  </div>

                  <p className="text-ink-400 max-w-[52ch] text-xs leading-5">
                    {copy.privacy}
                  </p>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
