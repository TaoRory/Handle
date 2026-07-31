"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { Loader2, MessageCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { consultationInitialState, submitConsultation } from "@/app/actions/consultation";
import { contactLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import type { CtaCopy, Locale } from "@/types";

interface ConsultationFormProps {
    copy: CtaCopy["form"];
    locale: Locale;
}

const fieldBase =
    "border-line bg-cream-100 text-ink placeholder:text-ink-400 focus-visible:border-gold focus-visible:ring-gold/20 w-full rounded-sm border px-4 py-3.5 text-[0.9375rem] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2";

export function ConsultationForm({ copy, locale }: ConsultationFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(
        submitConsultation,
        consultationInitialState,
    );

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state.success]);

    const statusTone = state.success ? "text-success" : "text-rose-600";

    return (
        <Card variant="surface" padding="lg" className="shadow-lg rounded-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <p className="font-brand text-gold text-xs tracking-[0.18em] uppercase">
                        {copy.eyebrow}
                    </p>
                    <CardTitle className="max-w-[18ch] text-[1.75rem] leading-tight lg:text-[2rem]">
                        {copy.title}
                    </CardTitle>
                    <CardBody className="max-w-[38ch] text-[0.9375rem]">
                        {copy.lead}
                    </CardBody>
                </div>
            </div>

            <form ref={formRef} action={formAction} className="space-y-4">
                <input type="hidden" name="locale" value={locale} />

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <label htmlFor="fullName" className="text-ink text-sm font-medium">
                            {copy.nameLabel}
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder={copy.namePlaceholder}
                            className={cn(fieldBase, state.fieldErrors?.fullName && "border-rose-400")}
                            aria-invalid={Boolean(state.fieldErrors?.fullName)}
                            aria-describedby={state.fieldErrors?.fullName ? "fullName-error" : undefined}
                            required
                        />
                        {state.fieldErrors?.fullName ? (
                            <p id="fullName-error" className="text-rose-200 text-xs">
                                {state.fieldErrors.fullName}
                            </p>
                        ) : null}
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-ink text-sm font-medium">
                            {copy.emailLabel}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            placeholder={copy.emailPlaceholder}
                            className={cn(fieldBase, state.fieldErrors?.email && "border-rose-400")}
                            aria-invalid={Boolean(state.fieldErrors?.email)}
                            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
                            required
                        />
                        {state.fieldErrors?.email ? (
                            <p id="email-error" className="text-rose-200 text-xs">
                                {state.fieldErrors.email}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-ink text-sm font-medium">
                        {copy.phoneLabel}
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder={copy.phonePlaceholder}
                        className={cn(fieldBase, state.fieldErrors?.phone && "border-rose-400")}
                        aria-invalid={Boolean(state.fieldErrors?.phone)}
                        aria-describedby={state.fieldErrors?.phone ? "phone-error" : undefined}
                        required
                    />
                    {state.fieldErrors?.phone ? (
                        <p id="phone-error" className="text-rose-200 text-xs">
                            {state.fieldErrors.phone}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="message" className="text-ink text-sm font-medium">
                        {copy.messageLabel}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder={copy.messagePlaceholder}
                        className={cn(
                            fieldBase,
                            "resize-none",
                            state.fieldErrors?.message && "border-rose-400",
                        )}
                        aria-invalid={Boolean(state.fieldErrors?.message)}
                        aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
                        required
                    />
                    {state.fieldErrors?.message ? (
                        <p id="message-error" className="text-rose-200 text-xs">
                            {state.fieldErrors.message}
                        </p>
                    ) : null}
                </div>

                <div className="grid gap-3 pt-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                    <Button type="submit" variant="primary" size="lg" className="w-full rounded-sm">
                        {isPending ? (
                            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        ) : null}
                        {copy.submit}
                    </Button>

                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-sm">
                        <Link href={contactLinks.whatsapp} target="_blank" rel="noreferrer noopener">
                            <MessageCircle className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                            {copy.chatLabel}
                        </Link>
                    </Button>
                </div>

                <div className="space-y-3 pt-1">
                    <p className={cn("text-sm", statusTone)} aria-live="polite">
                        {state.message || copy.hint}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {copy.chips.map((chip) => (
                            <span
                                key={chip}
                                className="border-line text-ink-600 inline-flex items-center gap-2 rounded-sm border bg-cream-100 px-3 py-1.5 text-xs"
                            >
                                <ShieldCheck className="text-gold size-3.5" strokeWidth={2} aria-hidden="true" />
                                {chip}
                            </span>
                        ))}
                    </div>

                    <p className="text-ink-600 text-xs leading-6">{copy.privacy}</p>
                </div>
            </form>
        </Card>
    );
}