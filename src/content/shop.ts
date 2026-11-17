import type { Lines, PageHeroContent, PhotoId } from "./types";
import { site, storeCtas } from "./site";

export type ShopCategory = {
  id: "cables" | "parts" | "batteries";
  title: string;
  body: Lines;
  photo: PhotoId;
};

export type StoreCard = {
  index: string;
  name: string;
  title: string;
  body: Lines;
  cta: string;
  /** From site.stores. `null` = [need], the card renders nothing. */
  url: string | null;
  tone: "brand" | "ink";
};

const storeLabels = { ebay: "Shop on eBay", dotmed: "Shop on DOTmed" };

export const shop = {
  hero: {
    breadcrumb: { index: "05", label: "Shop" },
    h1: {
      desktop: ["Tested equipment,", "parts and accessories."],
      mobile: ["Tested", "equipment,", "parts and", "accessories."],
    },
    lead: {
      desktop: [
        "Browse what's in stock. Our full inventory",
        "is listed on our eBay and DOTmed stores.",
      ],
      mobile: [
        "Browse what's in stock. Our full",
        "inventory is listed on our eBay",
        "and DOTmed stores.",
      ],
    },
    /** Store buttons only appear once the store URLs are confirmed. */
    ctas: storeCtas(storeLabels),
    photo: "35",
  } satisfies PageHeroContent,

  categories: {
    eyebrow: "Categories",
    items: [
      {
        id: "cables",
        title: "Cables",
        body: { desktop: ["Patient cables, leads and power", "cables for common systems."] },
        photo: "36",
      },
      {
        id: "parts",
        title: "Parts",
        body: { desktop: ["Tested replacement parts pulled", "from retired equipment."] },
        photo: "37",
      },
      {
        id: "batteries",
        title: "Batteries",
        body: { desktop: ["Replacement batteries for monitors,", "ventilators and carts."] },
        photo: "38",
      },
    ] satisfies readonly ShopCategory[],
    /** Where a category tile leads while the store URLs are unknown. */
    fallbackHref: "#stock-check",
  },

  stores: {
    eyebrow: "Stores",
    cards: [
      {
        index: "Store 01",
        name: "eBay",
        title: "Shop on eBay",
        body: { desktop: ["Refurbished equipment, parts and", "accessories, shipped across the US."] },
        cta: "Open store",
        url: site.stores.ebay,
        tone: "brand",
      },
      {
        index: "Store 02",
        name: "DOTmed",
        title: "Shop on DOTmed",
        body: { desktop: ["Equipment listings for hospitals", "and biomed teams."] },
        cta: "Open listings",
        url: site.stores.dotmed,
        tone: "ink",
      },
    ] satisfies readonly StoreCard[],
  },

  stockCheck: {
    id: "stock-check",
    eyebrow: "Can't find it?",
    h2: {
      desktop: ["Tell us the make and model", "and we'll check."],
      mobile: ["Tell us the make", "and model and", "we'll check."],
    } satisfies Lines,
  },
} as const;
