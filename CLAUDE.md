# Project Overview

> Read `AGENTS.md` too — this project runs **Next.js 16** (Turbopack by default, `next lint`
> removed, async request APIs, new `next/image` defaults). Check `node_modules/next/dist/docs/`
> before assuming an API from an older major.

## Website Name

**Handle** — Luxury Medical Concierge
Wordmark: `H HANDLE`
Primary tagline: _You heal. We handle the rest._
Secondary tagline: _Healthcare in Vietnam. Handled._

## Description

Handle is a premium medical-concierge marketing site for international patients who choose
Vietnam for treatment. The product it sells is not a hospital — it is **the orchestration around
the hospital**: pre-arrival consultation, hospital and surgeon matching, a written Personal Care
Plan, transparent pricing, visa and travel logistics, interpreters, private transfers, recovery
stays, and post-treatment follow-up once the patient is home again.

The homepage is a single narrative funnel: _tension_ (why care at home is slow and expensive) →
_resolution_ (why Vietnam) → _trust_ (who Handle is, who we partner with) → _mechanism_ (the
9-step journey) → _proof_ (services, lifestyle, testimonials) → _action_ (free consultation).

The site is content-driven and locale-driven. Every string and every card lives in `/content` or
`/data`, never inside a component, so the whole site can be re-pointed at a CMS without touching
a single view.

## Target Users

| Segment                 | Need                                                       | Looks for first                     |
| ----------------------- | ---------------------------------------------------------- | ----------------------------------- |
| Overseas Vietnamese     | Familiar care, family nearby, no language barrier          | Trust, hospital names, testimonials |
| Expats in APAC          | Fast scheduling, English support, fair price               | Pricing transparency, timeline      |
| Western medical tourist | 40–70% cost saving at international standard               | Accreditation, doctor credentials   |
| Regional patients       | Specialties unavailable or rationed at home (IVF, cardiac) | Service list, success stories       |
| Referring partners      | A dependable in-country operator                           | Process rigour, partner logos       |

Users arrive anxious and skeptical. The design job is to make the page feel **calm, exact and
accountable** — the visual equivalent of a competent person saying "I've got this."

## Brand Personality

Trusted · Caring · Compassionate · Premium · Global Standard.

Five adjectives that govern every design decision: **calm, precise, warm, spacious, quietly
expensive.** Never: clinical-cold, salesy, neon, cluttered, urgent.

Voice: second person, short declaratives, no exclamation marks, no superlatives we cannot
substantiate. "We book it, we translate it, we follow up." Not "The best care in Asia!"

## Color Palette

Taken directly from the brand guideline (section 7 of the logo sheet).

| Token   | Hex       | Role                                                 |
| ------- | --------- | ---------------------------------------------------- |
| `ink`   | `#0D0D0D` | Primary. Headlines, wordmark, dark CTA surfaces.     |
| `cream` | `#F6F3EE` | Premium. The default page canvas — never pure white. |
| `gold`  | `#C9A86A` | Accent. Reserved: CTAs, rules, one word per H1.      |
| `stone` | `#A8A29C` | Neutral. Meta text, borders, disabled states.        |

Derived ramp (declared once in `app/globals.css` under Tailwind v4 `@theme`):

```
--color-ink        #0D0D0D    --color-cream      #F6F3EE
--color-ink-800    #1F1E1C    --color-cream-100  #FBFAF7
--color-ink-600    #4A4744    --color-cream-300  #EFEAE1
--color-ink-400    #6E6A65    --color-cream-500  #E2DACD
--color-stone      #A8A29C    --color-gold       #C9A86A
--color-stone-300  #D6D2CB    --color-gold-600   #B08F4E
--color-line       #E6E0D6    --color-gold-100   #F1E6D2
--color-surface    #FFFFFF    --color-success    #4F7A63
```

