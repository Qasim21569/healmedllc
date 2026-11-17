import type { NextConfig } from "next";
import { legacyRedirects } from "./redirects";

/*
 * Cache Components is deliberately OFF (HANDOFF, decisions, 2026-11-18).
 * The site is fully static, and Cache Components keeps up to three previous
 * routes mounted but hidden (React Activity). That leaves duplicate anchor ids
 * (#offer, #request...) in the DOM and fights the page transition (T9).
 */
const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the home folder confuses detection.
  turbopack: { root: process.cwd() },
  async redirects() {
    return legacyRedirects;
  },
  images: {
    qualities: [75],
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      { pathname: "/photos/**", search: "" },
      { pathname: "/brand/**", search: "" },
    ],
  },
};

export default nextConfig;
