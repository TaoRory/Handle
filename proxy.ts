import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { DEFAULT_LOCALE } from "@/content";
import { LOCALES } from "@/types";

/**
 * Locale routing and Supabase Session Handling.
 *
 * Every page lives under `/[locale]`, so a request without a prefix is
 * redirected to the visitor's best match from `Accept-Language`, falling back
 * to Vietnamese.
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

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Cập nhật cookies vào request hiện tại để Server Components phía sau đọc được ngay lập tức
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

          // Đính kèm cookies cập nhật vào response trả về cho trình duyệt (áp dụng an toàn cho cả next() và redirect())
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  // Skip Next internals, metadata routes and anything with a file extension.
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};