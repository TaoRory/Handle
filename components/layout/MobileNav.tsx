"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ConsultationLink } from "@/components/layout/ConsultationLink";
import { ArrowTrail } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { contactLinks, resolveHref, siteConfig } from "@/lib/site-config";

import type { Locale, NavLink } from "@/types";

interface MobileNavProps {
  links: NavLink[];
  locale: Locale;
  ctaLabel: string;
  menuLabel: string;
  closeLabel: string;
}

/**
 * The small-screen navigation.
 *
 * Radix Dialog gives us the focus trap, the `Esc` handler, scroll lock and the
 * `aria-modal` wiring for free — all things a hand-rolled drawer gets wrong.
 */
export function MobileNav({
  links,
  locale,
  ctaLabel,
  menuLabel,
  closeLabel,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={menuLabel}
          className="border-line bg-surface text-ink hover:border-gold rounded-pill inline-flex size-11 items-center justify-center border transition-colors duration-200 lg:hidden"
        >
          <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in bg-ink/45 fixed inset-0 z-[70] backdrop-blur-sm" />

        <Dialog.Content className="bg-cream data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed inset-y-0 right-0 z-[80] flex w-full max-w-[380px] flex-col duration-300">
          <Dialog.Title className="sr-only">{menuLabel}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {siteConfig.name} — {ctaLabel}
          </Dialog.Description>

          <div className="border-line flex h-[var(--header-h)] shrink-0 items-center justify-between border-b px-5">
            <Logo variant="wordmark" className="origin-left scale-90" />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={closeLabel}
                className="border-line bg-surface text-ink hover:border-gold rounded-pill inline-flex size-11 items-center justify-center border transition-colors duration-200"
              >
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-8">
            <ul className="flex flex-col">
              {links.map((link, index) => (
                <li key={link.id} className="border-line/70 border-b last:border-b-0">
                  <Dialog.Close asChild>
                    <Link
                      href={resolveHref(link.href, locale)}
                      className="group/link text-ink hover:text-gold-600 flex items-center justify-between gap-4 py-4 text-xl font-medium transition-colors duration-200"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-brand text-gold-700 text-xs tracking-widest">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </span>
                      <ArrowTrail />
                    </Link>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-line flex flex-col gap-3 border-t px-5 py-6">
            {/* Closes the drawer first, otherwise the page scrolls behind a
                panel that is still covering it. */}
            <ConsultationLink
              size="lg"
              locale={locale}
              className="w-full"
              onNavigate={() => setIsOpen(false)}
            >
              {ctaLabel}
              <ArrowTrail />
            </ConsultationLink>
            {contactLinks.phones.map((phone) => (
              <a
                key={phone.id}
                href={phone.href}
                className="text-ink-600 hover:text-ink text-center text-sm transition-colors duration-200"
              >
                {phone.display}
              </a>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
