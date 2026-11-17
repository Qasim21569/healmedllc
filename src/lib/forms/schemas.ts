import { z } from "zod";
import { contactForm, fieldNouns, formStates, offerForm, serviceForm } from "@/content/forms";

/**
 * One zod schema per form (PLAYBOOK §8). Used by react-hook-form on the client
 * (zodResolver) and by the Server Action, so validation can't drift.
 */

const required = (noun: string, max = 200) =>
  z.string().trim().min(1, formStates.required(noun)).max(max);

const optional = (max = 200) => z.string().trim().max(max).optional();

const email = z
  .string()
  .trim()
  .min(1, formStates.required(fieldNouns.email))
  .pipe(z.email(formStates.badEmail));

/** Optional choice. Empty selects ("") and unchecked radios (null) mean "not given". */
const oneOf = <T extends readonly [string, ...string[]]>(options: T) =>
  z.preprocess((v) => (v === "" || v === null ? undefined : v), z.enum(options).optional());

export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
export const UPLOAD_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
  "image/jpeg",
  "image/png",
  "application/pdf",
] as const;

/** A file already uploaded to storage; the action only ever sees its URL. */
export const uploadedFile = z.object({
  url: z.url().refine((u) => u.startsWith("https://"), "Invalid file URL"),
  name: z.string().max(200),
  size: z.number().int().nonnegative().max(MAX_UPLOAD_BYTES),
});

export const offerSchema = z.object({
  name: required(fieldNouns.name),
  email,
  phone: optional(40),
  organization: required(fieldNouns.organization),
  location: required(fieldNouns.location),
  items: required(fieldNouns.items, 4000),
  timeline: oneOf(offerForm.fields.timeline.options),
  files: z.array(uploadedFile).max(10).optional(),
});

export const serviceSchema = z.object({
  name: required(fieldNouns.name),
  email,
  phone: optional(40),
  organization: required(fieldNouns.organization),
  equipmentType: oneOf(serviceForm.fields.equipmentType.options),
  makeModel: optional(200),
  issue: required(fieldNouns.issue, 4000),
  urgency: oneOf(serviceForm.fields.urgency.options),
});

export const stockSchema = z.object({
  makeModel: required(fieldNouns.makeModel),
  email,
});

export const contactSchema = z.object({
  intent: oneOf(contactForm.fields.intent.options),
  name: required(fieldNouns.name),
  email,
  phone: optional(40),
  organization: optional(200),
  message: required(fieldNouns.message, 4000),
});

export const schemas = {
  offer: offerSchema,
  service: serviceSchema,
  stock: stockSchema,
  contact: contactSchema,
} as const;

export type FormKind = keyof typeof schemas;
export type FormValues<K extends FormKind> = z.output<(typeof schemas)[K]>;
