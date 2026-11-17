import type { Lines, PageHeroContent, Pending, PhotoId, Point, Tile } from "./types";

export type FaqItem = { question: string; answer: Pending<Lines> };

export const disposition = {
  hero: {
    breadcrumb: { index: "02", label: "Asset Disposition" },
    h1: {
      desktop: ["We buy medical", "equipment."],
      mobile: ["We buy", "medical", "equipment."],
    },
    lead: {
      desktop: [
        "Closing, upgrading or clearing space? Get a",
        "fair offer for surplus and retired",
        "equipment, and let us handle the rest.",
      ],
      mobile: [
        "Closing, upgrading or clearing",
        "space? Get a fair offer for surplus",
        "and retired equipment, and let us",
        "handle the rest.",
      ],
    },
    ctas: [
      { label: "Get an offer", href: "#offer" },
      { label: "See what we buy", href: "#buy" },
    ],
    photo: "18",
  } satisfies PageHeroContent,

  whatWeBuy: {
    id: "buy",
    eyebrow: "What we buy",
    h2: {
      desktop: ["Working or not, most hospital", "equipment has value."],
      mobile: ["Working or not,", "most hospital", "equipment has value."],
    } satisfies Lines,
    note: { desktop: ["Don't see your equipment?", "Send us the list anyway."] } satisfies Lines,
    noteCta: { label: "Send your list", href: "#offer" },
    /** `null` = [confirm], renders nothing. */
    tiles: [
      { title: "Ventilators and respiratory", photo: "19", href: "#offer" },
      { title: "Ultrasound systems and probes", photo: "20", href: "#offer" },
      { title: "Patient monitoring", photo: "21", href: "#offer" },
      { title: "Histology and lab", photo: "22", href: "#offer" },
      null, // [confirm] Infusion pumps (photo 23)
      null, // [confirm] Imaging (photo 24)
      null, // [confirm] Surgical and OR (photo 25)
      { title: "Parts, batteries, accessories", photo: "26", href: "#offer" },
    ] satisfies readonly (Tile | null)[],
  },

  howItWorks: {
    eyebrow: "How it works",
    h2: { desktop: ["Four steps, one partner."] } satisfies Lines,
    steps: [
      {
        index: "01",
        title: "Send your list",
        body: { desktop: ["Make, model, quantity and a few", "photos. A spreadsheet is fine."] },
      },
      {
        index: "02",
        title: "Get an offer",
        body: { desktop: ["We review condition and market", "value and send a fair offer."] },
      },
      {
        index: "03",
        title: "We remove and decommission",
        // [confirm logistics] Draft: "Pickup scheduled around your team;
        // data-bearing devices wiped." Renders title only until confirmed.
        body: null,
      },
      {
        index: "04",
        title: "Get paid",
        // [confirm terms] Draft: "Payment once equipment is collected."
        body: null,
      },
    ] satisfies readonly (Omit<Point, "body"> & { body: Pending<Lines> })[],
  },

  whySell: {
    eyebrow: "Why sell to HEAL",
    h2: {
      desktop: ["Fair offers from someone", "who knows the equipment."],
      mobile: ["Fair offers from", "someone who knows", "the equipment."],
    } satisfies Lines,
    /** `null` = [confirm], renders nothing. */
    cards: [
      {
        title: "Engineer-assessed value",
        body: { desktop: ["Offers based on real condition,", "not a blanket scrap price."] },
      },
      {
        title: "One partner, start to finish",
        body: { desktop: ["Assessment, removal, data wiping", "and resale handled together."] },
      },
      {
        title: "Responsible by default",
        body: { desktop: ["What cannot be reused is", "recycled responsibly."] },
      },
      // [confirm documents] "Paperwork for your records · Documentation of
      // what left your facility." Hidden until the documents are confirmed.
      null,
    ] satisfies readonly (Point | null)[],
  },

  offer: {
    id: "offer",
    eyebrow: "Get an offer",
    h2: { desktop: ["Tell us what you have."] } satisfies Lines,
    lead: {
      desktop: [
        "A list and a few photos is enough to start.",
        "We reply by email with next steps.",
      ],
      mobile: [
        "A list and a few photos is enough",
        "to start. We reply by email with",
        "next steps.",
      ],
    } satisfies Lines,
    photo: "27" as PhotoId,
  },

  faq: {
    eyebrow: "FAQ",
    h2: { desktop: ["Questions sellers ask."] } satisfies Lines,
    /** Items whose answer is `null` ([confirm]) render nothing. */
    items: [
      { question: "Do you buy equipment that doesn't work?", answer: null }, // [confirm]
      { question: "Do you buy single items or only full lots?", answer: null }, // [confirm]
      {
        question: "How do you handle patient data?",
        // [confirm method] before naming a wipe standard.
        answer: { desktop: ["Data-bearing devices are wiped before", "they leave our hands."] },
      },
      {
        question: "Where do you operate?",
        // [confirm service area]
        answer: { desktop: ["We are based in Sacramento, California."] },
      },
    ] satisfies readonly FaqItem[],
  },
} as const;