**Gold discipline.** Gold is the scarcest resource on the page. Budget: at most one gold element
per viewport-height of scroll, plus the primary CTA. Gold is never a background for body copy —
only type, 1px rules, small icon strokes, the primary button, and the two sanctioned large fills
below (the stats band and the single highlight card).

### Surface rhythm

The page is long, so tone is what tells a reader where one part ends and the next begins. Bands
alternate on a fixed sequence, and exactly **three** of them are loud:

```
hero        cream gradient
partners    floating white panel
01 why      cream        + one gold highlight card
02 about    INK          ← accent 1 — the narrative turn
03 whyUs    white
04 journey  cream
05 stats    GOLD         ← accent 2 — the numbers
06 services white
07 stories  cream-300
08 faq      white
cta         INK          ← accent 3 — the ask
```

Two hard rules: **never two accent surfaces in a row**, and **never more than three per page**.
Past three the emphasis cancels out and the page reads as noise — which is the failure mode this
rhythm exists to prevent. Gold at panel scale only carries ink type on top, never cream.

### Section numbering — one place only

**There is no eyebrow.** The kicker above section headings, and the `01`–`08` chip it carried, were
removed site-wide: a band now opens straight on its heading. Do not reintroduce a one-off label
above a title; if the case for a kicker comes back, bring back a shared component rather than
scattering them, because the failure this replaced was exactly that — some bands kept a label and
others lost it.

### Section anchoring — and why there is no scroll snapping

There was briefly `scroll-snap-type: y proximity` with a `snap-start` per band. It is gone, and it
should not come back on this page. Measured at 1440x900, four of the ten stops were taller than the
viewport; at 390x844, eight were, up to **2.48x**. Snapping a band whose bottom sits a viewport and a
half below its own snap point means the reader can never rest there — every pause near a boundary
pulls them back to the top of something they were halfway through. That is the jitter and the cut-off
content, and it is a property of the content, not a tuning problem. Proximity was already the gentle
variant; there was no gentler one left.

What a long editorial page needs instead is that a jump **lands exactly**, which is
`scroll-padding-top` on `html` and nothing else. It was previously fighting a
`scroll-mt-[calc(var(--header-h)+24px)]` on every band, and the two compounded: the container's
padding insets the scrollport while the target's margin outsets the target, so every nav jump stopped
**200px short** with the previous section still filling the top of the screen. One or the other,
never both — and the container is the right place, because it covers every anchor target including
ones added later by someone who does not know about the class.

Reading position is still stated, once: the fixed `SectionNav` down the right edge at `xl`.
`SECTION_ORDER` in `lib/site-config.ts` is its single source, and `sectionStep()` exists only to
feed it. The hero and the partner strip are excluded on purpose — they are the cover, not a
chapter. Nothing else on the page may introduce a second numbering system.

**Contrast floors (verified):** ink on cream 17.4:1 · ink-600 on cream 7.4:1 · ink on gold 11.8:1 ·
gold-600 on cream 3.6:1 (large text ≥24px only) · cream on ink 16.9:1.

## Typography

Three families, loaded through `next/font/google` with `display: "swap"` and Vietnamese subsets.

| Role             | Family           | Weights         | Usage                                                                                            |
| ---------------- | ---------------- | --------------- | ------------------------------------------------------------------------------------------------ |
| `--font-sans`    | Be Vietnam Pro   | 300/400/500/600 | Body, UI, nav, buttons. Flawless Vietnamese diacritics.                                          |
| `--font-display` | Playfair Display | 400/500 italic  | The one gold accent word per headline. Editorial lift.                                           |
| `--font-brand`   | Jost             | 300/400/500     | Wordmark, small caps labels, stat numerals. Geometric, Futura-adjacent — matches the logo's DNA. |

Type scale (fluid `clamp()`; ratio 1.25 at mobile widening to 1.333 at desktop):

