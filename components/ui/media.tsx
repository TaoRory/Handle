import Image from "next/image";

import { MediaPlate } from "@/components/ui/media-plate";
import { cn } from "@/lib/utils";

import type { MediaAsset } from "@/types";

const ratios = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  cinema: "aspect-[21/9]",
  hero: "aspect-[4/5] sm:aspect-[16/11] lg:aspect-[7/8] xl:aspect-[9/10]",
  /**
   * No intrinsic ratio — fills whatever box the parent gives it. Only for
   * full-bleed placements where the parent already has a height; everywhere
   * else a declared ratio is what keeps CLS at zero.
   */
  fill: "size-full",
} as const;

interface MediaProps {
  asset: MediaAsset;
  /** Fallback seed when the record does not carry one. */
  seed: string;
  ratio?: keyof typeof ratios;
  className?: string;
  /** `sizes` for the responsive srcset. Required whenever a real src exists. */
  sizes?: string;
  priority?: boolean;
  /** Adds the 1.06 zoom-on-hover used by service and experience cards. */
  hasHoverZoom?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "none";
}

const radii = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
} as const;

/**
 * The one media component.
 *
 * Renders `next/image` when the record carries a `src`, and the generated brand
 * plate otherwise. Both paths use the identical aspect-ratio box, so dropping a
 * photograph in later moves the layout by exactly zero pixels.
 */
export function Media({
  asset,
  seed,
  ratio = "landscape",
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
  priority = false,
  hasHoverZoom = false,
  rounded = "lg",
}: MediaProps) {
  const plateSeed = asset.seed ?? seed;

  return (
    <div
      className={cn(
        "bg-cream-300 relative isolate overflow-hidden",
        ratios[ratio],
        radii[rounded],
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          hasHoverZoom &&
          "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.06]",
        )}
      >
        {asset.src ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={75}
            placeholder={asset.blurDataURL ? "blur" : "empty"}
            blurDataURL={asset.blurDataURL}
            className="size-full object-cover"
          />
        ) : (
          <MediaPlate seed={plateSeed} tone={asset.tone} glyph={asset.glyph} />
        )}
      </div>
    </div>
  );
}
