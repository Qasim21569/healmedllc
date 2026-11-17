import type { Lines, PhotoId } from "./types";
import { site } from "./site";

export const contact = {
  hero: {
    breadcrumb: { index: "06", label: "Contact" },
    h1: { desktop: ["Let's talk."] } satisfies Lines,
    lead: { desktop: ["Tell us what you have, what you need", "or what's broken."] } satisfies Lines,
  },

  form: {
    eyebrow: "Send a message",
  },

  details: {
    heading: site.legalName,
    rows: [
      { label: "Call", value: site.contact.phone, href: site.contact.phoneHref },
      { label: "Email", value: site.contact.email, href: site.contact.emailHref },
      { label: "Visit", value: site.contact.address.oneLine, href: null },
      // Hours: [confirm], row renders nothing while null.
      ...(site.contact.hours ? [{ label: "Hours", value: site.contact.hours, href: null }] : []),
    ] as { label: string; value: string; href: string | null }[],
    map: {
      photo: "map" as PhotoId,
      label: "Open in Google Maps",
      href: "https://www.google.com/maps/search/?api=1&query=8315+Grandstaff+Dr%2C+Sacramento%2C+CA+95818",
    },
  },
} as const;
