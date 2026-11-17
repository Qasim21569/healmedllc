/**
 * Per-route title and description (CONTENT.md, SEO). Title template is
 * "%s | Heal Med LLC"; Home uses an absolute title.
 */

export type RouteKey =
  | "/"
  | "/equipment-planning"
  | "/asset-disposition"
  | "/service"
  | "/about"
  | "/shop"
  | "/contact"
  | "/privacy"
  | "/terms";

export type RouteSeo = {
  title: string;
  /** Home only: skip the "%s | Heal Med LLC" template. */
  absolute?: boolean;
  description: string;
};

export const seoTemplate = "%s | Heal Med LLC";

export const seo: Record<RouteKey, RouteSeo> = {
  "/": {
    title: "HEAL · Providing a second life to your asset",
    absolute: true,
    description:
      "We plan, buy, service and responsibly retire hospital equipment from Sacramento, California. Engineer-led, fair value, data protected.",
  },
  "/equipment-planning": {
    title: "Medical Equipment Planning & Capital Planning",
    description:
      "Consultation, capital planning and asset management for hospitals and clinics, led by a biomedical engineer.",
  },
  "/asset-disposition": {
    title: "Sell Used Medical Equipment · Hospital Asset Disposition",
    description:
      "Get a fair offer for surplus and retired medical equipment. Engineer-assessed value, decommissioning and responsible resale.",
  },
  "/service": {
    title: "Ventilator, Ultrasound & Histology Equipment Repair",
    description:
      "Repair, preventive maintenance and performance testing for ventilators, ultrasound and histology equipment.",
  },
  "/about": {
    title: "About HEAL",
    description:
      "HEAL plans, buys, services and responsibly retires medical equipment for hospitals, clinics and labs.",
  },
  "/shop": {
    title: "Medical Equipment Parts, Cables & Batteries",
    description:
      "Tested equipment, cables, parts and batteries. Full inventory on our eBay and DOTmed stores.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Call (347) 837-9746, email info@healmedllc.com or send us a message. Sacramento, California.",
  },
  "/privacy": {
    title: "Privacy policy",
    description: "How Heal Med LLC handles the information you share through this website.",
  },
  "/terms": {
    title: "Terms of use",
    description: "The terms that cover your use of the Heal Med LLC website.",
  },
};
