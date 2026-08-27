"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { ConsultationLink } from "@/components/layout/ConsultationLink";
import { ArrowTrail } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { resolveHref, routePath } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import type { Locale, NavLink } from "@/types";

interface NavbarProps {
  locale: Locale;
  links: NavLink[];
  ctaLabel: string;
  navLabel: string;
  homeLabel: string;
  menuLabel: string;
  closeLabel: string;
  localeLabel: string;
}

/**
 * Sticky site header.
 *
 * Transparent over the hero, then settles into a solid panel once the page
 * scrolls, so the first screen stays uninterrupted. The panel is opaque and not
 * frosted — see `.header-panel` for why the blur had to go.
 * The active link is driven by an IntersectionObserver, not a scroll listener.
 */
export function Navbar({
  locale,
  links,
  ctaLabel,
  navLabel,
  homeLabel,
  menuLabel,
  closeLabel,
  localeLabel,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  /* Only the anchor links can be observed; a route link names a page, not a
     section of this one. */
  const sectionIds = useMemo(
    () =>
      links
        .filter((link) => link.href.startsWith("#"))
        .map((link) => link.href.slice(1)),
    [links],
  );
  const activeId = useScrollSpy(sectionIds);

  /**
   * Two kinds of link, two ways of being current.
   *
   * A route link is active when the URL is inside it — `/vi/dich-vu/nha-khoa`
   * lights "Dịch vụ" as well as `/vi/dich-vu` does. An anchor link is active
   * only when the reader is actually on the page those anchors belong to, which
   * is why the homepage check is there: without it, the last section observed
   * before navigating away stayed lit on the next page.
   */
  const isCurrent = (href: string) => {
    const target = resolveHref(href, locale);
    if (!href.startsWith("#")) {
      return pathname === target || pathname.startsWith(`${target}/`);
    }
    return pathname === routePath(locale) && activeId === href.slice(1);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-[var(--header-h)]",
        "transition-[background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isScrolled
          ? "header-panel border-line/80 border-b shadow-sm"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-[1480px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link
          href={`/${locale}`}
          className="focus-visible:outline-gold-600 inline-flex min-h-11 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label={homeLabel}
        >
          {/* The lockup's tagline costs ~120px of horizontal room, which the
              nav needs back between lg and xl. */}
          <Logo variant="lockup" className="hidden xl:inline-flex" />
          <Logo variant="wordmark" className="xl:hidden" />
        </Link>

        <nav aria-label={navLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = isCurrent(link.href);
              return (
                <li key={link.id}>
                  <Link
                    href={resolveHref(link.href, locale)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "rounded-pill relative inline-flex h-11 items-center px-2.5 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-200 xl:px-3.5 xl:text-sm",
                      isActive ? "text-gold-700" : "text-ink-600 hover:text-ink",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "bg-gold absolute inset-x-2.5 bottom-2 h-px origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:inset-x-3.5",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Was `hidden sm:block`, which left a phone with no way to change
              language anywhere on the site — it is not in the drawer either.
              The trigger tightens instead of disappearing. */}
          <LocaleSwitcher current={locale} label={localeLabel} />

          <ConsultationLink
            size="sm"
            locale={locale}
            className="hidden h-11 rounded-sm px-5 sm:inline-flex"
          >
            {ctaLabel}
            <ArrowTrail />
          </ConsultationLink>

          <MobileNav
            links={links}
            locale={locale}
            ctaLabel={ctaLabel}
            menuLabel={menuLabel}
            closeLabel={closeLabel}
          />
        </div>
      </div>
    </header>
  );
}
