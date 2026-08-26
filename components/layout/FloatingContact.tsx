"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { contactLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import type { SiteContent } from "@/types";

/** Channel id in the content file → where it actually goes. */
const HREF: Record<string, string> = {
  zalo: contactLinks.zalo,
  whatsapp: contactLinks.whatsapp,
  email: contactLinks.mail,
  ...Object.fromEntries(
    contactLinks.phones.map((phone) => [`phone-${phone.id}`, phone.href]),
  ),
};

/**
 * The persistent way to reach a human.
 *
 * Present from the first screen rather than appearing after 700px of scroll:
 * the reason to hold a contact path open is that a visitor may want it at any
 * moment, and the moment most likely to matter is the one where they are still
 * deciding whether this is real.
 *
 * It opens a choice rather than firing a single app. A lone WhatsApp button
 * serves the overseas half of this audience and quietly excludes the Vietnamese
 * half, who message on Zalo; the reverse is equally true. Phone and email are
 * there because some people want a voice and some want to attach a scan.
 *
 * The channels are named in words rather than by their logos — reproducing
 * someone else's mark badly is worse than not reproducing it, and the name is
 * what a visitor is scanning for anyway.
 */
export function FloatingContact({ copy }: { copy: SiteContent["floatingContact"] }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      // Send focus back where it came from, or a keyboard user is dropped at
      // the top of the document.
      triggerRef.current?.focus();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-[70] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
    >
      {isOpen ? (
        <div
          role="dialog"
          aria-label={copy.title}
          className="bg-ink border-cream/12 w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-lg border shadow-lg"
        >
          <div className="border-cream/10 border-b px-5 py-4">
            <p className="text-cream-100 text-[0.9375rem] font-medium">{copy.title}</p>
            <p className="text-cream/60 mt-1 text-xs leading-5">{copy.note}</p>
          </div>

          <ul className="p-2">
            {copy.channels.map((channel) => (
              <li key={channel.id}>
                <a
                  href={HREF[channel.id]}
                  target={
                    channel.id === "phone" || channel.id === "email"
                      ? undefined
                      : "_blank"
                  }
                  rel="noreferrer noopener"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group/ch flex min-h-11 items-center gap-3.5 rounded-md px-3 py-2.5",
                    "hover:bg-cream/8 transition-colors duration-200",
                    "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2",
                  )}
                >
                  <span className="bg-cream/10 text-gold rounded-pill flex size-9 shrink-0 items-center justify-center">
                    <Icon name={channel.icon} className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-cream-100 block text-sm font-medium">
                      {channel.name}
                    </span>
                    <span className="text-cream/55 block text-xs">{channel.hint}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={copy.label}
        className={cn(
          "rounded-pill inline-flex h-14 items-center gap-2.5 px-5 font-medium",
          "bg-gold text-ink shadow-lg",
          "hover:bg-gold-600 hover:text-cream-100 transition-colors duration-200",
          "focus-visible:outline-ink focus-visible:outline-2 focus-visible:outline-offset-3",
        )}
      >
        {isOpen ? (
          <X className="size-5 shrink-0" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Icon name="message-circle" className="size-5 shrink-0" strokeWidth={1.75} />
        )}
        {/* The label stays in the DOM either way — collapsing it to an icon on
            small screens is exactly where a contact path matters most. */}
        <span className="text-sm whitespace-nowrap">
          {isOpen ? copy.closeLabel : copy.label}
        </span>
      </button>
    </div>
  );
}
