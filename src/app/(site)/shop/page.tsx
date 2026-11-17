import { shop } from "@/content/shop";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/shop");

export default function Page() {
  return (
    <>
      <PageHero content={shop.hero} />
    </>
  );
}
