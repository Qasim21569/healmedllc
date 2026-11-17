import { describe, expect, it } from "vitest";
import { seo, type RouteKey } from "@/content/seo";
import { faqPage, jsonLdScript, localBusiness } from "@/lib/jsonld";
import { pageMetadata, rootMetadata } from "@/lib/seo";

describe("seo", () => {
  it("uses the title template everywhere except Home", () => {
    expect(rootMetadata.title).toMatchObject({ template: "%s | Heal Med LLC" });
    expect(pageMetadata("/").title).toEqual({
      absolute: "HEAL · Providing a second life to your asset",
    });
    expect(pageMetadata("/service").title).toBe(seo["/service"].title);
  });

  it("gives every route a description, canonical and share image", () => {
    for (const route of Object.keys(seo) as RouteKey[]) {
      const m = pageMetadata(route);
      expect(m.description, route).toBeTruthy();
      expect(m.alternates?.canonical, route).toBe(route);
      expect(JSON.stringify(m.openGraph), route).toContain("/opengraph-image");
    }
  });
});

describe("json-ld", () => {
  it("names the business HEAL with legalName Heal Med LLC", () => {
    const lb = localBusiness();
    expect(lb.name).toBe("HEAL");
    expect(lb.legalName).toBe("Heal Med LLC");
    expect(lb).not.toHaveProperty("sameAs"); // no confirmed social or store URLs yet
  });

  it("escapes < so the script tag can't be closed early", () => {
    expect(jsonLdScript({ a: "</script>" })).not.toContain("</script>");
  });

  it("only includes answered FAQ items", () => {
    const page = faqPage([
      { question: "Q1", answer: { desktop: ["A1"] } },
      { question: "Q2", answer: null },
    ]);
    expect(page.mainEntity).toHaveLength(1);
  });
});
