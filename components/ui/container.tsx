import { cn } from "@/lib/utils";

import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `wide` relaxes the cap for full-bleed bands such as the partner marquee. */
  size?: "default" | "wide" | "narrow";
}

const sizes = {
  narrow: "max-w-[880px]",
  default: "max-w-[1280px]",
  wide: "max-w-[1480px]",
} as const;

/** The single source of the page gutter and max width. */
export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", sizes[size], className)}>
      {children}
    </Tag>
  );
}
