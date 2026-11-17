import { service } from "@/content/service";
import { PageHero } from "@/components/sections/PageHero";
import { HowWeHelp, WhatWeService } from "@/components/sections/service/ServiceSections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/service");

/** Service. No signature. Rhythm: brand → light → dark → surface → (brand footer). */
export default function Page() {
  return (
    <>
      <PageHero content={service.hero} />
      <WhatWeService />
      <HowWeHelp />
    </>
  );
}
