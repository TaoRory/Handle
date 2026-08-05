# Handle — Luxury Medical Concierge

> **You heal. We handle the rest.**
> Healthcare in Vietnam. Handled.

A production-quality marketing site for **Handle**, a medical-concierge operator that coordinates
treatment in Vietnam for international patients. Bilingual (Vietnamese / English), statically
rendered, and built to the brand guideline in [`design-reference/`](design-reference/).

---

## Project Overview

The homepage is one narrative funnel rather than a stack of unrelated blocks. Each reading band is
numbered, and its surface tone marks where one part ends and the next begins:

| Band                        | Surface     | Job                                                                                |
| --------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| **Hero**                    | cream       | The promise, two CTAs, four trust chips. Media runs full-bleed off the right edge. |
| **Partner carousel**        | white panel | Borrowed credibility, on a panel that straddles the hero's bottom edge.            |
| **01 Why Vietnam**          | cream       | The tension — four reasons, with the answer filled gold.                           |
| **02 About Handle**         | **ink**     | The turn — what a coordinated journey actually looks like.                         |
| **03 Why choose us**        | white       | Six commitments, one per objection.                                                |
| **04 Journey timeline**     | cream       | The mechanism — nine steps, horizontal at `lg`, vertical below.                    |
| **05 By the numbers**       | **gold**    | Four figures that count up as they scroll into view.                               |
| **06 Services + Lifestyle** | white       | Proof, clinical and non-clinical, side by side from `xl`.                          |
| **07 Testimonials**         | cream-300   | Social proof. Embla carousel, keyboard + screen-reader ready.                      |
| **08 Questions**            | white       | Accordion, plus a sticky ink card for anything it misses.                          |
| **CTA banner**              | **ink**     | The ask.                                                                           |

Three surfaces are loud — ink, gold, ink — spaced so that no two ever sit next to each other.
Alongside them a wayfinding layer keeps the long scroll legible: a gold **scroll-progress rule**, a
fixed **section index** down the right edge at `xl` (labels on hover, `aria-current` for assistive
tech), and a **floating WhatsApp button** that appears once the hero's CTA has scrolled away.

### The intro

On the first visit of a session the site opens with a short brand animation: the two slabs of the
**H** settle in, the open hand flies in from the left and lands across them — completing the mark —
and then `HANDLE` and the tagline fade up beneath it. The type runs quicker than the mark on
purpose: the hand is the thing to watch, the words only need to arrive.

The mark is rebuilt from `Intro/logo intro.png`. That file is a flat raster, so nothing in it can
move on its own: the two bars are redrawn as vector paths measured off the original (76 units wide,
361 tall, outer corners `r=30`, inner corners square), and the hand is extracted from the PNG as a
transparent cut-out — including the cream knockout ring the logo puts between the hand and the
bars — into `public/intro/hand.png`. Type sizes are derived from the artwork rather than picked:
there the wordmark's cap height is 0.32 of the H's, and the word runs about 2.5× the H's width.

Because that knockout ring is baked into the PNG as flat cream, the curtain behind the mark has to
stay a flat field. Anything that tints it — a bloom, a gradient — turns the ring into a visible
outline instead of letting it disappear into the page.

The two lines of type reveal with opacity and nothing else. A sliding cover, a clip-path wipe or a
translate would all be withheld by `MotionProvider` under reduced motion, leaving the words hidden
for exactly the users that setting protects; a fade is the one reveal that cannot fail that way.

It is deliberately unobtrusive:

- **Once per session** — the flag lives in `sessionStorage`, and an inline script reads it before
  first paint, so a returning visitor never sees a frame of it.
- **Always skippable** — any click, any key, or the skip button.
- **Reduced motion** — no movement at all; the mark simply fades up.
- **No JavaScript** — the curtain is removed outright by a `<noscript>` rule.
- **`?intro=off`** — bypasses it, so screenshot and end-to-end runs capture the page rather than a
  random frame of the animation.

The whole timeline lives in one `TIMING` object in `IntroCurtain`, including a full second of
stillness after the tagline lands so the lockup can actually be read before the curtain lifts.
The two lines of type share one delay — they are one lockup, and staggering them made the tagline
read as an afterthought. End to end the intro runs about 3.6s.

It covers the page, it never gates it: the content is fully rendered underneath the whole time, so
crawlers are unaffected. The tradeoff is real, though — on a first visit the visitor waits those
3.6s before they see the page, and the largest contentful paint lands on the intro wordmark rather
than the hero. That is a deliberate call for a brand site, and the reason it never repeats within
a session. Shorten `INTRO_DURATION_MS` if that trade stops being worth it.

