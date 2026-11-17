import { contact } from "@/content/contact";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/contact");

export default function Page() {
  return (
    <>
      <PageHero content={contact.hero} size="mega" />
    </>
  );
}
