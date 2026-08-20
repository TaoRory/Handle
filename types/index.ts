/**
 * Shared content contracts.
 *
 * Every record below is a plain, serialisable object with a stable `id` and no
 * JSX — the exact shape a CMS would return. Components import these types, so a
 * change to the data is a compile error rather than a runtime surprise.
 */

import { ConsultationState } from "@/app/actions/consultation";

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
  | "mail"
  | "map-pin"
  | "message-circle"
  | "microscope"
  | "notebook-pen"
  | "phone"
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
  | "waves"
  | "salad";

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
  // No media. The card shows the author's initials: a real face beside an
  // invented quote would attribute words to someone who never said them, and
  // the generated plate read as a broken avatar rather than a decision.
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
 *  Cost
 *
 *  The single most-searched thing about treatment abroad, and the thing
 *  every competitor answers with "contact us". Publishing bands is the
 *  whole argument of the page.
 *
 *  Bands, never point prices, and stored as numbers rather than
 *  pre-formatted strings: a price is arithmetic — it gets compared,
 *  converted and rounded — and the moment it is a string, the comparison
 *  column has to be written out by hand and can drift from the row beside
 *  it. `Stat` stores strings because a stat is only ever printed.
 * ------------------------------------------------------------------ */

/** An inclusive lower and upper bound in one currency. */
export interface PriceBand {
  from: number;
  to: number;
}

/**
 * One procedure's reference cost.
 *
 * `vnd` is carried alongside `usd` rather than derived from it. A single
 * exchange-rate constant would be wrong the week after it was written and
 * wrong silently, and the reader who thinks in đồng is the one least served
 * by a stale conversion.
 */
export interface CostItem {
  id: string;
  /** Matches a `Service.id`, so a row can link through to its specialty. */
  serviceId: string;
  procedure: string;
  /** What the band covers — "per implant", "full cycle", "per eye". */
  unit: string;
  /** Reference band in Vietnam, US dollars. */
  usd?: PriceBand;
  /** The same band in Vietnamese đồng, millions. */
  vnd?: PriceBand;
  /** The same procedure in a high-cost system, US dollars. */
  abroad?: PriceBand;
  /** Reference band in Australian dollars. */
  aud?: PriceBand;
  /** Optional category for the cost item. */
  category?: string;
  /** Which system `abroad` describes — "abroad" on its own means nothing. */
  abroadRegion: string;
  note?: string;
}

/** A line in the "what the number covers" list. */
export interface CostInclusion {
  id: string;
  icon: IconName;
  label: string;
  /** False renders the line as explicitly excluded, not merely absent. */
  isIncluded: boolean;
}

/** Something that moves a quote up or down. */
export interface CostFactor {
  id: string;
  icon: IconName;
  title: string;
  body: string;
}

/* ------------------------------------------------------------------ *
 *  Standalone pages
 *
 *  `SiteContent` is the homepage's contract and stays that way — it is
 *  already four hundred lines, and threading a second page through it
 *  would make every route pay for every other route's copy. Routes added
 *  from here on get their own dictionary under `content/pages.ts`, keyed
 *  by locale exactly the same way.
 * ------------------------------------------------------------------ */

/** Title, lead and the accent word, for a band on a standalone page. */
export interface PageBandCopy {
  title: string;
  accent?: string;
  lead?: string;
}

export interface CostPageContent {
  /** `<title>`, written to the ~60 characters a result renders. */
  metaTitle: string;
  metaDescription: string;
  /** Leaf label in the breadcrumb, and the nav/footer link text. */
  breadcrumb: string;
  hero: PageBandCopy & { primaryCta: string; secondaryCta: string };
  table: PageBandCopy & {
    colProcedure?: string;
    colVietnam?: string;
    colAbroad?: string;
    colSaving?: string;
    colService?: string;
    colCovers?: string;
    colEstimated?: string;
    /** Screen-reader caption for the table element. */
    caption: string;
    /** Sits under the table: what these numbers are, and are not. */
    disclaimer: string;
  };
  inclusions: PageBandCopy & { includedLabel: string; excludedLabel: string };
  factors: PageBandCopy;
  faq: PageBandCopy & { items: Faq[] };
  closing: PageBandCopy & { action: string };
}

