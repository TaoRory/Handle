import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { SocialIcon } from "@/components/ui/social-icon";
import { contactLinks, resolveHref, siteConfig } from "@/lib/site-config";

import type { Locale, SiteContent } from "@/types";

/**
 * Site footer. A server component — nothing here is interactive beyond links.
 */
export function Footer({ content, locale }: { content: SiteContent; locale: Locale }) {
  const { footer } = content;

  return (
    <footer className="bg-cream-100 border-line relative border-t">
      <div className="mx-auto w-full max-w-[1280px] px-5 pt-16 pb-10 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))_minmax(0,1.15fr)] lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            {/* Wordmark, not the lockup — the tagline is set below at a
                readable size rather than repeated twice. */}
            <Logo variant="wordmark" />
            <p className="text-ink-600 max-w-[34ch] text-sm">{footer.tagline}</p>

            {/* Wraps. Four 44px targets plus their gaps come to 206px against
                a 170px track at `lg`, so on one line the column pushed the grid
                past the page. */}
            <ul className="flex flex-wrap items-center gap-2.5">
              {footer.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="border-line text-ink-600 hover:border-gold hover:bg-gold hover:text-ink rounded-pill inline-flex size-11 items-center justify-center border transition-colors duration-200"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {footer.columns.map((column) => (
            <nav key={column.id} aria-labelledby={`footer-${column.id}`}>
              <h2
                id={`footer-${column.id}`}
                className="font-brand text-ink text-eyebrow mb-5 uppercase"
              >
                {column.title}
              </h2>
              {/* `-my-2` pulls the row spacing back to where it looked right,
                  so the taps get their 44px without the column growing. */}
              <ul className="-my-2 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={resolveHref(link.href, locale)}
                      className="text-ink-600 hover:text-gold-700 inline-flex min-h-11 items-center text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h2 className="font-brand text-ink text-eyebrow mb-5 uppercase">
              {footer.contactTitle}
            </h2>
            <ul className="flex flex-col gap-1 text-sm">
              {/* Both hotlines. The country label is not decoration: two
                  numbers with no explanation reads as one of them being out of
                  date, and a reader in Australia should be able to see at a
                  glance which one is a local call for them. */}
              {contactLinks.phones.map((phone) => (
                <li key={phone.id}>
                  <a
                    href={phone.href}
                    className="group/link text-ink-600 hover:text-gold-700 flex min-h-11 items-center gap-3 transition-colors duration-200"
                  >
                    <Phone
                      className="text-gold mt-0.5 size-4 shrink-0"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    {/* Label under the number, not beside it. The contact
                        column is ~170px wide at `lg`, and "+84 77 333 3247
                        Việt Nam" on one line pushed the five-column grid 45px
                        past the page and gave the whole site a horizontal
                        scrollbar at 1024. */}
                    <span className="flex flex-col leading-tight">
                      <span>{phone.display}</span>
                      <span className="text-ink-400 text-xs">
                        {footer.phoneLabels[phone.id]}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={contactLinks.mail}
                  className="group/link text-ink-600 hover:text-gold-700 flex min-h-11 items-center gap-3 transition-colors duration-200"
                >
                  <Mail
                    className="text-gold mt-0.5 size-4 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {/* `anywhere`, because an email address is one unbroken token:
                      `handlevietnam@gmail.com` is 215px wide in a 170px column
                      and normal wrapping has nowhere to break it. */}
                  <span className="[overflow-wrap:anywhere] min-w-0">
                    {siteConfig.email}
                  </span>
                </a>
              </li>
              <li className="text-ink-600 mt-3 flex items-start gap-3">
                <MapPin
                  className="text-gold mt-0.5 size-4 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <address className="not-italic">
                  {siteConfig.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-line mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-ink-400 text-xs">{footer.legal}</p>
          <p className="font-brand text-ink-400 text-xs tracking-[0.16em] uppercase">
            Healthcare in Vietnam. Handled.
          </p>
        </div>
      </div>
    </footer>
  );
}
