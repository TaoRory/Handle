import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  /** Omitted on the last crumb — the current page is not a link to itself. */
  href?: string;
}

/**
 * The trail on a standalone page.
 *
 * Rendered as well as declared to `BreadcrumbList` in the graph, not instead of
 * it: Google asks that structured breadcrumbs describe something the reader can
 * actually see, and a trail that exists only in a script tag is a claim about a
 * page rather than a description of one.
 *
 * The current page carries `aria-current="page"` and is not a link, so a screen
 * reader announces where the trail ends instead of offering a link that goes
 * nowhere.
 */
export function Breadcrumb({
  items,
  label,
  className,
}: {
  items: Crumb[];
  /** Accessible name for the landmark — there is more than one nav per page. */
  label: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={cn("w-full", className)}>
      <ol className="text-ink-400 flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="inline-flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="text-stone size-3.5 shrink-0"
                  strokeWidth={1.75}
                />
              ) : null}

              {isLast || !item.href ? (
                <span aria-current="page" className="text-ink-600">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-gold-700 focus-visible:outline-gold-700 rounded-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