```
display   clamp(2.75rem, 1.6rem + 4.4vw, 5.25rem)   / 1.04  / -0.03em
h1        clamp(2.25rem, 1.5rem + 3.0vw, 4.00rem)   / 1.08  / -0.025em
h2        clamp(1.75rem, 1.3rem + 1.9vw, 2.75rem)   / 1.14  / -0.02em
h3        clamp(1.25rem, 1.1rem + 0.7vw, 1.60rem)   / 1.25  / -0.015em
lead      clamp(1.05rem, 0.99rem + 0.3vw, 1.25rem)  / 1.62  /  0
body      1rem                                       / 1.70  /  0
small     0.875rem                                   / 1.60  /  0
eyebrow   0.75rem uppercase                          / 1.20  /  0.18em
```

Rules: headings never exceed 2 lines at desktop; measure capped at `65ch` for lead, `72ch` for
body; body weight is 400 on cream, and 300 is forbidden below 18px (renders too thin on Windows).

## Spacing System

A strict 4px base with an 8px rhythm. Only these steps exist:

```
0  4  8  12  16  20  24  32  40  48  56  64  80  96  120  160  200
```

Section vertical padding is fluid and generous — whitespace is the primary luxury signal:

```
--section-y      clamp(80px, 9vw, 160px)   standard section
--section-y-lg   clamp(96px, 11vw, 200px)  hero, CTA
--gap-card       clamp(16px, 1.6vw, 24px)  grid gutters
--radius-sm 10px  --radius-md 16px  --radius-lg 24px  --radius-xl 32px  --radius-pill 999px
```

Shadows are soft, low-opacity and warm-tinted — never neutral grey:

```
--shadow-xs   0 1px 2px rgba(13,13,13,.04)
--shadow-sm   0 2px 8px rgba(13,13,13,.05)
--shadow-md   0 10px 30px -12px rgba(13,13,13,.12)
--shadow-lg   0 28px 60px -24px rgba(13,13,13,.18)
--shadow-gold 0 16px 40px -18px rgba(176,143,78,.45)
```

## Grid System

12 columns, max content width **1280px**, gutter 24px (16px below `sm`).
Container: `w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10`.

Section column maps:

- **Hero** — the media is **full-bleed**, not a column: an absolute layer covering the right 58%
  and running off the viewport edge, with a cream scrim carrying the left third so the headline
  keeps its contrast floor. Below `lg` it becomes a full-width band under the copy — a scrim strong
  enough to make body copy legible on a phone would kill the photograph anyway. The partner panel
  is pulled up (`-mt-24` at `lg`) so it straddles the bottom edge of that media; the hero reserves
  the space with a spacer so nothing under it shifts.
- **Reason cards** — 4 up ≥`lg`, 2 up ≥`sm`, 1 up mobile.
- **Advantage cards** — 3 up ≥`lg`, 2 up ≥`sm`, 1 up mobile (6 cards total).
- **Timeline** — horizontal snap rail ≥`lg`, vertical rail below.
- **Services / Experience** — the two blocks sit side by side 6/6 ≥`xl`, stacked below.
- **Testimonials** — 3 visible ≥`lg`, 2 ≥`md`, 1 below (Embla).

Breakpoints (Tailwind defaults, used deliberately): `sm 640` `md 768` `lg 1024` `xl 1280` `2xl 1536`.

## Animation Guidelines

Framer Motion only. Motion must read as _settling into place_, never as _performing_.

- **Durations** 0.2s micro (hover), 0.5s entrance, 0.7s hero, 1.2s decorative drift. Nothing longer.
- **Easing** `[0.22, 1, 0.36, 1]` (expo-out) for entrances; `[0.4, 0, 0.2, 1]` for hovers.
- **Entrance** `opacity 0→1`, `y 16→0`. Distance never exceeds 24px. No scale-in on text.
- **Stagger** 0.07s per child, capped at 6 children; beyond that the group animates as one.
- **Viewport** `whileInView` with `once: true`, `margin: "0px 0px -12% 0px"`. Nothing re-animates
  on scroll-back — that reads as cheap.
