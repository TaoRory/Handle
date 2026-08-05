"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { LOCALE_LABELS } from "@/content";
import { cn } from "@/lib/utils";

import { LOCALES, type Locale } from "@/types";

interface LocaleSwitcherProps {
  current: Locale;
  label: string;
  tone?: "ink" | "cream";
  className?: string;
}

/**
 * Language switcher.
 *
 * Locale is a route segment, so switching is a plain `<Link>` to the same path
 * under a different prefix — no client state, no flash, and each language keeps
 * its own indexable URL.
 */
export function LocaleSwitcher({
  current,
  label,
  tone = "ink",
  className,
}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  /** `/vi/anything` → `/en/anything`. */
  const hrefFor = (locale: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${locale}${rest ? `/${rest}` : ""}`;
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={label}
        className={cn(
          "rounded-pill inline-flex h-11 items-center gap-1.5 border px-2.5 text-sm font-medium transition-colors duration-200 sm:px-3.5",
          tone === "cream"
            ? "border-cream/25 text-cream-100 hover:border-cream/60"
            : "border-line bg-surface text-ink hover:border-gold",
        )}
      >
        <Globe className="size-4" strokeWidth={1.5} aria-hidden="true" />
        {LOCALE_LABELS[current].short}
        <ChevronDown
          className={cn(
            "hidden size-3.5 transition-transform duration-200 sm:block",
            isOpen && "rotate-180",
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <ul
          role="menu"
          className="border-line bg-surface absolute top-[calc(100%+8px)] right-0 z-50 min-w-[168px] overflow-hidden rounded-md border py-1.5 shadow-md"
        >
          {LOCALES.map((locale) => (
            <li key={locale} role="none">
              <Link
                role="menuitem"
                href={hrefFor(locale)}
                hrefLang={locale}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-ink-600 hover:bg-cream-300 hover:text-ink flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors duration-150",
                  locale === current && "text-ink font-medium",
                )}
              >
                {LOCALE_LABELS[locale].long}
                {locale === current ? (
                  <Check
                    className="text-gold size-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
