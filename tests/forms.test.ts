import { afterEach, describe, expect, it, vi } from "vitest";
import { emailBody, emailSubject } from "@/lib/forms/email";
import { contactSchema, offerSchema, serviceSchema, stockSchema } from "@/lib/forms/schemas";
import { handleSubmission, verifyTurnstile } from "@/lib/forms/submit";
import { formStates } from "@/content/forms";

const offer = {
  name: "Dana Lee",
  email: "dana@stmary.org",
  phone: "",
  organization: "St Mary's Hospital",
  location: "Fresno, CA",
  items: "6 ventilators, 2 ultrasound carts",
  timeline: "1 to 3 months",
};

afterEach(() => vi.restoreAllMocks());

describe("schemas", () => {
  it("accepts a complete offer", () => {
    expect(offerSchema.safeParse(offer).success).toBe(true);
  });

  it("treats empty selects and unchecked radios as not given", () => {
    const r = offerSchema.safeParse({ ...offer, timeline: "" });
    expect(r.success && r.data.timeline).toBe(undefined);
    expect(
      contactSchema.safeParse({ name: "A", email: "a@b.co", message: "Hi", intent: null }).success,
    ).toBe(true);
  });

  it("rejects a missing required field with the form copy", () => {
    const r = offerSchema.safeParse({ ...offer, organization: "  " });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].message).toBe(formStates.required("organization"));
  });

  it("rejects a bad email with the form copy", () => {
    const r = stockSchema.safeParse({ makeModel: "Philips V60", email: "nope@" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].message).toBe(formStates.badEmail);
  });

  it("rejects options that are not in the list", () => {
    expect(
      serviceSchema.safeParse({
        name: "A",
        email: "a@b.co",
        organization: "Clinic",
        issue: "Alarm fault",
        urgency: "Yesterday",
      }).success,
    ).toBe(false);
  });

  it("only accepts https file URLs under 20 MB", () => {
    const file = {
      url: "https://x.public.blob.vercel-storage.com/list-abc.xlsx",
      name: "list.xlsx",
      size: 1000,
    };
    expect(offerSchema.safeParse({ ...offer, files: [file] }).success).toBe(true);
    expect(
      offerSchema.safeParse({ ...offer, files: [{ ...file, url: "http://x/y" }] }).success,
    ).toBe(false);
    expect(
      offerSchema.safeParse({ ...offer, files: [{ ...file, size: 21 * 1024 * 1024 }] }).success,
    ).toBe(false);
  });
});

describe("handleSubmission", () => {
  it("returns success without RESEND_API_KEY (dev fallback logs the email)", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = await handleSubmission("offer", offer, undefined, {});
    expect(result).toEqual({ ok: true });
    expect(log).toHaveBeenCalledOnce();
    expect(String(log.mock.calls[0][0])).toContain("Offer request · St Mary's Hospital");
  });

  it("returns field errors for invalid input", async () => {
    const result = await handleSubmission(
      "contact",
      { name: "", email: "x", message: "" },
      undefined,
      {},
    );
    expect(result.ok).toBe(false);
    if (!result.ok && result.error === "validation") {
      expect(Object.keys(result.fieldErrors).sort()).toEqual(["email", "message", "name"]);
    }
  });

  it("rejects when Turnstile is configured and the token fails", async () => {
    const fetchImpl = vi.fn(
      async () => new Response(JSON.stringify({ success: false })),
    ) as unknown as typeof fetch;
    const result = await handleSubmission(
      "stock",
      { makeModel: "GE Logiq", email: "a@b.co" },
      "bad",
      { TURNSTILE_SECRET_KEY: "s" },
      fetchImpl,
    );
    expect(result).toEqual({ ok: false, error: "spam" });
  });
});

describe("verifyTurnstile", () => {
  it("fails without a token when a secret is set", async () => {
    expect(await verifyTurnstile(undefined, { TURNSTILE_SECRET_KEY: "s" })).toBe(false);
  });

  it("passes a valid token", async () => {
    const fetchImpl = vi.fn(
      async () => new Response(JSON.stringify({ success: true })),
    ) as unknown as typeof fetch;
    expect(await verifyTurnstile("t", { TURNSTILE_SECRET_KEY: "s" }, fetchImpl)).toBe(true);
  });
});

describe("email", () => {
  it("uses the contact intent as the subject", () => {
    expect(
      emailSubject("contact", {
        intent: "Get service",
        name: "Sam",
        email: "s@x.co",
        message: "Hi",
      }),
    ).toBe("[HEAL website] Get service · Sam");
  });

  it("lists filled fields and escapes HTML", () => {
    const { text, html } = emailBody("offer", {
      ...offer,
      items: "<b>2 pumps</b>",
      phone: undefined,
      timeline: undefined,
    });
    expect(text).toContain("What are you selling?:\n<b>2 pumps</b>");
    expect(text).not.toContain("Phone");
    expect(html).toContain("&lt;b&gt;2 pumps&lt;/b&gt;");
  });
});
