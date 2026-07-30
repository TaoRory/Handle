import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE } from "@/content";

import { LOCALES } from "@/types";

/**
 * Locale routing.
 *
 * Every page lives under `/[locale]`, so a request without a prefix is
 * redirected to the visitor's best match from `Accept-Language`, falling back
 * to Vietnamese. Renamed from `middleware` per the Next 16 convention.
 */
function resolveLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  const match = preferred.find((entry) =>
    (LOCALES as readonly string[]).includes(entry.tag),
  );

  return match?.tag ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${resolveLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, metadata routes and anything with a file extension.
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