/**
 * The chrome shared by all six specialty pages.
 *
 * Band headings live here rather than in each `ServiceDetail`, because they are
 * the same sentence six times over — repeating them per record is six places to
 * fix a typo and six chances for one page to drift out of the set.
 */
export interface ServicePageContent {
  /** Parent crumb: "Dịch vụ" / "Services". */
  breadcrumbRoot: string;
  /**
   * The listing at `/dich-vu`.
   *
   * A real page and not a bare path segment: the six specialty pages need a
   * parent that exists, or the middle breadcrumb crumb is either a link to a
   * 404 or a `ListItem` with no `item`. It also gives the set a hub, which is
   * the difference between six pages and a section.
   */
  index: PageBandCopy & {
    metaTitle: string;
    metaDescription: string;
    /** Label on each card. Its own string: the homepage's "see all services"
        was reused here and appeared on six cards that each lead to one. */
    cardAction: string;
  };
  includes: PageBandCopy;
  facts: PageBandCopy;
  suitedFor: PageBandCopy;
  cost: PageBandCopy & { action: string; empty: string };
  faq: PageBandCopy;
  related: PageBandCopy;
  closing: PageBandCopy & { action: string };
}

/** Everything the non-homepage routes render, in one language. */
export interface PagesContent {
  cost: CostPageContent;
  service: ServicePageContent;
}

/**
 * The long-form content behind one specialty page.
 *
 * Keyed to a `Service.id`, not carrying its own slug: `services.ts` already
 * owns the slug per locale and the router reads it from there. Two records
 * naming the same URL is how one of them quietly stops being reachable.
 */
export interface ServiceDetail {
  /** Matches `Service.id`. */
  id: string;
  /** Sized to the ~60 characters a search result renders. */
  metaTitle: string;
  metaDescription: string;
  /**
   * The `h1`. Deliberately not `Service.title` — that is a card label
   * ("Nha khoa"), and a heading has to carry the query as well as the name.
   */
  heading: string;
  headingAccent: string;
  intro: string[];
  /** What Handle coordinates for this specialty specifically. */
  includes: { id: string; icon: IconName; title: string; body: string }[];
  /** Practical planning facts — days in country, stay, when you can fly. */
  facts: { id: string; icon: IconName; label: string; value: string }[];
  /** Who the specialty suits, in the reader's own terms. */
  suitedFor: string[];
  faqs: Faq[];
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
  /**
   * Only the partner band still uses this — `PartnerCarousel` renders it as the
   * panel's own `<h2>`. The kicker above section headings was removed site-wide,
   * so no other section should set it.
   */
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
    /**
     * Short kicker on the form card. The band's own `title`/`lead` above it
     * carry the heading, so the card does not repeat them.
     */
    eyebrow: string;
    chatLabel: string;
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
    /**
     * The panel that replaces the fields once a request is written.
     *
     * Kept as copy rather than reusing `success`: that sentence is the server
     * action's return value and has to stand alone in a status line, while this
     * is a laid-out confirmation with its own heading and next steps. Anything
     * promised here must be something Handle actually does — no reference codes
     * for rows we do not read back.
     */
    sent: {
      eyebrow: string;
      title: string;
      accent: string;
      lead: string;
      /** What happens after the form. Three, in order, icon paired with label. */
      steps: { id: string; icon: IconName; label: string; body: string }[];
      again: string;
    };
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
  /**
   * The trust band, plus the full list behind it.
   *
   * `title` is the dialog's heading — the band itself is labelled by `eyebrow`,
   * so the longer sentence had been sitting unused in both dictionaries.
   */
  partners: SectionCopy & {
    /** One line under the dialog heading. */
    dialogLead: string;
    closeLabel: string;
  };
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
  /**
   * The persistent contact button and the channels behind it.
   *
   * More than one channel on purpose: Zalo is how Vietnamese families message,
   * WhatsApp is how most of the overseas audience does, and a single button
   * wired to either one quietly excludes the other half of the market.
   */
  floatingContact: {
    /** The button's own label, and its accessible name when collapsed. */
    label: string;
    /** Heading inside the panel. */
    title: string;
    /** One line under the heading, setting the response expectation. */
    note: string;
    closeLabel: string;
    channels: { id: string; icon: IconName; name: string; hint: string }[];
  };
  intro: { skip: string; loading: string; mark: string };
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

const defaultState: ConsultationState = {
  success: false,
  message: "",
};

export const consultationInitialState = defaultState;
