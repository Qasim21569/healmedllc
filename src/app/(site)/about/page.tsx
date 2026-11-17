import { about } from "@/content/about";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/about");

export default function Page() {
  return (
    <>
      <PageHero content={about.hero} />
    </>
  );
}
