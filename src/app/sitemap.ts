import type { MetadataRoute } from "next";
import { seo, type RouteKey } from "@/content/seo";
import { SITE_URL } from "@/lib/seo";

const priority: Partial<Record<RouteKey, number>> = {
  "/": 1,
  "/asset-disposition": 0.9,
  "/privacy": 0.2,
  "/terms": 0.2,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(seo) as RouteKey[]).map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    changeFrequency: "monthly",
    priority: priority[route] ?? 0.7,
  }));
}
