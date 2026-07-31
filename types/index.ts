/**
 * Shared content contracts.
 *
 * Every record below is a plain, serialisable object with a stable `id` and no
 * JSX — the exact shape a CMS would return. Components import these types, so a
 * change to the data is a compile error rather than a runtime surprise.
 */

/* ------------------------------------------------------------------ *
 *  Locale
 * ------------------------------------------------------------------ */

export const LOCALES = ["vi", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/** A collection that exists in every supported language. */
export type Localized<T> = Record<Locale, T>;

/* ------------------------------------------------------------------ *
 *  Icons
 *
 *  Stored as a string key, never as a component, so the value survives a
 *  round-trip through JSON. `lib/icon-map.ts` resolves the key and is typed
 *  as an exhaustive record — adding a name here forces a mapping there.
 * ------------------------------------------------------------------ */

export type IconName =
  | "activity"
  | "arrow-right"
  | "award"
  | "baby"
  | "banknote"
  | "bed-double"
  | "brain"
  | "building"
  | "calendar-check"
  | "camera"
  | "clipboard-list"
  | "clock"
  | "coffee"
  | "compass"
  | "eye"
  | "file-check"
  | "file-text"
  | "globe"
  | "hand-heart"
  | "handshake"
  | "heart"
  | "heart-pulse"
  | "home"
  | "hospital"
  | "landmark"
  | "leaf"
  | "life-buoy"
  | "luggage"
  | "map-pin"
  | "message-circle"
  | "microscope"
  | "notebook-pen"
  | "plane"
  | "receipt"
  | "route"
  | "scan-eye"
  | "search"
  | "shield-check"
  | "shopping-bag"
  | "smile"
  | "sparkles"
  | "stethoscope"
  | "syringe"
  | "user-round-check"
  | "users-round"
  | "utensils"
  | "wallet"
  | "waves";

/* ------------------------------------------------------------------ *
 *  Media
 * ------------------------------------------------------------------ */

/** Palette families available to the generated `MediaPlate` artwork. */
export type PlateTone = "sand" | "clay" | "sage" | "dusk" | "linen" | "gold";

/**
 * One media slot.
 *
 * While the project has no licensed photography, `src` is omitted and `Media`
 * renders a deterministic brand plate at the same aspect ratio. Supplying
 * `src` later switches the component to `next/image` with zero layout movement,
 * which is why `alt` is written today as the art-direction brief.
 */
export interface MediaAsset {
  /** Doubles as the photographer's brief until a real image is dropped in. */
  alt: string;
  src?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  /** Deterministic seed for the generated plate. Defaults to the record id. */
  seed?: string;
  tone?: PlateTone;
  /** Subject glyph shown inside the plate. */
  glyph?: IconName;
}

/* ------------------------------------------------------------------ *
 *  Records
 * ------------------------------------------------------------------ */

/** A pain point that explains why patients look outside their home system. */
export interface Reason {
  id: string;
  icon: IconName;
  title: string;
  body: string;
}

/** A differentiator card in "Why choose Handle". */
export interface Advantage {
  id: string;
  icon: IconName;
  title: string;
  body: string;
}

/** One stop on the nine-step concierge journey. */
export interface JourneyStep {
  id: string;
  /** Display ordinal, e.g. "01". Stored, not derived, so a CMS can reorder. */
  step: string;
  icon: IconName;
  title: string;
  body: string;
}

/** A medical specialty Handle coordinates. */
export interface Service {
  id: string;
  slug: string;
  icon: IconName;
  title: string;
  body: string;
  media: MediaAsset;
  /** Marks the card that gets the wide grid cell. */
  isFeatured?: boolean;
}

/** A non-clinical experience offered around the treatment. */
export interface Experience {
  id: string;
  slug: string;
  icon: IconName;
  title: string;
  body: string;
  media: MediaAsset;
}

/**
 * A partner facility.
 *
 * Names here are illustrative placeholders drawn as typographic lockups — no
 * real hospital marks are reproduced. Swap for licensed logos before launch.
 */
export interface Partner {
  id: string;
  name: string;
  /** Two-to-three letter monogram used in the drawn mark. */
  monogram: string;
  kind: string;
  city: string;
  logo?: string;
}

/** A patient story. */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  /** Treatment or context, e.g. "Phẫu thuật tim · 2025". */
  context: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  media: MediaAsset;
}

