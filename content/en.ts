import { serviceHref } from "@/data";
import { ROUTES, SECTION_IDS, siteConfig } from "@/lib/site-config";

import type { SiteContent } from "@/types";

/**
 * English — the second locale.
 *
 * Adding a language is adding a file that satisfies `SiteContent` and one entry
 * in `content/index.ts`. Nothing in `/components` changes.
 */
export const en: SiteContent = {
  locale: "en",
  htmlLang: "en",

  nav: {
    links: [
      { id: "home", label: "Home", href: `#${SECTION_IDS.hero}` },
      { id: "about", label: "About", href: `#${SECTION_IDS.about}` },
      { id: "services", label: "Services", href: ROUTES.services },
      /* A real route, not an anchor — and the one nav item that answers a
         question rather than naming a part of the site. */
      { id: "cost", label: "Cost", href: ROUTES.cost },
      { id: "journey", label: "Journey", href: `#${SECTION_IDS.journey}` },
      { id: "stories", label: "Stories", href: `#${SECTION_IDS.testimonials}` },
    ],
    cta: "Free consultation",
    navLabel: "Primary navigation",
    homeLabel: "Handle — back to homepage",
    menuLabel: "Open navigation menu",
    closeLabel: "Close menu",
    localeLabel: "Choose language",
  },

  hero: {
    titleLead: "Healthcare in\nVietnam.",
    titleAccent: "Handled.",
    lead: "Consultation, scheduling, interpreting, transfers and recovery — we carry the logistics so the only thing you have to manage is getting better.",
    primaryCta: "Free consultation",
    secondaryCta: "Watch the introduction",
    badges: [
      {
        id: "hospitals",
        icon: "shield-check",
        label: "Accredited hospitals & surgeons",
      },
      { id: "pricing", icon: "banknote", label: "Prices quoted up front" },
      { id: "journey", icon: "route", label: "One coordinator, end to end" },
      { id: "privacy", icon: "file-check", label: "Records kept confidential" },
    ],
    media: {
      alt: "A reception lobby with a marble desk, fluted wood walls and planted ferns",
      src: "/images/photos/hero-lobby.jpg",
      width: 1600,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoMAA8AA4BaJQBOgBuffLvYUj3AAP7nOxuqnaMm9Iso0urHz6E8eDIHlYFwK6AraXsT8Knm7ubrElSuAAA=",
      glyph: "hand-heart",
      tone: "sand",
      seed: "handle-hero-arrival",
    },
  },

  partners: {
    eyebrow: "Trusted medical partners",
    title: "We work alongside leading facilities",
    action: "See all partners",
  },

  whyVietnam: {
    title: "Why are more patients choosing treatment in",
    accent: "Vietnam?",
    lead: "Not because they want to travel. Because they want to be treated sooner, and at a price that makes sense.",
  },

  about: {
    title: "That is why Handle",
    accent: "exists.",
    body: [
      "Handle turns a treatment decision into a prepared journey: records translated and reviewed, the right specialist matched to your case, and appointments confirmed before you board a plane.",
      "You get a Personal Care Plan in your own language, one coordinator who owns the outcome, and a cost quoted in advance — no surprises, no guesswork.",
    ],
    action: "Learn about Handle",
    secondaryAction: "See the journey",
    pills: [
      { id: "plan", icon: "clipboard-list", label: "Personal Care Plan" },
      { id: "coordinator", icon: "user-round-check", label: "One coordinator" },
      { id: "quote", icon: "receipt", label: "One itemised quote" },
    ],
    media: {
      alt: "Clinicians reviewing a chart together by a consulting-room window",
      src: "/images/photos/about.jpg",
      width: 1440,
      height: 900,
      blurDataURL:
        "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoMAAcAA4BaJZwAAl2+hWhggAD+6zYcCrD8aiK7IuywZ9j7ZWNbq/7F6UI6RfkigAA=",
      glyph: "notebook-pen",
      tone: "linen",
      seed: "handle-about-consult",
    },
  },

  whyUs: {
    title: "One point of contact for the whole",
    accent: "journey.",
    lead: "Six commitments that shape how we work with every patient, from record review to remote follow-up after you are home again.",
  },

  journey: {
    title: "Your journey with",
    accent: "Handle",
    lead: "We stay with you at every step — from the first email to the follow-up long after you are home. Every milestone has an owner, a response time and a clear next action.",
    action: "See the full journey",
  },

  stats: {
    title: "What we have",
    accent: "delivered.",
    lead: "Aggregated across the cases Handle has coordinated, updated each quarter. These numbers reflect live work, not vague promises.",
  },

  services: {
    title: "Medical services we coordinate",
    lead: "From screening and IVF to cardiology and aesthetics, we help you choose the right specialty and the right hospital from the start.",
    action: "See all services",
  },

  experiences: {
    title: "Experiencing Vietnam",
    lead: "While you recover, you can still eat well, rest properly and discover Vietnam at a pace that fits your treatment.",
    action: "See all experiences",
  },

  testimonials: {
    title: "The people who travelled with us",
    lead: "Excerpted from post-treatment surveys and published with permission.",
  },

  faq: {
    title: "Questions we are asked",
    accent: "most.",
    lead: "The six things people want settled before a journey begins.",
    help: {
      title: "Not the answer you were looking for?",
      body: "Message the Handle team. We reply within one business day, in English or Vietnamese, and the first consultation costs nothing.",
      action: "Ask us directly",
    },
  },

  cta: {
    title: "Ready to start your healthcare",
    accent: "journey?",
    lead: "Book a free consultation with the Handle team today. We reply within one business day.",
    whatsapp: "Chat on WhatsApp",
    consultation: "Free consultation",
    form: {
      eyebrow: "Consultation form",
      chatLabel: "Chat on WhatsApp",
      nameLabel: "Full name",
      emailLabel: "Email",
      phoneLabel: "Phone number",
      messageLabel: "What do you need help with?",
      namePlaceholder: "Alex Nguyen",
      emailPlaceholder: "name@domain.com",
      phonePlaceholder: "+84...",
      messagePlaceholder:
        "Tell us about the specialty, timing or support you are looking for.",
      submit: "Send details",
      success:
        "Thank you. We received your details and will reply as soon as possible.",
      error: "Something went wrong. Please try again.",
      hint: "We reply within one business day.",
      privacy:
        "Your details are used only to contact you about your consultation and are never shared with third parties.",
      chips: ["English & Vietnamese support", "Information kept private"],
      sent: {
        eyebrow: "Received",
        title: "Your details have",
        accent: "reached us.",
        lead: "A care coordinator will read your request and reply on the email or phone number you just gave us.",
        steps: [
          {
            id: "received",
            icon: "file-check",
            label: "Received",
            body: "Your request has been recorded securely.",
          },
          {
            id: "review",
            icon: "user-round-check",
            label: "A coordinator reviews it",
            body: "We match your needs to the right hospital and surgeon.",
          },
          {
            id: "reply",
            icon: "message-circle",
            label: "A reply within 24 hours",
            body: "Your first consultation, free and with no obligation.",
          },
        ],
        again: "Send another request",
      },
    },
  },

  sectionNav: {
    label: "Page contents",
    items: [
      { id: SECTION_IDS.whyVietnam, label: "Context" },
      { id: SECTION_IDS.about, label: "About" },
      { id: SECTION_IDS.whyUs, label: "Why Handle" },
      { id: SECTION_IDS.journey, label: "Journey" },
      { id: SECTION_IDS.stats, label: "Numbers" },
      { id: SECTION_IDS.services, label: "Services" },
      { id: SECTION_IDS.testimonials, label: "Stories" },
      { id: SECTION_IDS.faq, label: "Answers" },
    ],
  },

  floatingContact: {
    label: "Contact us",
    title: "Choose how to reach us",
    note: "We reply within one business day, in English or Vietnamese.",
    closeLabel: "Close",
    channels: [
      {
        id: "zalo",
        icon: "message-circle",
        name: "Zalo",
        hint: "Fastest inside Vietnam",
      },
      {
        id: "whatsapp",
        icon: "globe",
        name: "WhatsApp",
        hint: "Best if you are overseas",
      },
      { id: "phone", icon: "phone", name: "Call us", hint: "Office hours, GMT+7" },
      {
        id: "email",
        icon: "mail",
        name: "Email",
        hint: "Attach your medical records",
      },
    ],
  },

  intro: {
    skip: "Skip",
    loading: "Opening Handle",
    mark: "An open hand forming the crossbar of the H in the Handle logo",
  },

  footer: {
    tagline: "You heal. We handle the rest.",
    columns: [
      {
        id: "company",
        title: "Company",
        links: [
          { id: "about", label: "About us", href: `#${SECTION_IDS.about}` },
          { id: "team", label: "Our team", href: `#${SECTION_IDS.whyUs}` },
          { id: "partners", label: "Partners", href: `#${SECTION_IDS.partners}` },
          { id: "careers", label: "Careers", href: `#${SECTION_IDS.cta}` },
        ],
      },
      {
        id: "services",
        title: "Services",
        links: [
          {
            id: "checkup",
            label: "Executive health screening",
            href: serviceHref("en", "checkup"),
          },
          { id: "ivf", label: "Fertility & IVF", href: serviceHref("en", "fertility") },
          { id: "eye", label: "Ophthalmology", href: serviceHref("en", "eye") },
          { id: "dental", label: "Dental care", href: serviceHref("en", "dental") },
          { id: "aesthetic", label: "Aesthetics", href: serviceHref("en", "aesthetic") },
          { id: "cardio", label: "Cardiology", href: serviceHref("en", "cardio") },
        ],
      },
      {
        id: "support",
        title: "Support",
        links: [
          { id: "cost", label: "Treatment costs", href: ROUTES.cost },
          {
            id: "faq",
            label: "Frequently asked questions",
            href: `#${SECTION_IDS.faq}`,
          },
          { id: "payment", label: "Payment guide", href: `#${SECTION_IDS.cta}` },
          { id: "terms", label: "Terms of use", href: `#${SECTION_IDS.cta}` },
          { id: "privacy", label: "Privacy policy", href: `#${SECTION_IDS.cta}` },
        ],
      },
    ],
    contactTitle: "Contact",
    address: siteConfig.addressLines.join(", "),
    legal: `© ${new Date().getFullYear()} Handle Healthcare Journey. All rights reserved.`,
    socials: [
      {
        id: "fb",
        label: "Facebook",
        platform: "facebook",
        href: siteConfig.socials.facebook,
      },
      {
        id: "ig",
        label: "Instagram",
        platform: "instagram",
        href: siteConfig.socials.instagram,
      },
      {
        id: "yt",
        label: "YouTube",
        platform: "youtube",
        href: siteConfig.socials.youtube,
      },
      {
        id: "li",
        label: "LinkedIn",
        platform: "linkedin",
        href: siteConfig.socials.linkedin,
      },
    ],
  },

  a11y: {
    skipToContent: "Skip to main content",
    previous: "Previous story",
    next: "Next story",
    goToSlide: "Go to story",
    slideStatus: "Story {current} of {total}",
  },

  notFound: {
    title: "We could not find that page.",
    lead: "The link may have changed. Head back to the homepage, or talk to our team directly.",
    home: "Back to homepage",
    contact: "Free consultation",
  },
};
