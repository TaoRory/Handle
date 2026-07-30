import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingProps {
  value: 1 | 2 | 3 | 4 | 5;
  /** Screen-reader sentence, e.g. "Đánh giá 5 trên 5". */
  label: string;
  className?: string;
}

/**
 * A star rating.
 * The stars are decorative; the value is announced once via the visually
 * hidden label so a screen reader hears "5 out of 5", not "star star star…".
 */
export function Rating({ value, label, className }: RatingProps) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          strokeWidth={1.25}
          className={cn(
            "size-3.5",
            index < value ? "fill-gold text-gold" : "text-stone-300",
          )}
        />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
}
