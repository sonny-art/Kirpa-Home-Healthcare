import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL || "kirpahhc@gmail.com";
const FROM =
  process.env.CONTACT_FROM_EMAIL ||
  "Kirpa Home Health Care <onboarding@resend.dev>";

type Field = { label: string; value: string };
type Attachment = { filename: string; content: string }; // content = base64

type Payload = {
  formType?: string;
  subject?: string;
  replyTo?: string;
  fields?: Field[];
  attachments?: Attachment[];
  // Honeypot — bots fill this; humans never see it.
  company?: string;
};

const MAX_ATTACHMENT_BYTES = 1_000_000; // 1MB per file (matches the client)
const MAX_TOTAL_ATTACHMENT_BYTES = 2_500_000; // cap total payload
const MAX_ATTACHMENTS = 3;
const MAX_FIELDS = 30;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Remove CR/LF (and trim) to prevent header injection via subject / filename / replyTo.
function oneLine(s: string, max = 200) {
  return s.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(subject: string, fields: Field[]) {
  const rows = fields
    .filter((f) => f.value && f.value.trim() !== "")
    .map(
      (f) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8ee;font-weight:700;color:#14202e;vertical-align:top;white-space:nowrap;">${escapeHtml(
            f.label
          )}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8ee;color:#41525f;">${escapeHtml(
            f.value
          ).replace(/\n/g, "<br>")}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:#004B8D;color:#fff;padding:20px 24px;border-radius:14px 14px 0 0;">
        <div style="font-size:18px;font-weight:800;">Kirpa Home Health Care</div>
        <div style="font-size:14px;color:#cfe0f1;">${escapeHtml(subject)}</div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8ee;border-top:0;border-radius:0 0 14px 14px;padding:8px 10px;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table>
      </div>
      <p style="color:#6b7a87;font-size:12px;margin:16px 4px;">
        Submitted from the Kirpa Home Health Care website.
      </p>
    </div>
  </body></html>`;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept (so bots think they succeeded) but do nothing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const fields = (Array.isArray(body.fields) ? body.fields : []).slice(0, MAX_FIELDS);
  if (fields.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Nothing to send." },
      { status: 400 }
    );
  }

  const subject = oneLine(body.subject || "", 140) || "New website submission";

  // Only accept a single, well-formed reply-to address (prevents header injection).
  const replyToRaw = oneLine(body.replyTo || "", 254);
  const replyTo = EMAIL_RE.test(replyToRaw) ? replyToRaw : undefined;

  // Validate attachments: count, per-file size, and total size.
  const attachments = (body.attachments || []).filter(Boolean).slice(0, MAX_ATTACHMENTS);
  let totalBytes = 0;
  for (const a of attachments) {
    const approxBytes = Math.floor((a.content?.length || 0) * 0.75);
    totalBytes += approxBytes;
    if (approxBytes > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json(
        { ok: false, error: `${oneLine(a.filename || "File", 80)} is too large (max 1MB).` },
        { status: 413 }
      );
    }
  }
  if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Attachments are too large. Please reduce file sizes." },
      { status: 413 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the client so it can offer the email fallback.
    return NextResponse.json(
      { ok: false, code: "not_configured" },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: `[Website] ${subject}`,
      replyTo,
      html: buildHtml(subject, fields),
      attachments: attachments.map((a) => ({
        filename: oneLine(a.filename || "attachment", 120),
        content: a.content, // base64
      })),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Email could not be sent." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Email could not be sent." },
      { status: 502 }
    );
  }
}
