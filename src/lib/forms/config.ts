import { commonFields, contactForm, offerForm, serviceForm, stockForm } from "@/content/forms";
import { submitContact, submitOffer, submitService, submitStock } from "./actions";
import type { FormKind } from "./schemas";
import type { SubmitResult } from "./submit";

export type FieldDef = {
  name: string;
  kind: "text" | "email" | "tel" | "textarea" | "select" | "chips" | "files";
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  options?: readonly string[];
  autoComplete?: string;
  /** Spans both columns from 768px. */
  wide?: boolean;
};

export type FormConfig = {
  fields: FieldDef[];
  submit: string;
  action: (data: unknown, token?: string) => Promise<SubmitResult>;
};

const name: FieldDef = { name: "name", kind: "text", required: true, ...commonFields.name };
const email: FieldDef = { name: "email", kind: "email", required: true, ...commonFields.email };
const phone: FieldDef = { name: "phone", kind: "tel", ...commonFields.phone };
const organization: FieldDef = {
  name: "organization",
  kind: "text",
  required: true,
  ...commonFields.organization,
};

/** Field layout for each form; copy from content/forms.ts. */
export const formConfigs: Record<FormKind, FormConfig> = {
  offer: {
    submit: offerForm.submit,
    action: submitOffer,
    fields: [
      name,
      email,
      phone,
      organization,
      { name: "location", kind: "text", required: true, wide: true, ...offerForm.fields.location },
      { name: "items", kind: "textarea", required: true, wide: true, ...offerForm.fields.items },
      { name: "timeline", kind: "select", wide: true, ...offerForm.fields.timeline },
      {
        name: "files",
        kind: "files",
        wide: true,
        label: offerForm.fields.files.label,
        hint: offerForm.fields.files.hint,
        placeholder: offerForm.fields.files.button,
      },
    ],
  },
  service: {
    submit: serviceForm.submit,
    action: submitService,
    fields: [
      name,
      email,
      phone,
      organization,
      { name: "equipmentType", kind: "select", ...serviceForm.fields.equipmentType },
      { name: "makeModel", kind: "text", ...serviceForm.fields.makeModel },
      { name: "issue", kind: "textarea", required: true, wide: true, ...serviceForm.fields.issue },
      { name: "urgency", kind: "chips", wide: true, ...serviceForm.fields.urgency },
    ],
  },
  stock: {
    submit: stockForm.submit,
    action: submitStock,
    fields: [
      { name: "makeModel", kind: "text", required: true, ...stockForm.fields.makeModel },
      {
        name: "email",
        kind: "email",
        required: true,
        autoComplete: "email",
        ...stockForm.fields.email,
      },
    ],
  },
  contact: {
    submit: contactForm.submit,
    action: submitContact,
    fields: [
      { name: "intent", kind: "chips", wide: true, ...contactForm.fields.intent },
      name,
      email,
      phone,
      { ...organization, required: false },
      {
        name: "message",
        kind: "textarea",
        required: true,
        wide: true,
        ...contactForm.fields.message,
      },
    ],
  },
};