/**
 * A headline number.
 *
 * `value` carries its own locale formatting ("2.400" in vi, "2,400" in en);
 * `StatCounter` parses the digits back out to animate and re-applies the
 * separator, so no second numeric field is needed.
 */
export interface Stat {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  /** Optional glyph, used in the gold stats band but not over the hero. */
  icon?: IconName;
}

/** One question in the closing accordion. */
export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/** A short reassurance chip under the hero CTAs. */
export interface TrustBadge {
  id: string;
  icon: IconName;
  label: string;
}

/* ------------------------------------------------------------------ *
 *  Navigation
 * ------------------------------------------------------------------ */

export interface NavLink {
  id: string;
  label: string;
  href: string;
  /** True for links that leave the site (adds rel + external affordance). */
  isExternal?: boolean;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: NavLink[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  platform: "facebook" | "instagram" | "youtube" | "linkedin";
}

/* ------------------------------------------------------------------ *
 *  Section copy
 * ------------------------------------------------------------------ */

/**
 * The standard heading trio.
 * `accent` is the single word rendered in the display serif + gold.
 */
export interface SectionCopy {
  eyebrow?: string;
  title: string;
  accent?: string;
  lead?: string;
  action?: string;
}

/** A stop in the fixed section index down the right edge of the page. */
export interface SectionNavItem {
  id: string;
  label: string;
  step: string;
}

export interface HeroCopy {
  titleLead: string;
  titleAccent: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  badges: TrustBadge[];
  media: MediaAsset;
  // No `stats` here on purpose: the figures have their own gold band at
  // section 05, and repeating them over the fold made the same claim twice.
}

export interface CtaCopy {
  title: string;
  accent: string;
  lead: string;
  whatsapp: string;
  consultation: string;
  form: {
    eyebrow: string;
    title: string;
    lead: string;
    chatLabel: string;
    qrEyebrow: string;
    qrTitle: string;
    qrLead: string;
    qrAction: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    success: string;
    error: string;
    hint: string;
    privacy: string;
    chips: string[];
  };
}

/** Everything the homepage renders, in one language. */
export interface SiteContent {
  locale: Locale;
  /** BCP-47 tag for the <html lang> attribute. */
  htmlLang: string;
  nav: {
    links: NavLink[];
    cta: string;
    /** Accessible name for the primary <nav> landmark. */
    navLabel: string;
    /** Accessible name for the logo link. */
    homeLabel: string;
    menuLabel: string;
    closeLabel: string;
    localeLabel: string;
  };
  hero: HeroCopy;
  partners: SectionCopy;
  whyVietnam: SectionCopy;
  about: SectionCopy & {
    body: string[];
    media: MediaAsset;
    /** Short proof pills under the copy — icon key plus its label. */
    pills: { id: string; icon: IconName; label: string }[];
    secondaryAction: string;
  };
  whyUs: SectionCopy;
  journey: SectionCopy;
  stats: SectionCopy;
  services: SectionCopy;
  experiences: SectionCopy;
  testimonials: SectionCopy;
  faq: SectionCopy & { help: { title: string; body: string; action: string } };
  cta: CtaCopy;
  /** Labels for the fixed section index; ids come from `SECTION_IDS`. */
  sectionNav: { label: string; items: { id: string; label: string }[] };
  floatingCta: string;
  intro: { skip: string; loading: string };
  footer: {
    tagline: string;
    columns: FooterColumn[];
    contactTitle: string;
    address: string;
    legal: string;
    socials: SocialLink[];
  };
  a11y: {
    skipToContent: string;
    previous: string;
    next: string;
    goToSlide: string;
    slideStatus: string;
  };
  notFound: {
    title: string;
    lead: string;
    home: string;
    contact: string;
  };
}
