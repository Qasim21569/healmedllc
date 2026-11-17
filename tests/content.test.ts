import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { about } from "@/content/about";
import { contact } from "@/content/contact";
import { disposition } from "@/content/disposition";
import * as forms from "@/content/forms";
import { home } from "@/content/home";
import { notFound, privacy, terms } from "@/content/legal";
import { photos } from "@/content/photos";
import { planning } from "@/content/planning";
import { seo } from "@/content/seo";
import { service } from "@/content/service";
import { shop } from "@/content/shop";
import { site } from "@/content/site";

const content: Record<string, unknown> = {
  about,
  contact,
  disposition,
  forms,
  home,
  notFound,
  privacy,
  terms,
  photos,
  planning,
  seo,
  service,
  shop,
  site,
};

type Visit = { path: string; key: string; value: unknown };

function walk(value: unknown, path: string, visit: (v: Visit) => void, key = "") {
  visit({ path, key, value });
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${path}[${i}]`, visit, key));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`, visit, k);
  }
}

function collect<T>(pick: (v: Visit) => T | undefined): { path: string; item: T }[] {
  const out: { path: string; item: T }[] = [];
  for (const [name, mod] of Object.entries(content)) {
    walk(mod, name, (v) => {
      const item = pick(v);
      if (item !== undefined) out.push({ path: v.path, item });
    });
  }
  return out;
}

const strings = collect((v) => (typeof v.value === "string" ? v.value : undefined));

const isLines = (v: unknown): v is { desktop: string[]; mobile?: string[] } =>
  !!v && typeof v === "object" && Array.isArray((v as { desktop?: unknown }).desktop);

const lines = collect((v) => (isLines(v.value) ? v.value : undefined)).flatMap(({ path, item }) => [
  ...item.desktop.map((line, i) => ({ path: `${path}.desktop[${i}]`, line })),
  ...(item.mobile ?? []).map((line, i) => ({ path: `${path}.mobile[${i}]`, line })),
]);

describe("content copy rules", () => {
  it("has copy to check", () => {
    expect(strings.length).toBeGreaterThan(200);
    expect(lines.length).toBeGreaterThan(150);
  });

  it("uses no em dashes", () => {
    expect(strings.filter((s) => s.item.includes("\u2014")).map((s) => s.path)).toEqual([]);
  });

  it("uses no exclamation marks", () => {
    expect(strings.filter((s) => s.item.includes("!")).map((s) => s.path)).toEqual([]);
  });

  it('never says "HEAL Medical"', () => {
    expect(strings.filter((s) => /heal medical/i.test(s.item)).map((s) => s.path)).toEqual([]);
  });

  it("keeps every hand-set line at 45 characters or fewer", () => {
    const long = lines.filter((l) => l.line.length > 45).map((l) => `${l.path} (${l.line.length})`);
    expect(long).toEqual([]);
  });

  it("has no empty lines", () => {
    expect(lines.filter((l) => l.line.trim() === "").map((l) => l.path)).toEqual([]);
  });

  it("uses the legal name only as Heal Med LLC", () => {
    expect(site.legalName).toBe("Heal Med LLC");
    expect(strings.filter((s) => /heal med(?! llc)/i.test(s.item)).map((s) => s.path)).toEqual([]);
  });
});

describe("photos", () => {
  const refs = collect((v) => {
    if (v.key === "photo" && typeof v.value === "string") return v.value;
    if (v.key === "collage" && typeof v.value === "string") return v.value;
    return undefined;
  });

  it("references only photo ids that exist in photos.ts", () => {
    const missing = refs.filter((r) => !(r.item in photos)).map((r) => `${r.path}: ${r.item}`);
    expect(missing).toEqual([]);
  });

  it("has alt text and a subject for every photo", () => {
    for (const [id, p] of Object.entries(photos)) {
      expect(p.alt.length, id).toBeGreaterThan(3);
      expect(p.subject.length, id).toBeGreaterThan(2);
      expect(p.alt.toLowerCase().startsWith("photo of"), id).toBe(false);
    }
  });
});

describe("pending values", () => {
  it("keeps [confirm] / [need] values null", () => {
    expect(site.stores.ebay).toBeNull();
    expect(site.stores.dotmed).toBeNull();
    expect(site.social.linkedin).toBeNull();
    expect(site.contact.hours).toBeNull();
    expect(home.weBuy.tiles.filter((t) => t === null)).toHaveLength(1);
    expect(about.team.people[0]?.role).toBeNull();
  });

  it("shows no store buttons while store URLs are null", () => {
    expect(shop.hero.ctas).toEqual([]);
  });
});

describe("source files", () => {
  function files(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      return statSync(full).isDirectory() ? files(full) : [full];
    });
  }
  const src = files(join(process.cwd(), "src")).filter((f) => /\.(tsx?|css)$/.test(f));

  it('never says "HEAL Medical" or uses an em dash anywhere in src', () => {
    const bad = src.filter((f) => {
      const text = readFileSync(f, "utf8");
      return /HEAL Medical/i.test(text) || text.includes("\u2014");
    });
    expect(bad).toEqual([]);
  });

  it("never animates mask-size", () => {
    const bad = src.filter((f) => /mask-size|maskSize/.test(readFileSync(f, "utf8")));
    expect(bad).toEqual([]);
  });
});
