import { SITE } from "./site";

export type Field = { label: string; value: string };
export type Attachment = { filename: string; content: string };

export type SubmitResult =
  | { ok: true }
  | { ok: false; code?: string; error?: string };

export async function submitForm(payload: {
  formType: string;
  subject: string;
  replyTo?: string;
  fields: Field[];
  attachments?: Attachment[];
  company?: string;
}): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as SubmitResult;
    if (res.ok && (data as { ok?: boolean }).ok) return { ok: true };
    return {
      ok: false,
      code: (data as { code?: string }).code,
      error: (data as { error?: string }).error,
    };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}

/** Read a File as a base64 string (no data: prefix). */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/** Build a mailto: link as a fallback if email delivery isn't configured. */
export function mailtoFallback(subject: string, fields: Field[]): string {
  const body = fields
    .filter((f) => f.value)
    .map((f) => `${f.label}: ${f.value}`)
    .join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isPhone(v: string) {
  return v.replace(/\D/g, "").length >= 7;
}