- **Hover** translate ≤4px, scale ≤1.03, shadow up one step. Images zoom to 1.06 over 0.7s.
- **Parallax** decorative layers only, max 40px total travel, via `useScroll` + `useTransform`.

### Reduced motion — how, and the trap

The policy is set once, globally, by `MotionProvider` (`<MotionConfig reducedMotion="user">`). Motion
then withholds transform and layout animations for anyone with the preference on, leaving opacity
to cross-fade. Marquees and carousel autoplay stop via the CSS rule in `globals.css`.

**Never branch render output on `useReducedMotion()`.** It is tempting to write
`initial={prefersReducedMotion ? a : b}`, and it is a hydration bug every time: the server always
assumes "no preference", the client knows the truth, and the two disagree for exactly the users the
branch was meant to help. React then throws away the server HTML for that subtree. Declare the
animation once and let the provider remove what would move.

The two sanctioned exceptions are values bound to `style`, which `MotionConfig` does not govern:

- `HeroDecor` guards its parallax explicitly — parallax is the canonical thing the preference
  exists to suppress, and at scroll position 0 both branches render identically, so SSR is safe.
- `ScrollProgress` and the `JourneyRail` fill are left running. They are scroll-linked indicators,
  not self-playing animation; removing them would take away information rather than movement.

## Responsive Rules

Mobile-first. Four review widths: **375 / 768 / 1024 / 1440**, plus a 320px no-break check.

- No horizontal overflow at any width. `overflow-x-clip` on the page shell; every decorative
  absolute element lives inside a `relative overflow-hidden` parent.
- No layout shift: every media box declares an aspect ratio; fonts use `display: swap` with metric
  fallbacks; the sticky header reserves its own height.
- Touch targets ≥44×44px. Tap states, not hover states, drive mobile affordance.
- Horizontal rails (timeline, services) become vertical stacks or snap-scrollers below `lg`.
- Type never below 14px; line length never above 72ch at any width.

## Accessibility Rules

Target: WCAG 2.2 AA.

- Semantic landmarks: one `<header>`, one `<main>`, one `<footer>`; every band is a `<section>`
  with `aria-labelledby` pointing at its real heading id.
- Exactly one `<h1>` per page; heading levels never skip.
- Skip link is the first focusable element.
- Visible focus ring everywhere: `focus-visible:ring-2 ring-gold ring-offset-2`. Never
  `outline: none` without a replacement.
- Carousels: real `<button>` controls with `aria-label`, `aria-live="polite"` on the slide region,
  keyboard arrows, autoplay pauses on hover **and** on focus.
- Mobile menu is a focus-trapped Radix dialog with `Esc` to close and scroll lock.
- Decorative art is `aria-hidden="true"`; meaningful media gets `alt` that states content, not
  "image of".
- Icons never carry meaning alone — always paired with a text label.
- `prefers-reduced-motion` honoured; `lang` follows the active locale.

## Folder Structure

Locale is a **route segment**, so the root layout lives inside `app/[locale]/` (the pattern the
Next docs prescribe for i18n). Both locales are prerendered by `generateStaticParams`; `proxy.ts`
redirects unprefixed paths.

```
/app                     App Router. Server components by default.
  /[locale]
    layout.tsx           Root layout: fonts, <html lang>, metadata, header/footer shell
    page.tsx             Homepage — composition only, zero markup logic
    not-found.tsx        Branded 404, rendered inside the real chrome
    /[...slug]/page.tsx  Catch-all → notFound(), so misses keep the layout
  globals.css            Tailwind v4 @theme tokens + base layer
  sitemap.ts robots.ts   SEO endpoints
/proxy.ts                Locale redirect (Next 16's renamed middleware)
/components
  /layout                Navbar, MobileNav, Footer, LocaleSwitcher, SkipLink
  /sections              One file per homepage band (see Pages)
  /ui                    Design-system primitives, no business logic
/content                 Locale dictionaries (vi, en) + the SiteContent contract
/data                    Locale-keyed mock records: services, testimonials, partners, timeline…
/hooks                   use-media-query, use-mounted, use-scroll-spy
/lib                     cn(), motion presets, site config, icon map
/public                  Static assets, favicon, og image
/types                   Shared TypeScript contracts
/design-reference        Source brand sheet + layout reference (not shipped)
```

