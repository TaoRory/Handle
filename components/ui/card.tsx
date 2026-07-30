import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import type { ElementType, ReactNode } from "react";

const cardVariants = cva(
  [
    "group/card relative flex flex-col overflow-hidden",
    "transition-[transform,box-shadow,border-color,background-color]",
    "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  ],
  {
    variants: {
      variant: {
        /** The default: white panel on the cream canvas. */
        surface: "rounded-lg border border-line bg-surface shadow-xs",
        /** Sits on a white section — inverts to cream so it still separates. */
        cream: "rounded-lg border border-line bg-cream-100 shadow-none",
        /** Editorial: no chrome, just a hairline. Used by the services grid. */
        quiet: "rounded-lg border border-line/70 bg-surface/60",
        ink: "rounded-lg border border-cream/12 bg-ink-800",
      },
      isInteractive: {
        true: "hover:-translate-y-1 hover:border-gold/45 hover:shadow-md",
        false: "",
      },
      padding: {
        none: "",
        sm: "p-5",
        md: "p-6 lg:p-7",
        lg: "p-7 lg:p-9",
      },
    },
    defaultVariants: {
      variant: "surface",
      isInteractive: false,
      padding: "md",
    },
  },
);

interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Card({
  children,
  className,
  as: Tag = "div",
  variant,
  isInteractive,
  padding,
}: CardProps) {
  return (
    <Tag className={cn(cardVariants({ variant, isInteractive, padding }), className)}>
      {children}
    </Tag>
  );
}

export function CardTitle({
  children,
  className,
  as: Tag = "h3",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("text-h3 text-ink", className)}>{children}</Tag>;
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("text-ink-600 text-[0.9375rem]", className)}>{children}</p>;
}

export { cardVariants };