Design intent, tokens, motion rules and conventions are specified in **[`CLAUDE.md`](CLAUDE.md)** —
read that before changing anything visual. It is the source of truth; this file is the operator's
manual.

### What is real, and what is placeholder

Everything is production-shaped, but three things are deliberately stand-ins:

- **Photography.** No licensed images ship with this repo. `Media` renders `MediaPlate` — a seeded,
  brand-palette composition (gradient mesh, gold arc, grain, subject glyph) at the exact aspect
  ratio the photograph will occupy. Adding `src` to a record in `/data` switches that slot to
  `next/image` with **zero layout movement**. Each record's `alt` is written as the art-direction
  brief for whoever shoots or sources the real thing.
- **Partner names.** Illustrative placeholders drawn as typographic monograms. No real hospital's
  name or trademark is reproduced. Replace with licensed marks before launch.
- **Testimonials and contact details.** Sample content. Replace with consented, verifiable quotes
  and real contact information.

---

## Tech Stack

| Layer      | Choice                                                 | Why                                                         |
| ---------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| Framework  | **Next.js 16** (App Router, Turbopack)                 | Server components by default; both locales prerender static |
| Language   | **TypeScript 5** (strict)                              | Content shapes are compile-time contracts                   |
| Styling    | **Tailwind CSS v4**                                    | Design tokens declared once in `@theme`                     |
| Primitives | **Radix UI** + `cva` + `tailwind-merge`                | shadcn/ui conventions, hand-authored for this design system |
| Motion     | **Framer Motion 12**                                   | Viewport reveals, scroll progress, reduced-motion fallbacks |
| Carousel   | **Embla** + autoplay plugin                            | Small, accessible, no layout thrash                         |
| Icons      | **lucide-react**                                       | Referenced by string key through `lib/icon-map.ts`          |
| Fonts      | `next/font` — Be Vietnam Pro · Playfair Display · Jost | Self-hosted; full Vietnamese diacritics                     |

Runtime requirements: **Node.js ≥ 20.9** (the Next 16 minimum), npm 10+.

---

## Folder Structure

```
app/
  [locale]/              Root layout lives here — locale is a route segment
    layout.tsx           Fonts, <html lang>, metadata, header/footer shell
    page.tsx             Homepage — composition only, no markup logic
    not-found.tsx        Branded 404, rendered inside the real chrome
    [...slug]/page.tsx   Catch-all → notFound(), so misses keep the layout
  globals.css            Tailwind v4 @theme tokens + base layer
  sitemap.ts robots.ts   Generated SEO endpoints
components/
  layout/                Navbar, MobileNav, LocaleSwitcher, Footer, SkipLink,
                         IntroCurtain, IntroMark, MotionProvider,
                         ScrollProgress, SectionNav
  sections/              One file per homepage band
  ui/                    Design-system primitives (no business logic)
content/                 vi.ts · en.ts dictionaries + the SiteContent contract
data/                    Locale-keyed records + thin selectors (getServices…)
hooks/                   use-media-query, use-scroll-spy
lib/                     cn(), motion presets, site config, icon map, JSON-LD
types/                   Shared TypeScript contracts
public/                  Static assets
design-reference/        Brand sheet + layout reference (not shipped)
proxy.ts                 Locale redirect (Next 16's renamed middleware)
```

**The rule that matters:** no marketing copy lives inside a component. Strings come from
`/content`, records come from `/data`, and both are keyed by locale.

---

## How to Run

```bash
npm install                   # Node 20.9+ required
cp .env.example .env.local    # optional; sensible defaults exist
npm run dev                   # http://localhost:3000  →  redirects to /vi
```

`/` redirects to the best `Accept-Language` match, falling back to `/vi`.

### Scripts

| Command              | What it does                                             |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | Dev server (Turbopack)                                   |
| `npm run build`      | Production build; prerenders `/vi` and `/en`             |
| `npm start`          | Serve the production build                               |
| `npm run lint`       | ESLint (flat config). `next lint` was removed in Next 16 |
| `npm run type-check` | `tsc --noEmit`                                           |
| `npm run check`      | Lint + type-check — run this before every commit         |
| `npm run format`     | Prettier, with Tailwind class sorting                    |

`lint`, `type-check` and `build` all pass clean.

---

## How to Deploy to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, **Add New → Project** and import it. The Next.js preset is detected automatically;
   build command `npm run build`, output handled for you. No overrides needed.
