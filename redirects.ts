/**
 * Old WordPress URL → new route redirects (PLAYBOOK §9, MASTER-PLAN D17).
 * Qasim exports the old sitemap before launch; add one entry per old URL.
 * www → apex is handled by the Vercel domain settings, not here.
 */
export type LegacyRedirect = { source: string; destination: string; permanent: true };

export const legacyRedirects: LegacyRedirect[] = [
  // { source: "/about-us", destination: "/about", permanent: true },
  // { source: "/sell-your-equipment", destination: "/asset-disposition", permanent: true },
];
