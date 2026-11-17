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
    /**
     * Answers written for the site (Qasim, 2026-11-18) without unconfirmed
     * specifics: no wipe standard, no service radius, no lot minimums.
     * Ahmed to confirm. Items whose answer is `null` render nothing.
     */
    items: [
      {
        question: "Do you buy equipment that doesn't work?",
        answer: {
          desktop: [
            "Often, yes. Equipment that no longer works",
            "can still have value in its parts. Tell us",
            "the make, model and what's wrong, and we'll",
            "let you know what we can offer.",
          ],
        },
      },
      {
        question: "Do you buy single items or only full lots?",
        answer: {
          desktop: [
            "Send us what you have, whether it's one",
            "device or a full floor. We review every",
            "list and reply with what we can offer.",
          ],
        },
      },
      {
        question: "How do you handle patient data?",
        answer: {
          desktop: [
            "Data-bearing devices are wiped before",
            "they leave our hands. Ask us about the",
            "process if you need it for your records.",
          ],
        },
      },
      {
        question: "Where do you operate?",
        answer: {
          desktop: [
            "We're based in Sacramento, California.",
            "Tell us where your equipment is and",
            "we'll let you know how we can help.",
          ],
        },
      },
      {
        question: "What do I need to send to get an offer?",
        answer: {
          desktop: [
            "A list with make, model and quantity, plus",
            "a few photos if you have them. A",
            "spreadsheet is fine. We reply by email",
            "with next steps.",
          ],
        },
      },
    ] satisfies readonly FaqItem[],
  },
} as const;
