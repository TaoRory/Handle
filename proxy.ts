import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { DEFAULT_LOCALE } from "@/content";
import { LOCALES } from "@/types";

/**
 * Locale routing, plus Supabase session refresh when Supabase is configured.
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

/**
 * Refresh the Supabase auth cookie, if there is a Supabase to talk to.
 *
 * The guard is not defensive tidiness — without it the whole site 500s. This
 * runs on every matched request, and `createServerClient` throws when the URL
 * or key is missing, so an unset environment variable took down every page
 * rather than just the consultation form. A build passes either way, which is
 * what makes it easy to miss.
 *
 * Worth revisiting: the site has no sign-in of any kind, so this round-trip to
 * Supabase currently buys nothing and costs latency on every page view. Keep it
 * only if accounts are actually coming.
 */
async function refreshSession(request: NextRequest, response: NextResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Write to the incoming request too, so Server Components rendered
        // after this see the refreshed cookie immediately.
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

        // And onto the outgoing response, which is safe for both next() and
        // redirect().
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  await supabase.auth.getUser();
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response: NextResponse;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    response = NextResponse.next({ request });
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/${resolveLocale(request)}${pathname === "/" ? "" : pathname}`;
    response = NextResponse.redirect(url);
  }

  await refreshSession(request, response);

  return response;
}

export const config = {
  // Skip Next internals, metadata routes and anything with a file extension.
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
