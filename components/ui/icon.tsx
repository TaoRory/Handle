import { ArrowRight } from "lucide-react";
import { createElement } from "react";

import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

import type { IconName } from "@/types";

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

/**
 * Resolves a stored icon key to a component.
 * Always decorative — every icon in this project sits beside a text label.
 *
 * `createElement` rather than `<Glyph />`: the icon is looked up from a map at
 * render time, and binding it to a local capitalised identifier would read as
 * declaring a component inside render (and reset its subtree on every change).
 */
export function Icon({ name, className, strokeWidth = 1.5 }: IconProps) {
  return createElement(getIcon(name), {
    className: cn("size-5 shrink-0", className),
    strokeWidth,
    "aria-hidden": "true",
  });
}

/** The arrow that slides forward on button and link hover. */
export function ArrowTrail({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "size-4 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "group-hover/btn:translate-x-1 group-hover/link:translate-x-1",
        className,
      )}
      strokeWidth={1.75}
      aria-hidden="true"
    />
  );
}

/**
 * A soft square tile behind a section icon.
 * `tone` shifts it from the cream default to the gold accent treatment.
 */
export function IconTile({
  name,
  tone = "cream",
  className,
}: {
  name: IconName;
  tone?: "cream" | "gold" | "ink" | "transparent";
  className?: string;
}) {
  const tones = {
    cream: "bg-cream-300 text-ink-600 ring-line",
    gold: "bg-gold-100 text-gold-600 ring-gold/35",
    ink: "bg-ink text-gold ring-ink",
    transparent: "bg-transparent text-ink-600",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center",
        "transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        tones[tone],
        className,
      )}
    >
      <Icon name={name} className="size-[48px]" />
    </span>
  );
}
