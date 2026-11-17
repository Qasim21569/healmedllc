import { disposition } from "@/content/disposition";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/asset-disposition");

export default function Page() {
  return (
    <>
      <PageHero content={disposition.hero} />
    </>
  );
}
