import { service } from "@/content/service";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/service");

export default function Page() {
  return (
    <>
      <PageHero content={service.hero} />
    </>
  );
}
