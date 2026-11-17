import type { Metadata } from "next";
import { seo, seoTemplate, type RouteKey } from "@/content/seo";
import { site } from "@/content/site";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");

/** Root metadata: base URL, title template, defaults. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo["/"].title, template: seoTemplate },
  description: seo["/"].description,
  applicationName: site.brand,
  formatDetection: { telephone: false },
};

/** Metadata for one route, built from content/seo.ts. */
export function pageMetadata(route: RouteKey): Metadata {
  const entry = seo[route];
  return {
    title: entry.absolute ? { absolute: entry.title } : entry.title,
    description: entry.description,
    alternates: { canonical: route },
  };
}
