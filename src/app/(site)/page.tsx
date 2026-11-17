import { HomeHero } from "@/components/sections/home/HomeHero";
import { Statement } from "@/components/sections/home/Statement";
import { WhatWeDo } from "@/components/sections/home/WhatWeDo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/");

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Statement />
      <WhatWeDo />
    </>
  );
}
