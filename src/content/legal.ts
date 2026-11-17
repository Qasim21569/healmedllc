import type { Lines } from "./types";

/**
 * Legal pages and 404. The privacy and terms bodies are a drafted structure
 * marked [confirm] for Ahmed or a lawyer: `approved: false` renders only the
 * holding line. Flip to `true` once the text is reviewed.
 */

type LegalSection = { heading: string; body: Lines };

export type LegalPage = {
  breadcrumb: { index: string; label: string };
  h1: Lines;
  updated: string | null;
  approved: boolean;
  holding: Lines;
  sections: readonly LegalSection[];
};

const holding: Lines = {
  desktop: ["This page is being updated.", "Questions: info@healmedllc.com"],
};

export const privacy: LegalPage = {
  breadcrumb: { index: "", label: "Privacy policy" },
  h1: { desktop: ["Privacy policy"] },
  updated: null,
  approved: false, // [confirm] Ahmed or a lawyer to review
  holding,
  sections: [
    {
      heading: "Who we are",
      body: {
        desktop: [
          "This website is operated by Heal Med LLC,",
          "8315 Grandstaff Dr, Sacramento, CA 95818.",
        ],
      },
    },
    {
      heading: "What we collect",
      body: {
        desktop: [
          "The details you enter in our forms, files",
          "you upload with an offer request, and",
          "basic, anonymous usage analytics.",
        ],
      },
    },
    {
      heading: "Why we collect it",
      body: { desktop: ["To reply to your request and to keep", "this website working."] },
    },
    {
      heading: "Who processes it",
      body: {
        desktop: [
          "Our email provider, our file storage",
          "provider and our spam check provider,",
          "only to deliver your request to us.",
        ],
      },
    },
    {
      heading: "How long we keep it",
      body: { desktop: ["Only as long as we need it to handle", "your request and our records."] },
    },
    {
      heading: "Your requests",
      body: {
        desktop: [
          "To see, correct or delete your details,",
          "email info@healmedllc.com.",
        ],
      },
    },
  ],
};

export const terms: LegalPage = {
  breadcrumb: { index: "", label: "Terms of use" },
  h1: { desktop: ["Terms of use"] },
  updated: null,
  approved: false, // [confirm] Ahmed or a lawyer to review
  holding,
  sections: [
    {
      heading: "About these terms",
      body: {
        desktop: [
          "These terms cover your use of this",
          "website, operated by Heal Med LLC.",
        ],
      },
    },
    {
      heading: "Information on this site",
      body: {
        desktop: [
          "We keep the information here accurate,",
          "but it is general and may change.",
        ],
      },
    },
    {
      heading: "Offers and listings",
      body: {
        desktop: [
          "Offers are confirmed in writing by email.",
          "Store listings are governed by the",
          "terms of the store they appear on.",
        ],
      },
    },
    {
      heading: "Governing law",
      body: { desktop: ["These terms are governed by the laws", "of the State of California."] },
    },
    {
      heading: "Contact",
      body: { desktop: ["Questions about these terms:", "info@healmedllc.com"] },
    },
  ],
};

export const notFound = {
  h1: { desktop: ["This page has", "moved on."] } satisfies Lines,
  lead: {
    desktop: ["The equipment might have found a new", "home. Let's get you back."],
  } satisfies Lines,
  ctas: [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
