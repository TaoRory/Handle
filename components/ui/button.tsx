import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2.5",
    "font-medium whitespace-nowrap select-none",
    "rounded-pill transition-[transform,box-shadow,background-color,color,border-color]",
    "duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-600",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-ink shadow-[0_10px_30px_-12px_rgba(176,143,78,0.55)] hover:bg-gold-600 hover:text-cream-100 hover:shadow-gold hover:-translate-y-0.5",
        dark: "bg-ink text-cream-100 hover:bg-ink-800 hover:-translate-y-0.5 hover:shadow-md",
        outline:
          "border border-line bg-surface text-ink hover:border-gold hover:bg-cream-100 hover:-translate-y-0.5 hover:shadow-sm",
        ghost: "text-ink-600 hover:bg-cream-300 hover:text-ink",
        onDark:
          "border border-cream/25 bg-transparent text-cream-100 hover:border-cream/60 hover:bg-cream/10 hover:-translate-y-0.5",
        whatsapp:
          "bg-[#1f7a4d] text-white hover:bg-[#186139] hover:-translate-y-0.5 hover:shadow-md",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
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
