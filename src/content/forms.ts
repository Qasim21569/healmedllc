/**
 * Form copy for all four forms (CONTENT.md). Schemas in src/lib/forms/schemas.ts
 * use the same field names. `required` here drives the label marker and the
 * "Please add your {field}." message; the zod schema is the source of truth.
 */

export const formStates = {
  required: (field: string) => `Please add your ${field}.`,
  badEmail: "That email doesn't look right. Check for typos.",
  sending: "Sending…",
  success: "Thanks. We've got your request and will reply by email.",
  error:
    "Something went wrong and your message didn't send. Try again, or email info@healmedllc.com.",
  spamNote: "Protected by an invisible spam check. We reply by email.",
  optional: "Optional",
  requiredMarker: "Required",
  fileTooBig: "That file is over 20 MB. Try a smaller file or email it to info@healmedllc.com.",
  fileType: "Use an xlsx, csv, jpg, png or pdf file.",
  uploading: "Uploading…",
  uploadFailed:
    "That file didn't upload. You can still send the form and email the file to info@healmedllc.com.",
  successTitle: "Request sent",
  removeFile: "Remove",
} as const;

/** Lower-case nouns used in "Please add your {field}." */
export const fieldNouns = {
  name: "name",
  email: "work email",
  organization: "organization",
  location: "facility location",
  items: "list of equipment",
  issue: "description of the issue",
  message: "message",
  makeModel: "make and model",
} as const;

export const commonFields = {
  name: { label: "Name", autoComplete: "name" },
  email: { label: "Work email", autoComplete: "email" },
  phone: { label: "Phone", autoComplete: "tel" },
  organization: { label: "Organization", autoComplete: "organization" },
} as const;

export const offerForm = {
  fields: {
    location: { label: "Facility location", placeholder: "City, state" },
    items: {
      label: "What are you selling?",
      placeholder: "e.g. 6 ventilators, 2 ultrasound carts",
    },
    timeline: {
      label: "Timeline",
      options: ["As soon as possible", "1 to 3 months", "Just exploring"],
    },
    files: {
      label: "Upload a list or photos",
      hint: "xlsx, csv, jpg, up to 20 MB",
      button: "Choose files",
    },
  },
  submit: "Request an offer",
  subject: "Offer request",
} as const;

export const serviceForm = {
  fields: {
    equipmentType: {
      label: "Equipment type",
      options: ["Ventilator", "Ultrasound", "Histology", "Other"],
    },
    makeModel: { label: "Make and model", placeholder: "As printed on the device label" },
    issue: { label: "What's happening?" },
    urgency: {
      label: "How urgent?",
      options: ["Down now", "This week", "Planning ahead"],
    },
  },
  submit: "Send service request",
  subject: "Service request",
} as const;

export const stockForm = {
  fields: {
    makeModel: { label: "Make and model" },
    email: { label: "Work email" },
  },
  submit: "Check stock",
  subject: "Stock check",
} as const;

export const contactForm = {
  fields: {
    intent: {
      label: "I'm looking to",
      options: [
        "Sell equipment",
        "Buy equipment",
        "Get service",
        "Plan equipment",
        "Something else",
      ],
    },
    message: { label: "Message" },
  },
  submit: "Send message",
  subject: "Message",
} as const;
