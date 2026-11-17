import type { Lines, PageHeroContent, Pending, PhotoId, Point } from "./types";

export type PlanningService = {
  id: "consultation" | "capital-planning" | "asset-management";
  index: string;
  pill: string;
  eyebrow: string;
  h2: Lines;
  lead: Lines;
  bullets: readonly string[];
  photo: PhotoId;
};

export const planning = {
  hero: {
    breadcrumb: { index: "01", label: "Equipment Planning" },
    h1: {
      desktop: ["Plan the whole life", "of every device."],
      mobile: ["Plan the whole", "life of every", "device."],
    },
    lead: {
      desktop: [
        "From the first purchase decision to the day",
        "it is retired, we help you spend capital",
        "where it matters most.",
      ],
      mobile: [
        "From the first purchase decision",
        "to the day it is retired, we help",
        "you spend capital where it",
        "matters most.",
      ],
    },
    ctas: [
      { label: "Book a consultation", href: "/contact" },
      { label: "See how it works", href: "#how-it-works" },
    ],
    photo: "14",
  } satisfies PageHeroContent,

  services: {
    label: "Planning services",
    items: [
      {
        id: "consultation",
        index: "01",
        pill: "Consultation",
        eyebrow: "01 · Consultation",
        h2: { desktop: ["An engineer's view", "before you buy,", "upgrade or retire."] },
        lead: {
          desktop: [
            "We walk your floors, look at what you own",
            "and tell you plainly what to keep, fix",
            "or replace.",
          ],
          mobile: [
            "We walk your floors, look at what",
            "you own and tell you plainly what",
            "to keep, fix or replace.",
          ],
        },
        bullets: [
          "Equipment walkthroughs and audits",
          "Repair-or-replace recommendations",
          "Vendor-neutral advice on refurbished vs new",
        ],
        photo: "15",
      },
      {
        id: "capital-planning",
        index: "02",
        pill: "Capital planning",
        eyebrow: "02 · Capital planning",
        h2: { desktop: ["Prioritize spending using", "clinical need, budget", "and lifecycle data."] },
        lead: {
          desktop: [
            "A clear multi-year view of what needs",
            "replacing and when, in a format",
            "leadership can approve.",
          ],
        },
        bullets: [
          "Lifecycle and end-of-support review",
          "Multi-year replacement roadmap",
          "Budget scenarios you can take to leadership",
        ],
        photo: "16",
      },
      {
        id: "asset-management",
        index: "03",
        pill: "Asset management",
        eyebrow: "03 · Asset management",
        h2: { desktop: ["Know what you own,", "where it is and when", "it needs attention."] },
        lead: {
          desktop: [
            "Tagging, preventive maintenance and",
            "lifecycle reporting, backed by a",
            "proper CMMS.",
          ],
        },
        bullets: [
          "Inventory and asset tagging",
          "Preventive maintenance scheduling",
          "Lifecycle and condition reporting",
        ],
        photo: "17",
      },
    ] satisfies readonly PlanningService[],
    partner: {
      label: "CMMS partner",
      name: null as Pending<string>, // [confirm] partner name and whether it can be named
      body: {
        desktop: [
          "We are partnering with a CMMS provider",
          "so inventory, maintenance and lifecycle",
          "live in one place.",
        ],
      } satisfies Lines,
    },
  },

  howItWorks: {
    id: "how-it-works",
    eyebrow: "How it works",
    h2: {
      desktop: ["Three steps from first call to a plan."],
      mobile: ["Three steps from", "first call to a plan."],
    } satisfies Lines,
    steps: [
      {
        index: "01",
        title: "Talk",
        // [confirm length] Draft: "A 30-minute call about your equipment and goals."
        body: { desktop: ["A call about your equipment", "and goals."] },
      },
      {
        index: "02",
        title: "Review",
        body: { desktop: ["We audit the floor or your asset", "list and flag priorities."] },
      },
      {
        index: "03",
        title: "Plan",
        body: { desktop: ["You get a written plan with", "timelines and budget ranges."] },
      },
    ] satisfies readonly Point[],
    cta: { label: "Book a consultation", href: "/contact" },
  },
} as const;
