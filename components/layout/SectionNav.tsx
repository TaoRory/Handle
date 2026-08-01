"use client";

import Link from "next/link";

import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

interface SectionNavItem {
  id: string;
  label: string;
  step: string;
}

/**
 * Fixed section index down the right edge, desktop only.
 *
 * The page is a single long scroll, so this is what tells the reader how many
 * parts there are, which one they are in, and lets them jump. Labels stay
 * hidden until hover or keyboard focus so the rail reads as a quiet ruler
 * rather than a second navigation bar competing with the header.
 *
 * `aria-current` on the active link is the accessible counterpart to the
 * decorative progress bar at the top of the page.
 */
export function SectionNav({
  items,
  label,
}: {
  items: SectionNavItem[];
  label: string;
}) {
  const activeId = useScrollSpy(
    items.map((item) => item.id),
    120,
  );

  return (
    <nav
      aria-label={label}
      className="fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-1">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group/dot flex items-center justify-end gap-3 py-1.5"
              >
                <span
                  className={cn(
                    "font-brand rounded-pill pointer-events-none px-2.5 py-1 text-[0.6875rem] tracking-[0.14em] whitespace-nowrap uppercase",
                    "translate-x-1 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "group-hover/dot:translate-x-0 group-hover/dot:opacity-100",
                    "group-focus-visible/dot:translate-x-0 group-focus-visible/dot:opacity-100",
                    "bg-ink text-cream-100 shadow-sm",
                  )}
                >
                  <span className="text-gold-700 mr-1.5">{item.step}</span>
                  {item.label}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "rounded-pill block transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "bg-gold h-6 w-[3px]"
                      : "group-hover/dot:bg-stone h-2.5 w-[3px] bg-stone-300",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
