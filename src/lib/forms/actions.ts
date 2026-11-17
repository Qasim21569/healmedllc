"use server";

import { handleSubmission, type SubmitResult } from "./submit";

/**
 * Server Actions for the four forms (D14). Each validates with the same zod
 * schema as the client, verifies Turnstile, then emails info@healmedllc.com
 * via Resend with reply-to set to the visitor. Files never pass through here:
 * the Offer form uploads straight to Vercel Blob and sends only URLs.
 */

export async function submitOffer(data: unknown, token?: string): Promise<SubmitResult> {
  return handleSubmission("offer", data, token);
}

export async function submitService(data: unknown, token?: string): Promise<SubmitResult> {
  return handleSubmission("service", data, token);
}

export async function submitStock(data: unknown, token?: string): Promise<SubmitResult> {
  return handleSubmission("stock", data, token);
}

export async function submitContact(data: unknown, token?: string): Promise<SubmitResult> {
  return handleSubmission("contact", data, token);
}
