import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Buttons.
 *
 * Flat, hairline, 4px. The previous set carried a gold glow at rest, a larger
 * glow on hover and a lift — three effects at once, and the glow in particular
 * read as a template rather than as a clinic: on the ink band the button
 * appeared to be emitting light. Nothing here simulates depth. A press is the
 * only movement, and hover is a change of tone.
 *
 * Ink carries the primary action on light surfaces, gold carries it on dark
 * ones, so the action always holds the strongest contrast available and gold
 * stays scarce. That is the one place this file departs from the older rule of
 * "the primary CTA is always gold"; switching `primary` back to a gold fill is
 * a single line if the brand wants it that way.
 */
const buttonVariants = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2.5",
    "font-medium tracking-wide whitespace-nowrap select-none",
    "rounded-xs transition-[transform,background-color,color,border-color,text-decoration-color]",
    "duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-700",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ],
  {
    variants: {
      variant: {
        /** The primary action on a light surface. */
        primary: "bg-ink text-cream-100 hover:bg-gold-700",
        /** The primary action on the ink bands. */
        onDark: "bg-gold text-ink hover:bg-cream-100",
        /** Secondary. A hairline that fills in on hover rather than lifting. */
        outline:
          "border-ink/20 hover:border-ink hover:bg-ink hover:text-cream-100 border bg-transparent",
        /**
         * Tertiary. No chrome at all — a label on a gold rule. This is where
         * gold belongs at this scale: as a line under a word, not as the fill
         * behind one.
         */
        ghost:
          "decoration-gold text-ink-600 hover:decoration-ink hover:text-ink px-1 underline decoration-1 underline-offset-[6px]",
        // No `whatsapp` variant. It carried the platform's green as a raw hex,
        // which is both a token violation and the one colour on the page that
        // belongs to somebody else's brand.
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-[0.9375rem]",
        lg: "h-14 px-9 text-[0.9375rem]",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render as the single child element (e.g. a `next/link`) instead of a button. */
  asChild?: boolean;
  children: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </Comp>
  );
}

export { buttonVariants };
