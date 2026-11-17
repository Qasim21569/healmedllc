import { privacy } from "@/content/legal";
import { LegalBody } from "@/components/sections/LegalBody";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/privacy");

export default function Page() {
  return (
    <>
      <PageHero content={{ breadcrumb: privacy.breadcrumb, h1: privacy.h1 }} />
      <LegalBody page={privacy} />
    </>
  );
}
