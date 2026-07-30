"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { contactLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Persistent WhatsApp affordance.
 *
 * The primary CTA scrolls out of the hero and does not return until the closing
 * band, which on a page this long means minutes with no way to act. This holds
 * the conversion path open without occupying layout: it stays hidden over the
 * hero, then slides in once the reader has committed to scrolling.
 *
 * The label is always in the DOM for screen readers; only its width animates.
 */
export function FloatingContact({ label }: { label: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={contactLinks.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      tabIndex={isVisible ? undefined : -1}
      aria-hidden={isVisible ? undefined : true}
      className={cn(
        "group/fab rounded-pill fixed right-5 bottom-5 z-[70] inline-flex items-center gap-3",
        "bg-[#1f7a4d] py-3.5 pr-4 pl-4 text-white shadow-lg",
        "transition-[opacity,transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:bg-[#186139] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1f7a4d]",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <MessageCircle
        className="size-5 shrink-0"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span
        className={cn(
          "max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap",
          "transition-[max-width] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/fab:max-w-[220px] group-focus-visible/fab:max-w-[220px]",
        )}
      >
        {label}
      </span>
    </a>
  );
}
