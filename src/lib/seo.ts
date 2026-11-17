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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.brand,
    url: "/",
    title: seo["/"].title,
    description: seo["/"].description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo["/"].title,
    description: seo["/"].description,
  },
  robots: { index: true, follow: true },
};

/** File-based share image (app/opengraph-image.tsx), restated per route: a page's
 *  own `openGraph` replaces the parent's, which would otherwise drop it. */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.brand}: ${site.brandLine}`,
};

/** Metadata for one route, built from content/seo.ts. */
export function pageMetadata(route: RouteKey): Metadata {
  const entry = seo[route];
  return {
    title: entry.absolute ? { absolute: entry.title } : entry.title,
    description: entry.description,
    alternates: { canonical: route },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.brand,
      url: route,
      title: entry.title,
      description: entry.description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [shareImage.url],
    },
  };
}
