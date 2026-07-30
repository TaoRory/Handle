import { Icon } from "@/components/ui/icon";
import { seededRandom } from "@/lib/utils";
import { cn } from "@/lib/utils";

import type { IconName, PlateTone } from "@/types";

/**
 * Art-directed placeholder artwork.
 *
 * The project ships without licensed photography, so rather than leave grey
 * boxes (or borrow someone's stock image) each media slot renders a composed
 * plate in the brand palette: a warm gradient mesh, two gold arcs, a fine grain
 * and the subject glyph. Geometry is derived from a string seed via
 * `seededRandom`, so the same slot always renders identically — server and
 * client agree, and there is no hydration mismatch.
 *
 * This is a stand-in, not a destination: `Media` swaps to `next/image` the
 * moment a record gains a `src`, at the same aspect ratio.
 */

interface ToneSpec {
  /** Base wash, top-left → bottom-right. */
  from: string;
  to: string;
  /** The two mesh blooms. */
  bloomA: string;
  bloomB: string;
  /** Arc + glyph ink. */
  line: string;
  glyph: string;
}

const tones: Record<PlateTone, ToneSpec> = {
  sand: {
    from: "#EFE3CE",
    to: "#D8C2A0",
    bloomA: "rgba(201,168,106,0.58)",
    bloomB: "rgba(255,252,246,0.76)",
    line: "rgba(176,143,78,0.44)",
    glyph: "rgba(74,71,68,0.32)",
  },
  clay: {
    from: "#EFE2D6",
    to: "#CBAE97",
    bloomA: "rgba(186,124,92,0.42)",
    bloomB: "rgba(255,247,238,0.80)",
    line: "rgba(139,86,60,0.34)",
    glyph: "rgba(63,45,36,0.28)",
  },
  sage: {
    from: "#EBEEE7",
    to: "#C3CFC1",
    bloomA: "rgba(107,138,113,0.38)",
    bloomB: "rgba(252,254,250,0.85)",
    line: "rgba(79,122,99,0.36)",
    glyph: "rgba(43,60,49,0.28)",
  },
  dusk: {
    from: "#E6E7EC",
    to: "#B7BCC9",
    bloomA: "rgba(96,109,138,0.40)",
    bloomB: "rgba(250,251,254,0.82)",
    line: "rgba(70,84,112,0.34)",
    glyph: "rgba(38,45,60,0.28)",
  },
  linen: {
    from: "#F1ECE2",
    to: "#D9CEBC",
    bloomA: "rgba(201,168,106,0.40)",
    bloomB: "rgba(255,255,255,0.78)",
    line: "rgba(150,138,118,0.38)",
    glyph: "rgba(74,71,68,0.30)",
  },
  gold: {
    from: "#F0E0C4",
    to: "#CFA764",
    bloomA: "rgba(201,168,106,0.75)",
    bloomB: "rgba(255,250,240,0.70)",
    line: "rgba(146,112,52,0.44)",
    glyph: "rgba(60,47,26,0.32)",
  },
};

interface MediaPlateProps {
  seed: string;
  tone?: PlateTone;
  glyph?: IconName;
  className?: string;
}

export function MediaPlate({ seed, tone = "sand", glyph, className }: MediaPlateProps) {
  const spec = tones[tone];
  const random = seededRandom(seed);

  // Bloom positions, kept away from the centre so the glyph stays legible.
  const ax = 12 + random() * 30;
  const ay = 10 + random() * 34;
  const bx = 58 + random() * 34;
  const by = 52 + random() * 40;

  // Arc geometry.
  const arcOffset = 18 + random() * 22;
  const arcRotation = -28 + random() * 56;

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{
        backgroundImage: [
          `radial-gradient(120% 120% at ${ax}% ${ay}%, ${spec.bloomA} 0%, transparent 58%)`,
          `radial-gradient(90% 90% at ${bx}% ${by}%, ${spec.bloomB} 0%, transparent 62%)`,
          `linear-gradient(142deg, ${spec.from} 0%, ${spec.to} 100%)`,
        ].join(", "),
      }}
    >
      {/* Two concentric arcs — the one structural gesture in the plate. */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g
          stroke={spec.line}
          strokeWidth="0.8"
          transform={`rotate(${arcRotation} 100 100)`}
        >
          <circle cx={100 + arcOffset} cy={100 - arcOffset / 2} r="74" />
          <circle cx={100 + arcOffset} cy={100 - arcOffset / 2} r="112" opacity="0.6" />
        </g>
      </svg>

      {glyph ? (
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: spec.glyph }}
        >
          <Icon
            name={glyph}
            className="size-[26%] max-h-24 min-h-10"
            strokeWidth={0.9}
          />
        </span>
      ) : null}

      {/* Fine grain keeps the gradient from banding on large surfaces. */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
