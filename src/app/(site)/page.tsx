import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeMarquee, HomeShop, Lifecycle, WeBuy } from "@/components/sections/home/HomeSections";
import { Statement } from "@/components/sections/home/Statement";
import { WhatWeDo } from "@/components/sections/home/WhatWeDo";
import { WhoWeAre } from "@/components/sections/home/WhoWeAre";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/");

/** Home: brand → light → surface → light → tint → dark → light → surface → (brand footer). */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Statement />
      <WhatWeDo />
      <WeBuy />
      <Lifecycle />
      <WhoWeAre />
      <HomeMarquee />
      <HomeShop />
    </>
  );
}
