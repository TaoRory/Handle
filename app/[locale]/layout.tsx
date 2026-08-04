import { Be_Vietnam_Pro, Jost, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";

import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { INTRO_SESSION_KEY, IntroCurtain } from "@/components/layout/IntroCurtain";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SectionNav } from "@/components/layout/SectionNav";
import { SkipLink } from "@/components/layout/SkipLink";
import { getContent, isLocale } from "@/content";
import { sectionStep, siteConfig } from "@/lib/site-config";

import { LOCALES, type Locale } from "@/types";

import "@/app/globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 *  Fonts — self-hosted by next/font, no request ever leaves the origin.
 * ------------------------------------------------------------------ */

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
  // Brand furniture only — never the LCP element, so it need not preload.
  preload: false,
});

/* ------------------------------------------------------------------ *
 *  Static params — both locales are prerendered at build time.
 * ------------------------------------------------------------------ */

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * The share card. Rendered from the real page at 1200x630 so the wordmark and
 * both display faces are the ones the site actually ships, not a rasteriser's
 * substitutes. Regenerate it if the hero photograph or the headline changes.
 */
const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Handle — Chăm sóc sức khỏe tại Việt Nam. Handled.",
};

export const viewport: Viewport = {
  themeColor: "#F6F3EE",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const content = getContent(locale);
  const title =
    locale === "vi"
      ? "Chăm sóc sức khỏe tại Việt Nam. Handled."
      : "Healthcare in Vietnam. Handled.";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${title}`,
      template: `%s · ${siteConfig.name}`,
    },
    description: content.hero.lead,
    applicationName: siteConfig.name,
    keywords:
      locale === "vi"
        ? [
            "điều trị tại Việt Nam",
            "du lịch y tế Việt Nam",
            "chi phí y tế Việt Nam",
            "concierge y tế",
            "bệnh viện quốc tế Việt Nam",
          ]
        : [
            "medical tourism Vietnam",
            "healthcare in Vietnam",
            "medical concierge",
            "treatment abroad",
            "international hospitals Vietnam",
          ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        vi: "/vi",
        en: "/en",
        "x-default": "/vi",
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: content.htmlLang.replace("-", "_"),
      url: `${siteConfig.url}/${locale}`,
      title: `${siteConfig.name} — ${title}`,
      description: content.hero.lead,
      images: [OG_IMAGE],
    },
    twitter: {
      // Declaring the large card without an image is worse than declaring
      // nothing: the platforms render the empty frame rather than falling back
      // to a text card. This site is shared person to person, so the preview is
      // often the first thing anyone sees of it.
      card: "summary_large_image",
      title: `${siteConfig.name} — ${title}`,
      description: content.hero.lead,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    // No `icons` here on purpose: `app/icon.svg`, `app/apple-icon.png` and
    // `app/favicon.ico` are picked up by the file convention, and declaring the
    // field manually would override all three with whatever it lists.
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale as Locale);

  return (
    <html
      lang={content.htmlLang}
      data-scroll-behavior="smooth"
      className={`${beVietnam.variable} ${playfair.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        {/* Runs before first paint: if the intro already played this session,
            flag the document so CSS hides the curtain and no frame of it can
            flash while React hydrates. Paired with the `<noscript>` rule below
            so a visitor without JavaScript never sees a curtain at all. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem(${JSON.stringify(
              INTRO_SESSION_KEY,
            )})==="1")document.documentElement.classList.add("intro-played")}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`#intro-curtain{display:none !important}`}</style>
        </noscript>

        <MotionProvider>
          <IntroCurtain
            skipLabel={content.intro.skip}
            loadingLabel={content.intro.loading}
            markLabel={content.intro.mark}
          />

          <SkipLink label={content.a11y.skipToContent} />
          <ScrollProgress />

          <Navbar
            locale={locale as Locale}
            links={content.nav.links}
            ctaLabel={content.nav.cta}
            navLabel={content.nav.navLabel}
            homeLabel={content.nav.homeLabel}
            menuLabel={content.nav.menuLabel}
            closeLabel={content.nav.closeLabel}
            localeLabel={content.nav.localeLabel}
          />

          <SectionNav
            label={content.sectionNav.label}
            items={content.sectionNav.items.map((item) => ({
              ...item,
              step: sectionStep(item.id),
            }))}
          />

          <main id="main">{children}</main>

          <Footer content={content} />

          <FloatingContact copy={content.floatingContact} />
        </MotionProvider>
      </body>
    </html>
  );
}
