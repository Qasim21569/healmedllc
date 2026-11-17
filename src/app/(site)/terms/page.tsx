import { terms } from "@/content/legal";
import { LegalBody } from "@/components/sections/LegalBody";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/terms");

export default function Page() {
  return (
    <>
      <PageHero content={{ breadcrumb: terms.breadcrumb, h1: terms.h1 }} />
      <LegalBody page={terms} />
    </>
  );
}
