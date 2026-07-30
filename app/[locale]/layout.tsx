import { Be_Vietnam_Pro, Jost, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import { getContent, isLocale } from "@/content";
import { siteConfig } from "@/lib/site-config";

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
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${title}`,
      description: content.hero.lead,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: { icon: "/favicon.ico" },
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
        <SkipLink label={content.a11y.skipToContent} />

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

        <main id="main">{children}</main>

        <Footer content={content} />
      </body>
    </html>
  );
}
