import type { Cta, Lines, PageHeroContent, Pending, PhotoId, Point } from "./types";

export type Person = {
  name: string;
  role: Pending<string>;
  bio: Pending<Lines>;
  photo: PhotoId;
};

export const about = {
  hero: {
    breadcrumb: { index: "04", label: "About" },
    h1: {
      desktop: ["Good equipment deserves", "a second life."],
      mobile: ["Good equipment", "deserves a", "second life."],
    },
    lead: {
      desktop: [
        "HEAL plans, buys, services and responsibly",
        "retires medical equipment for hospitals,",
        "clinics and labs.",
      ],
      mobile: [
        "HEAL plans, buys, services and",
        "responsibly retires medical equipment",
        "for hospitals, clinics and labs.",
      ],
    },
    ctas: [
      { label: "Work with us", href: "/contact" },
      { label: "Careers", href: "#careers" },
    ],
    photo: "32",
  } satisfies PageHeroContent,

  story: {
    id: "story",
    eyebrow: "Our story",
    lead: {
      desktop: [
        "HEAL started with one job: helping",
        "healthcare facilities sell equipment",
        "they no longer needed.",
      ],
      mobile: [
        "HEAL started with",
        "one job: helping",
        "healthcare facilities",
        "sell equipment they",
        "no longer needed.",
      ],
    } satisfies Lines,
    body: {
      desktop: [
        "Working with hospitals, clinics and",
        "manufacturers, we saw how much of it still",
        "had years of service left. Today we plan,",
        "buy, service and responsibly retire",
        "medical equipment, always with patient",
        "safety, data protection and the",
        "environment in mind.",
      ],
    } satisfies Lines,
    /** Collage, left to right, with I4 speeds 0.9x, 1.1x, 1.25x. */
    collage: ["39", "40", "41"] as const satisfies readonly PhotoId[],
  },

  name: {
    eyebrow: "The name",
    wordmark: "HEAL",
    sentence: {
      desktop: [
        "HEAL is what we do for equipment. We give",
        "it a second life, and give its owners back",
        "value they thought was gone.",
      ],
      mobile: [
        "HEAL is what we do for equipment.",
        "We give it a second life, and give",
        "its owners back value they",
        "thought was gone.",
      ],
    } satisfies Lines,
  },

  values: {
    eyebrow: "What we value",
    h2: {
      desktop: ["Three things we never trade off."],
      mobile: ["Three things we", "never trade off."],
    } satisfies Lines,
    items: [
      {
        title: "Engineer-led",
        body: { desktop: ["Every decision starts with how", "the equipment actually works."] },
      },
      { title: "Fair", body: { desktop: ["Clear offers and honest", "assessments."] } },
      {
        title: "Responsible",
        body: { desktop: ["Safe decommissioning, protected", "data, less waste."] },
      },
    ] satisfies readonly Point[],
  },

  team: {
    id: "team",
    eyebrow: "Team",
    h2: {
      desktop: ["Small team, direct line", "to the engineer."],
      mobile: ["Small team, direct", "line to the engineer."],
    } satisfies Lines,
    /** Only confirmed people. `null` entries and `null` fields render nothing. */
    people: [
      {
        name: "Ahmed Kharodia",
        role: null, // [confirm] "Founder, Service and Operations Engineer"
        bio: null, // [need] 2 to 3 line bio from Ahmed
        photo: "33",
      },
      null, // [confirm or remove] second team member (photo 34)
    ] satisfies readonly (Person | null)[],
  },

  careers: {
    id: "careers",
    eyebrow: "Careers",
    h2: { desktop: ["We're small and growing."] } satisfies Lines,
    body: {
      desktop: [
        "If you're a biomedical technician or you",
        "love medical technology, we'd like to",
        "hear from you.",
      ],
    } satisfies Lines,
    cta: { label: "Send your CV", href: "mailto:info@healmedllc.com" } satisfies Cta,
  },
} as const;