3. Deploy. `proxy.ts` handles the locale redirect on the request path — nothing to configure.
4. After attaching a custom domain, edit `SITE_URL` in `lib/site-config.ts` to match it and
   redeploy so the canonical tags follow. It is code and not an environment variable on purpose:
   the previous arrangement left `NEXT_PUBLIC_SITE_URL` set to a domain that had stopped
   resolving, and every canonical, `hreflang` and sitemap entry on the live site pointed there —
   which reads to a crawler as "index that origin instead of this one".
5. Point the `www` host at the apex as a redirect. Two hosts serving the same site split its
   signals; one host that does not resolve at all loses whatever links reach it.

Any Node host works too: `npm run build && npm start`. There is no database, no API and no runtime
secret — the site is static apart from the locale redirect and the 404 catch-all.

---

## Environment Variables

| Variable                               | Required | Default | Used by                                                          |
| -------------------------------------- | -------- | ------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No       | —       | Search Console ownership `<meta>`, omitted entirely when unset   |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | No       | —       | Bing Webmaster ownership `<meta>`, same                          |
| `NEXT_PUBLIC_SUPABASE_URL`             | No       | —       | Consultation form writes, Supabase session refresh in `proxy.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`        | No       | —       | As above                                                         |

The canonical origin is **not** here — it is `SITE_URL` in `lib/site-config.ts`. See step 4 above
for why.

Copy `.env.example` to `.env.local` for local overrides. Nothing here is secret — every value is
public by design, hence the `NEXT_PUBLIC_` prefix.

The Supabase pair is optional: leave both unset and the site runs normally, with the consultation
form reporting a failure instead of writing a row. Set **both or neither** — half-configured is the
one state that is not handled.

> **Before pointing this at a real project:** the anon key ships in the browser bundle, so what
> actually protects submitted data is the Row Level Security policy on `consultation_requests`.
> Confirm anon is granted `INSERT` and nothing else. Without that, anyone holding the public key can
> read every consultation request — which here means names, phone numbers and free-text descriptions
> of people's medical needs.

---

## Accessibility & Performance Notes

- WCAG 2.2 AA target: landmarks with `aria-labelledby`, one `<h1>`, skip link, visible focus rings,
  44px touch targets, contrast floors documented in `CLAUDE.md`.
- The carousel exposes real buttons, arrow-key navigation and a polite live region, and pauses
  autoplay on hover **and** on focus.
- `prefers-reduced-motion` is honoured everywhere — transforms collapse to a short opacity fade,
  and the marquee and autoplay stop.
- Server components by default; `JourneyTimeline`, `ServicesAndLifestyle` and `Testimonials` load
  via `next/dynamic` so their motion and carousel code stays out of the first load.
- The marquee animates a CSS keyframe transform (compositor-only), not a JS tick.
- Every media box declares its aspect ratio, so there is no layout shift when photography lands.

---

## Future Improvements

1. **Real photography.** Add `src`, `width`, `height` and `blurDataURL` to each record's `media`
   object and allow-list the host in `next.config.ts` → `images.remotePatterns`. No component
   changes; `MediaPlate` bows out automatically.
2. **CMS.** The data layer is already CMS-shaped: plain typed records, string icon keys, thin
   selectors. Point `getServices()` and friends at Sanity or Payload with document types mirroring
   `types/index.ts` one-for-one, then add ISR (`revalidate`) plus an on-publish webhook calling
   `revalidateTag(tag, 'max')` — note Next 16 requires that second argument.
3. **Phase-2 routes.** `/gioi-thieu`, `/dich-vu/[slug]`, `/hanh-trinh`, `/faq`, `/lien-he`. The nav
   already uses stable Vietnamese slugs; `SECTION_IDS` in `lib/site-config.ts` is the single place
   to repoint anchors at real URLs.
4. **Harden the consultation form.** The Server Action and per-field validation are in; what is
   still missing is spam protection — the form is public and writes straight to the database with
   no rate limit, captcha or honeypot. Add one before launch, along with the RLS check described
   under Environment Variables. This is health data; treat the transport and the table accordingly.
5. **Analytics and Core Web Vitals** via `useReportWebVitals`, plus a Lighthouse CI budget gate
   matching the targets in `CLAUDE.md` (LCP < 2.0s, CLS < 0.02, INP < 150ms).
6. **A third locale.** Add `content/<locale>.ts`, one key per collection in `/data`, and one entry
   in `LOCALES`. Routing, `hreflang`, the sitemap and the switcher pick it up with no further
   changes.
7. **Visual regression tests** (Playwright screenshots at 375 / 768 / 1024 / 1440) and an axe pass
   in CI, so the design system cannot drift silently.