## Coding Convention

- **Server-first.** A component only gets `"use client"` if it needs state, effects, refs, browser
  APIs, or Framer Motion. Client boundaries are pushed as deep as possible: a section stays a
  server component and delegates its animated shell to a small client child.
- **No giant page.** `app/page.tsx` is a list of section components. Any component over ~180 lines
  gets decomposed. Any repeated markup becomes a `/ui` primitive.
- **Props over conditionals.** Variants come from `class-variance-authority`, never from
  `className={cond ? "…" : "…"}` chains.
- **Typed everything.** No `any`. Data shapes live in `/types` and are imported by both the data
  file and the component that renders it, so a data change is a compile error, not a runtime bug.
- **Class merging** always through `cn()` (`clsx` + `tailwind-merge`) so caller classes win.
- **No magic values.** Colors, radii, shadows, durations come from tokens. A raw hex in a
  component is a bug.
- **Imports** ordered: react → next → third-party → `@/` aliases → relative → types. Absolute
  `@/` imports only; no `../../..`.
- **Accessibility is part of the component**, not a later pass.

## Naming Convention

| Thing               | Convention                              | Example                        |
| ------------------- | --------------------------------------- | ------------------------------ |
| Component file      | `PascalCase.tsx`                        | `JourneyTimeline.tsx`          |
| Primitive file      | `kebab-case.tsx`                        | `section-heading.tsx`          |
| Hook                | `use-kebab-case.ts`                     | `use-media-query.ts`           |
| Data / lib / types  | `kebab-case.ts`                         | `site-config.ts`               |
| Component / type    | `PascalCase`                            | `ServiceCard`, `Testimonial`   |
| Variable / function | `camelCase`                             | `activeIndex`, `formatPhone()` |
| Constant collection | `SCREAMING_SNAKE`                       | `NAV_LINKS`                    |
| Boolean prop        | `is/has/should` prefix                  | `isActive`, `hasBorder`        |
| Handler prop / fn   | `onX` / `handleX`                       | `onSelect` / `handleSelect`    |
| CSS token           | `--color-*`, `--shadow-*`, `--radius-*` | `--color-gold`                 |
| Section id (anchor) | `kebab-case`, stable                    | `#hanh-trinh`                  |

## Reusable Components

**`/ui` primitives**

| Component                          | Responsibility                                                                                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                           | cva variants `primary` (gold) · `dark` (ink) · `outline` · `ghost` · `whatsapp`; sizes `sm/md/lg`; `asChild` via Radix Slot; built-in arrow slide on hover. |
| `Container`                        | The single source of page gutter + max width.                                                                                                               |
| `Section`                          | `<section>` + `aria-labelledby` + vertical rhythm + tone (`cream`/`cream300`/`surface`/`ink`/`gold`).                                                       |
| `SectionHeading`                   | Title (with gold accent word) + optional lead + optional action. No kicker — see "Section numbering".                                                       |
| `Card`                             | cva variants `surface` · `cream` · `quiet` · `gold` · `ink`, hover elevation. At most one `gold` per grid — it is the eye's landing point.                  |
| `Accordion`                        | Radix wrapper. Roles, `aria-expanded` and roving focus come free; this supplies the skin and the plus→cross rotation only.                                  |
| `Reveal`                           | The one entrance-animation wrapper. Viewport, stagger index, reduced motion.                                                                                |
| `Marquee`                          | Duplicated-track infinite scroller. Pause on hover/focus, reduced-motion safe.                                                                              |
| `Media`                            | Renders `next/image` when a `src` exists, otherwise the generated brand plate. Locked aspect ratio, hover zoom, rounded mask.                               |
| `MediaPlate`                       | The generated art: seeded warm gradient mesh + gold arcs + grain + subject glyph.                                                                           |
| `Logo`                             | Inline SVG `icon` / `wordmark` / `lockup` at three sizes.                                                                                                   |
| `IconTile`, `Rating`, `SocialIcon` | Small repeated atoms.                                                                                                                                       |

