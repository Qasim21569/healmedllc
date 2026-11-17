import { planning } from "@/content/planning";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/equipment-planning");

export default function Page() {
  return (
    <>
      <PageHero content={planning.hero} />
    </>
  );
}
