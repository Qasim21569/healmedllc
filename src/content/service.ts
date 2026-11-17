import type { Cta, Lines, PageHeroContent, Pending, PhotoId, Point } from "./types";

export type ServiceCard = {
  title: string;
  body: Lines;
  /** Mono spec line, `null` until confirmed. */
  spec: Pending<string>;
  photo: PhotoId;
};

export const service = {
  hero: {
    breadcrumb: { index: "03", label: "Service" },
    h1: {
      desktop: ["Biomedical service that", "keeps equipment working."],
      mobile: ["Biomedical", "service that", "keeps equipment", "working."],
    },
    lead: {
      desktop: [
        "Repair, preventive maintenance and technical",
        "support from an engineer who knows the",
        "equipment inside out.",
      ],
      mobile: [
        "Repair, preventive maintenance and",
        "technical support from an engineer",
        "who knows the equipment inside out.",
      ],
    },
    ctas: [
      { label: "Request service", href: "#request" },
      { label: "What we service", href: "#equipment" },
    ],
    photo: "28",
  } satisfies PageHeroContent,

  equipment: {
    id: "equipment",
    eyebrow: "What we service",
    h2: {
      desktop: ["Three equipment families today,", "more on the way."],
      mobile: ["Three equipment", "families today,", "more on the way."],
    } satisfies Lines,
    cards: [
      {
        title: "Ventilators",
        body: {
          desktop: [
            "Diagnostics, repair and performance",
            "verification, so units go back on the",
            "floor with confidence.",
          ],
        },
        spec: null, // [confirm] Respiratory · ICU · Transport
        photo: "29",
      },
      {
        title: "Ultrasound",
        body: {
          desktop: [
            "System and probe troubleshooting and",
            "repair for imaging teams who can't",
            "wait on downtime.",
          ],
        },
        spec: null, // [confirm] Cart · Portable · Probes
        photo: "30",
      },
      {
        title: "Histology",
        body: { desktop: ["Service for the instruments behind", "the lab's daily work."] },
        spec: null, // [confirm] Microtomes · Processors · Embedding
        photo: "31",
      },
    ] satisfies readonly ServiceCard[],
    banner: {
      title: "More coming soon.",
      body: { desktop: ["Have equipment we didn't list? Ask us."] } satisfies Lines,
      cta: { label: "Ask us", href: "/contact" } satisfies Cta,
    },
  },

  howWeHelp: {
    eyebrow: "How we help",
    h2: {
      desktop: ["From a fault today to", "fewer faults next year."],
      mobile: ["From a fault today", "to fewer faults", "next year."],
    } satisfies Lines,
    rows: [
      {
        index: "01",
        title: "Repair",
        // [confirm on-site] Draft: "Fault finding and fixes, on site or in our shop."
        body: { desktop: ["Fault finding and fixes."] },
      },
      {
        index: "02",
        title: "Preventive maintenance",
        body: { desktop: ["Scheduled checks that catch", "problems early."] },
      },
      {
        index: "03",
        title: "Performance testing",
        body: {
          desktop: [
            "Verification against manufacturer specs",
            "before equipment goes back into use.",
          ],
        },
      },
      {
        index: "04",
        title: "Technical support",
        body: { desktop: ["A direct line to the engineer,", "not a call center."] },
      },
    ] satisfies readonly Point[],
  },

  request: {
    id: "request",
    eyebrow: "Service request",
    h2: { desktop: ["Something down? Tell us."] } satisfies Lines,
    lead: {
      desktop: [
        "The make, model and what's happening is",
        "enough to start. For urgent issues, call",
        "(347) 837-9746.",
      ],
    } satisfies Lines,
  },
} as const;
