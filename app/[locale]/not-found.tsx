import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowTrail } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-heading";
import { DEFAULT_LOCALE, getContent } from "@/content";
import { contactLinks } from "@/lib/site-config";

/**
 * Branded 404.
 *
 * Reached via the `[...slug]` catch-all, so it renders inside the locale
 * layout with the real header and footer. `not-found.tsx` receives no params
 * of its own, so the body copy falls back to the default locale — the chrome
 * around it is still in the visitor's language.
 */
export default function NotFound() {
  const content = getContent(DEFAULT_LOCALE);

  return (
    <div className="flex min-h-[70vh] items-center py-24">
      <Container>
        <div className="flex max-w-[52ch] flex-col gap-6">
          <Eyebrow>404</Eyebrow>

          <h1 className="text-h1 text-ink">{content.notFound.title}</h1>

          <p className="text-ink-600 text-lead">{content.notFound.lead}</p>

          <div className="mt-2 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={`/${DEFAULT_LOCALE}`}>
                {content.notFound.home}
                <ArrowTrail />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href={contactLinks.whatsapp}>{content.notFound.contact}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
