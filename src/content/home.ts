import type { Cta, Lines, PhotoId, Point, Tile } from "./types";

export const home = {
  hero: {
    eyebrow: "Heal Med LLC · Sacramento, CA",
    rightLabel: "Planning · Disposition · Service",
    h1: {
      desktop: ["Providing a second", "life to your asset."],
      mobile: ["Providing a", "second life to", "your asset."],
    } satisfies Lines,
    lead: {
      desktop: [
        "We plan, buy, service and responsibly retire",
        "hospital equipment, so your capital keeps",
        "working and nothing useful goes to waste.",
      ],
      mobile: [
        "We plan, buy, service and responsibly",
        "retire hospital equipment, so your",
        "capital keeps working and nothing",
        "useful goes to waste.",
      ],
    } satisfies Lines,
    ctas: [
      { label: "Sell your equipment", href: "/asset-disposition" },
      { label: "Browse inventory", href: "/shop" },
    ] satisfies readonly Cta[],
    caption: "Every device, inspected by an engineer.",
    photo: "01" as PhotoId,
    /** Letter the I1 zoom lands in (BUILD-PLAYBOOK §5). */
    zoomInto: "L" as const,
  },

  statement: {
    eyebrow: "Why HEAL",
    text: {
      desktop: [
        "Hospitals retire equipment",
        "every day. Most of it still",
        "has years of good work left.",
        "We find it a second life, and",
        "give its owners back value",
        "they thought was gone.",
      ],
      mobile: [
        "Hospitals retire",
        "equipment every day.",
        "Most of it still has",
        "years of good work",
        "left. We find it a",
        "second life, and give",
        "its owners back value",
        "they thought was gone.",
      ],
    } satisfies Lines,
    points: [
      {
        index: "01",
        title: "Engineer-led",
        body: { desktop: ["Every device is assessed by", "a biomedical engineer."] },
      },
      {
        index: "02",
        title: "Fair value",
        body: { desktop: ["Offers based on real condition", "and market price."] },
      },
      {
        index: "03",
        title: "Data protected",
        body: { desktop: ["Data-bearing devices are wiped", "before they move on."] },
      },
      {
        index: "04",
        title: "Less waste",
        body: { desktop: ["What cannot be reused is", "recycled responsibly."] },
      },
    ] satisfies readonly Point[],
  },

  whatWeDo: {
    eyebrow: "What we do",
    h2: {
      desktop: ["Plan it, sell it, service it."],
      mobile: ["Plan it, sell it,", "service it."],
    } satisfies Lines,
    rows: [
      {
        index: "01",
        title: {
          desktop: ["Equipment Planning"],
          mobile: ["Equipment", "Planning"],
        } satisfies Lines,
        chips: ["Consultation", "Capital planning", "Asset management"],
        href: "/equipment-planning",
        photo: "03" as PhotoId,
      },
      {
        index: "02",
        title: { desktop: ["Asset Disposition"], mobile: ["Asset", "Disposition"] } satisfies Lines,
        chips: ["What we buy", "Fair dollar value", "Get an offer"],
        href: "/asset-disposition",
        photo: "17" as PhotoId,
      },
      {
        index: "03",
        title: { desktop: ["Service"] } satisfies Lines,
        chips: ["Ventilators", "Ultrasound", "Histology", "More to come"],
        href: "/service",
        photo: "39" as PhotoId,
      },
    ],
    /** Accessible label for a row's link (the title is read first). */
    openLabel: "Open",
  },

  weBuy: {
    eyebrow: "02 · Asset disposition",
    h2: {
      desktop: ["We buy medical equipment,", "and pay a fair value for it."],
      mobile: ["We buy medical", "equipment, and pay a", "fair value for it."],
    } satisfies Lines,
    cta: { label: "Get an offer", href: "/asset-disposition#offer" } satisfies Cta,
    /** `null` = [confirm], renders nothing. */
    tiles: [
      { title: "Ventilators", photo: "04", href: "/asset-disposition#buy" },
      { title: "Ultrasound systems", photo: "05", href: "/asset-disposition#buy" },
      { title: "Patient monitors", photo: "06", href: "/asset-disposition#buy" },
      { title: "Histology and lab", photo: "07", href: "/asset-disposition#buy" },
      null, // [confirm] Infusion pumps (photo 08)
      { title: "Parts and batteries", photo: "09", href: "/asset-disposition#buy" },
    ] satisfies readonly (Tile | null)[],
  },

  lifecycle: {
    eyebrow: "The lifecycle",
    h2: {
      desktop: ["From your floor to its next home."],
      mobile: ["From your floor to", "its next home."],
    } satisfies Lines,
    steps: [
      {
        index: "01",
        title: "Assess",
        body: { desktop: ["You send your list. We review", "it and make a fair offer."] },
      },
      {
        index: "02",
        title: "Decommission",
        body: { desktop: ["Safe removal, with data-bearing", "devices wiped."] },
      },
      {
        index: "03",
        title: "Inspect and restore",
        body: { desktop: ["A biomedical engineer tests", "and repairs every device."] },
      },
      {
        index: "04",
        title: "Second life",
        body: { desktop: ["Redeployed, resold or", "responsibly recycled."] },
      },
    ] satisfies readonly Point[],
  },

  whoWeAre: {
    eyebrow: "Who we are",
    h2: { desktop: ["Run by a", "biomedical engineer."] } satisfies Lines,
    body: {
      desktop: [
        "Every device we buy or service is checked",
        "by someone who has spent a career keeping",
        "hospital equipment running. Honest",
        "assessments, fair offers, equipment that",
        "works when it reaches its next home.",
      ],
    } satisfies Lines,
    list: [
      "Engineer-led inspection",
      "Fair, transparent value",
      "Data protection built in",
      "Less waste, longer life",
    ],
    cta: { label: "Our story", href: "/about#story" } satisfies Cta,
  },

  marquee: {
    items: ["Ventilators", "Ultrasound", "Histology", "Patient monitors"],
  },

  shop: {
    eyebrow: "Shop",
    h2: {
      desktop: ["Tested equipment, parts", "and accessories."],
      mobile: ["Tested equipment,", "parts and", "accessories."],
    } satisfies Lines,
    storeLabels: { ebay: "Shop on eBay", dotmed: "Shop on DOTmed" },
    tiles: [
      { title: "Cables", photo: "11", href: "/shop#cables" },
      { title: "Parts", photo: "12", href: "/shop#parts" },
      { title: "Batteries", photo: "13", href: "/shop#batteries" },
    ] satisfies readonly Tile[],
  },
} as const;
