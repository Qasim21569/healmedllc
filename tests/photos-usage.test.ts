import { describe, expect, it } from "vitest";
import { about } from "@/content/about";
import { contact } from "@/content/contact";
import { disposition } from "@/content/disposition";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { planning } from "@/content/planning";
import { service } from "@/content/service";
import { shop } from "@/content/shop";

/** Every photo file shipped in /public/photos is referenced by some page (no orphans). */
describe("photo files", () => {
  it("are all used", () => {
    const used = new Set<string>();
    const walk = (v: unknown, key = ""): void => {
      if (Array.isArray(v)) {
        v.forEach((x) => {
          if (key === "collage" && typeof x === "string") used.add(x);
          walk(x, key);
        });
      } else if (v && typeof v === "object") {
        for (const [k, x] of Object.entries(v)) {
          if (k === "photo" && typeof x === "string") used.add(x);
          walk(x, k);
        }
      }
    };
    [home, planning, disposition, service, about, shop, contact].forEach((m) => walk(m));
    const orphans = Object.entries(photos)
      .filter(([id, p]) => p.src && !used.has(id))
      .map(([id]) => id);
    expect(orphans).toEqual([]);
  });
});
