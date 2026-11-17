import { commonFields, contactForm, offerForm, serviceForm, stockForm } from "@/content/forms";
import type { FormKind, FormValues } from "./schemas";

/** Human labels for every field, in the order they appear in the email. */
const labels: Record<string, string> = {
  intent: contactForm.fields.intent.label,
  name: commonFields.name.label,
  email: commonFields.email.label,
  phone: commonFields.phone.label,
  organization: commonFields.organization.label,
  location: offerForm.fields.location.label,
  items: offerForm.fields.items.label,
  timeline: offerForm.fields.timeline.label,
  equipmentType: serviceForm.fields.equipmentType.label,
  makeModel: serviceForm.fields.makeModel.label,
  issue: serviceForm.fields.issue.label,
  urgency: serviceForm.fields.urgency.label,
  message: contactForm.fields.message.label,
  files: offerForm.fields.files.label,
};

const subjects: Record<FormKind, string> = {
  offer: offerForm.subject,
  service: serviceForm.subject,
  stock: stockForm.subject,
  contact: contactForm.subject,
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Subject line, e.g. "[HEAL website] Offer request · St Mary's Hospital". */
export function emailSubject<K extends FormKind>(kind: K, data: FormValues<K>): string {
  const d = data as Record<string, unknown>;
  const title = kind === "contact" && d.intent ? String(d.intent) : subjects[kind];
  const who = String(d.organization || d.name || d.email || "").trim();
  return `[HEAL website] ${title}${who ? ` · ${who}` : ""}`.slice(0, 200);
}

/** Plain-text and simple HTML bodies listing every filled field. */
export function emailBody<K extends FormKind>(kind: K, data: FormValues<K>) {
  const rows: [string, string][] = [];
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value === undefined || value === null || value === "") continue;
    if (key === "files" && Array.isArray(value)) {
      if (value.length === 0) continue;
      rows.push([
        labels.files,
        value
          .map(
            (f: { name: string; url: string; size: number }) =>
              `${f.name} (${Math.ceil(f.size / 1024)} KB): ${f.url}`,
          )
          .join("\n"),
      ]);
      continue;
    }
    rows.push([labels[key] ?? key, String(value)]);
  }

  const text = [
    `New ${subjects[kind].toLowerCase()} from the HEAL website`,
    "",
    ...rows.map(([k, v]) => `${k}:\n${v}\n`),
  ].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#1F1A3D">
<p style="margin:0 0 16px">New ${escapeHtml(subjects[kind].toLowerCase())} from the HEAL website</p>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top;color:#5F5E6B;white-space:nowrap">${escapeHtml(k)}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table></div>`;

  return { text, html };
}
