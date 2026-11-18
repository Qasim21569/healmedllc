import type { Cta, Lines, Pending } from "./types";

/**
 * Global content: brand, contact details, navigation, header and footer.
 * `null` = waiting on Ahmed (OPEN-QUESTIONS.md). Null values render nothing.
 */

const stores: { ebay: Pending<string>; dotmed: Pending<string> } = {
  ebay: null, // [need] eBay store URL
  dotmed: null, // [need] DOTmed listings URL
};

const social: { linkedin: Pending<string>; instagram: Pending<string> } = {
  linkedin: null, // [need] LinkedIn URL
  instagram: null, // [need] Instagram URL
};

export const site = {
  brand: "HEAL",
  legalName: "Heal Med LLC",
  brandLine: "Providing a second life to your asset.",
  url: "https://healmedllc.com",

  /** The logo itself is the inline <Logo> (vector, from public/brand/healmedllc-sg.svg). */
  logo: {
    alt: "HEAL home",
  },

  contact: {
    phone: "(347) 837-9746",
    phoneHref: "tel:+13478379746",
    email: "info@healmedllc.com",
    emailHref: "mailto:info@healmedllc.com",
    address: {
      street: "8315 Grandstaff Dr",
      city: "Sacramento",
      region: "CA",
      postalCode: "95818",
      country: "US",
      oneLine: "8315 Grandstaff Dr, Sacramento, CA 95818",
    },
    hours: null as Pending<string>, // [confirm] business hours
  },

  stores,
  social,

  nav: [
    { index: "01", label: "Equipment Planning", href: "/equipment-planning" },
    { index: "02", label: "Asset Disposition", href: "/asset-disposition" },
    { index: "03", label: "Service", href: "/service" },
    { index: "04", label: "About", href: "/about" },
    { index: "05", label: "Shop", href: "/shop" },
    { index: "06", label: "Contact", href: "/contact" },
  ],

  headerCta: { label: "Sell equipment", href: "/asset-disposition#offer" } satisfies Cta,

  menu: {
    open: "Open menu",
    close: "Close menu",
  },

  skipLink: "Skip to content",

  footer: {
    cta: {
      h2: {
        desktop: ["Retiring equipment?", "Let's give it a second life."],
        mobile: ["Retiring equipment?", "Let's give it a", "second life."],
      } satisfies Lines,
      ctas: [
        { label: "Request a consultation", href: "/contact" },
        { label: "Call (347) 837-9746", href: "tel:+13478379746" },
      ] satisfies readonly Cta[],
    },
    columns: [
      {
        title: "Services",
        links: [
          { label: "Equipment Planning", href: "/equipment-planning" },
          { label: "Asset Disposition", href: "/asset-disposition" },
          { label: "Service", href: "/service" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Our story", href: "/about#story" },
          { label: "Team", href: "/about#team" },
          { label: "Careers", href: "/about#careers" },
        ],
      },
      {
        title: "Shop",
        links: [
          { label: "Cables", href: "/shop#cables" },
          { label: "Parts", href: "/shop#parts" },
          { label: "Batteries", href: "/shop#batteries" },
          ...(stores.ebay ? [{ label: "eBay store", href: stores.ebay, external: true }] : []),
          ...(stores.dotmed
            ? [{ label: "DOTmed store", href: stores.dotmed, external: true }]
            : []),
        ] as Cta[],
      },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ] satisfies readonly Cta[],
    socialLabels: { linkedin: "LinkedIn", instagram: "Instagram" },
    wordmark: "HEAL",
  },
} as const;

/** Store CTAs, only for stores whose URL is confirmed. */
export function storeCtas(labels: { ebay: string; dotmed: string }): Cta[] {
  const out: Cta[] = [];
  if (site.stores.ebay) out.push({ label: labels.ebay, href: site.stores.ebay, external: true });
  if (site.stores.dotmed)
    out.push({ label: labels.dotmed, href: site.stores.dotmed, external: true });
  return out;
}