**`ConsultationLink`** — the "free consultation" buttons in the header, the hero and the mobile
drawer. All three are real anchors to the closing band, so they survive without JavaScript,
middle-click into a new tab and copy as links; the smooth scroll is the browser's and `scroll-mt`
on the band keeps the heading clear of the sticky header. The one thing added on top is that focus
lands in the first field, via `CONSULTATION_FIELD_ATTR`, so a visitor can type the moment the page
settles instead of tabbing there from the top — `focus({ preventScroll: true })` is what makes that
compatible with the scroll, since a plain `focus()` jumps instantly and cancels it.

There was briefly a dialog here instead. It is not coming back: the form is the end of the page's
argument, and a modal that skips the argument also skips the reason to fill it in.

**`ConsultationSent`** — the confirmation that replaces the form's fields inside the same card
once a request is written. A gold hairline ring closes, an ink tick strokes inside it, one halo
breathes outward and is gone; then the copy and a three-step "what happens next" settle in. The
mark is a seal on a signed record, not a notification badge — the second the check turns into a
green circle the whole page drops a tier.

Two things it must keep. **The draw is CSS, not Motion** (`--animate-seal-*` in `globals.css`):
`MotionConfig reducedMotion="user"` withholds a Motion animation's target, which for a stroke-dash
draw leaves an empty ring and no tick for exactly the users the preference protects, whereas a CSS
animation with `forwards` collapses to its drawn final frame under the reduce block. Same trap as
the intro's type reveal. And **it may only promise what Handle actually does** — no reference code
for a row the insert never reads back.

The ring's dash length is its circumference (r=43 → 271); change `r` and the keyframe in
`globals.css` changes with it.

