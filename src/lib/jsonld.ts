import { site } from "@/content/site";
import { SITE_URL } from "./seo";

/** Serialises JSON-LD safely for a <script> tag. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** LocalBusiness for the root layout. `sameAs` only lists confirmed URLs. */
export function localBusiness() {
  const sameAs = [
    site.social.linkedin,
    site.social.instagram,
    site.stores.ebay,
    site.stores.dotmed,
  ].filter((u): u is string => Boolean(u));
  const { address } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: site.brand,
    legalName: site.legalName,
    slogan: site.brandLine,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/opengraph-image`,
    telephone: "+1-347-837-9746",
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** FAQPage from the questions that have an answer on the page. */
export function faqPage(
  items: readonly { question: string; answer: { desktop: readonly string[] } | null }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((i) => i.answer)
      .map((i) => ({
        "@type": "Question",
        name: i.question,
        acceptedAnswer: { "@type": "Answer", text: i.answer!.desktop.join(" ") },
      })),
  };
}
