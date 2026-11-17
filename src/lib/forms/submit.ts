import { Resend } from "resend";
import { emailBody, emailSubject } from "./email";
import { schemas, type FormKind, type FormValues } from "./schemas";

/**
 * Framework-free submission pipeline (PLAYBOOK §8), so it can be unit-tested:
 * validate with the same zod schema → verify Turnstile → send with Resend.
 * The Server Actions in actions.ts are thin wrappers around this.
 */

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: "validation"; fieldErrors: Record<string, string> }
  | { ok: false; error: "spam" | "send" };

type Env = Partial<Record<string, string | undefined>>;

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Server-side Turnstile check. With no secret configured (local dev) the check
 * is skipped with a warning; production must set TURNSTILE_SECRET_KEY
 * (launch checklist).
 */
export async function verifyTurnstile(
  token: string | undefined,
  env: Env,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[forms] TURNSTILE_SECRET_KEY not set: spam check skipped");
    return true;
  }
  if (!token) return false;
  try {
    const res = await fetchImpl(SITEVERIFY, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

/**
 * Sends the email. Without RESEND_API_KEY (local dev) it logs the payload and
 * reports success, so the UI can be tested end to end.
 */
export async function sendFormEmail<K extends FormKind>(
  kind: K,
  data: FormValues<K>,
  env: Env,
): Promise<boolean> {
  const subject = emailSubject(kind, data);
  const { text, html } = emailBody(kind, data);

  if (!env.RESEND_API_KEY) {
    // Dev fallback (PLAYBOOK §8): the only console.log in src.
    console.log(`[forms] RESEND_API_KEY not set. Would send:\n${subject}\n\n${text}`);
    return true;
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL || "HEAL website <website@healmedllc.com>",
    to: env.CONTACT_TO_EMAIL || "info@healmedllc.com",
    replyTo: (data as { email: string }).email,
    subject,
    text,
    html,
  });
  if (error) console.error("[forms] Resend error", error);
  return !error;
}

export async function handleSubmission<K extends FormKind>(
  kind: K,
  raw: unknown,
  token: string | undefined,
  env: Env = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  const parsed = schemas[kind].safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, error: "validation", fieldErrors };
  }

  if (!(await verifyTurnstile(token, env, fetchImpl))) return { ok: false, error: "spam" };

  try {
    const sent = await sendFormEmail(kind, parsed.data as FormValues<K>, env);
    return sent ? { ok: true } : { ok: false, error: "send" };
  } catch (err) {
    console.error("[forms] send failed", err);
    return { ok: false, error: "send" };
  }
}