**Wayfinding layer** — three pieces whose only job is making a long page legible:
`ScrollProgress` (2px gold rule, how far is left), `SectionNav` (fixed index down the right edge
at `xl`, which part am I in, labels on hover/focus, `aria-current` for assistive tech) and
`FloatingContact` (holds the conversion path open once the hero's CTA has scrolled away).

**`IntroCurtain` + `IntroMark`** — the brand intro, and the one piece of theatre on the site. The
H settles in, the open hand flies in from the left and completes the mark, then the wordmark and
tagline fade up quickly beneath it. The whole timeline lives in one `TIMING` object; edit the steps
together, because nudging a single delay in isolation is how an intro ends up ragged.

`IntroMark` rebuilds the supplied artwork (`Intro/logo intro.png`) so its parts can move: the bars
are vector paths measured off the original (76 × 361 units, outer corners `r=30`, inner square),
the hand is a transparent cut-out at `public/intro/hand.png` carrying the logo's cream knockout
ring, and the type is sized from the artwork's own ratios. Two constraints follow:

- **The curtain background stays a flat field.** The knockout ring is baked into the PNG as flat
  cream, so any tint behind the mark — a bloom, a gradient — turns it into a visible outline.
- **The type reveals with opacity and nothing else.** A sliding cover, a clip-path wipe, a
  translate: all of them are withheld by `MotionProvider` under reduced motion, which would leave
  the words hidden for exactly the users that setting protects. A fade is the one reveal that
  cannot fail that way.

Rules the curtain must keep: once per session (`sessionStorage`, read by an inline script before
first paint so a returning visitor never catches a frame), skippable by any click or key, hidden
entirely without JavaScript (`<noscript>` rule), and bypassable with `?intro=off` so screenshot and
end-to-end runners capture the page rather than whichever frame they landed on. It covers content,
it never gates it — the page is fully rendered underneath the whole time.

Note the mark here is **not** the same drawing as `ui/logo.tsx`, which the header and footer use:
that one is the thin-stroke H from the brand sheet, this one is the solid-slab H with the hand.
They are two different logos in two different palettes; unify them before launch.

**Component tree**

```
<RootLayout>
 ├ MotionProvider ──────── reducedMotion="user" for the whole tree
 ├ IntroCurtain ───────── IntroMark (hand flies in) · type fades up · curtain rises
 ├ SkipLink
 ├ ScrollProgress ──────── gold rule, scroll-linked
 ├ Navbar ── Logo · NavLinks · LocaleSwitcher · ConsultationLink · MobileNav(Dialog)
 ├ SectionNav ─────────── 8 dots · hover labels · aria-current   (xl only)
 ├ main
 │  ├ Hero ─────────────── headline · lead · ConsultationLink + anchor · TrustStrip · full-bleed Media
 │  ├ PartnerCarousel ──── Marquee × PartnerLogo   (overlaps the hero bottom)
 │  ├ 01 WhyVietnam ────── SectionHeading · ReasonCard × 4 (one gold)
 │  ├ 02 AboutHandle ───── INK panel · Media · copy · proof pills · Button
 │  ├ 03 WhyChooseUs ───── SectionHeading · AdvantageCard × 6
 │  ├ 04 JourneyTimeline ─ rail · TimelineStep × 9 · animated progress line · Button
 │  ├ 05 StatsBand ─────── GOLD band · StatCounter × 4
 │  ├ 06 ServicesAndLifestyle
 │  │    ├ MedicalServices ───── ServiceCard × 6
 │  │    └ LifestyleExperience ─ ExperienceCard × 6
 │  ├ 07 Testimonials ──── Embla · TestimonialCard × 6 · dots · arrows
 │  ├ 08 Faq ──────────── Accordion × 6 · sticky ink help card
 │  └ CtaBanner ────────── INK · headline · ConsultationForm ⇄ ConsultationSent (seal)
 ├ Footer ── Logo · 4 link columns · contact · socials · legal
 └ FloatingContact ─────── WhatsApp, appears past 700px of scroll
```

## Pages

| Route                         | Purpose                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `/`                           | The full narrative homepage described above. The only page with content today. |
| `not-found`                   | Branded 404 with routes back to the homepage and to consultation.              |
| `/sitemap.xml`, `/robots.txt` | Generated by App Router file conventions.                                      |

Reserved for phase 2 (nav anchors point at homepage sections until these exist): `/gioi-thieu`,
`/dich-vu/[slug]`, `/hanh-trinh`, `/doi-tac`, `/cau-chuyen`, `/faq`, `/lien-he`.

## SEO Strategy

- Metadata API in `app/layout.tsx`: `metadataBase`, title template `%s · Handle`, description,
  keywords, `openGraph` (type/locale/siteName/images 1200×630), `twitter: summary_large_image`,
  `robots` with `max-image-preview: large`, canonical + `hreflang` via `alternates`.
- `lang="vi"` on `<html>`; `vi` and `en` alternates declared.
- Structured data (JSON-LD) in the layout: `Organization` + `MedicalBusiness` with address, phone,
  `sameAs` socials, and `AggregateRating` derived from the testimonials data.
- One `<h1>` carrying the primary phrase; section `<h2>`s carry secondary intent
  ("điều trị tại Việt Nam", "chi phí y tế Việt Nam", "hành trình khám chữa bệnh").
- Semantic anchors with human-readable Vietnamese slugs — these become real URLs in phase 2.
- `sitemap.ts` and `robots.ts` generated at build; every image has descriptive alt text.

## Performance Strategy

Budget: **LCP < 2.0s**, **CLS < 0.02**, **INP < 150ms**, first-load JS **< 130KB gzip**.

- Server components by default; `"use client"` only at leaves. The homepage ships as mostly static
  HTML.
- Below-the-fold, animation-heavy sections (`JourneyTimeline`, `LifestyleExperience`,
  `Testimonials`) are loaded with `next/dynamic` so Embla and their motion code stay out of the
  initial bundle.
- Framer Motion is imported per-component, never globally.
- `Reveal` uses `whileInView` + `once: true` → observers detach after firing.
- Marquee runs on a CSS keyframe transform (compositor-only), not a JS tick.
- Data is static and tree-shaken at build; no client fetching, no state library, no context
  re-renders outside the locale provider (which stores a primitive and memoises its value).
- `next/font` self-hosts all three families with `swap`; only above-the-fold faces preload.
- Turbopack builds (Next 16 default); no custom webpack config to keep that path clean.

## Image Optimization

- All raster media goes through `next/image` — never a bare `<img>`.
- `priority` on the hero only; everything else lazy by default.
- Explicit `sizes` on every `fill` image so the browser never over-downloads
  (e.g. `sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 640px"`).
- AVIF then WebP via `next.config.ts` `images.formats`; `deviceSizes` trimmed to the widths this
  layout actually uses. Note Next 16 defaults: `qualities: [75]` and `minimumCacheTTL: 4h` — both
  set explicitly here so the intent is visible.
- Every media box has a locked `aspect-ratio` and a warm cream placeholder → zero CLS.
- **The photographs are placeholders, not licensed brand photography.** Fourteen CC0 images sit in
  `public/images/photos/`, cropped to the ratio their slot declares and given one shared warm grade
  so unrelated sources read as a set. `PHOTO-CREDITS.md` records where each came from. Replace them
  with commissioned work before launch — they show the layout with real media in it, they do not
  depict Handle.
- **Everything else still falls back to `MediaPlate`** — a seeded, brand-palette SVG composition at
  the exact aspect ratio the photograph will occupy. Drop `src` from a record and `Media` returns to
  the plate without the layout moving a pixel; add one and it switches to `next/image` the same way.
- **`alt` describes the photograph, not the brief.** While a slot was empty its `alt` doubled as the
  art direction for the shot that would fill it. Once a real `src` lands, that has to become a
  description of what is actually in the frame — a screen reader reads the file that shipped, not
  the one that was planned.
- **Testimonial media stays abstract on purpose.** A real, identifiable face beside an invented
  quote presents that person as having said something they did not. Plates until there are consenting
  patients.
- Remote hosts must be allow-listed in `next.config.ts` `images.remotePatterns` before use.

## Future CMS Integration

The data layer is already shaped like a CMS response, which is the point.

- Every record in `/data` is a plain typed object with a stable `id`/`slug` and no JSX. Icons are
  referenced by a string key resolved through `lib/icon-map.ts`, so a CMS stores `"shield-check"`
  rather than a React node.
- Content is keyed by locale: `Record<Locale, T[]>`. Adding a language is adding a key.
- Access goes through thin selectors (`getServices(locale)`), so swapping the body for
  `fetch()` / `sanityClient.fetch()` is a one-file change per collection — components untouched.
- Recommended target: **Sanity** (or Payload) with document types mirroring `/types/index.ts`
  one-for-one: `service`, `experience`, `partner`, `journeyStep`, `testimonial`, `advantage`,
  `reason`, `navLink`, `siteSettings`.
- Media becomes `{ src, alt, blurDataURL, width, height }` on each record — `Media` already
  accepts exactly that shape.
- Revalidation plan: ISR via `export const revalidate = 3600` on the page plus an on-publish
  webhook hitting `revalidateTag(tag, 'max')` (Next 16 requires the second argument).
- Phase-2 routes (`/dich-vu/[slug]`) become `generateStaticParams()` over the same collections.
