"use client";

import { useState } from "react";
import { s } from "@/lib/style";
import { submitForm, fileToBase64, mailtoFallback, type Field, type Attachment } from "@/lib/forms";
import { Btn } from "@/components/Btn";
import { Check, Upload } from "@/components/DCIcon";

const FIELD = "font-family:inherit;font-size:1.05rem;color:#0C2C52;background:#fff;border:1.5px solid #D7DFE8;border-radius:11px;padding:13px 14px;width:100%";
const LABEL = "display:flex;flex-direction:column;gap:6px";
const LSPAN = "font-weight:700;color:#0C2C52;font-size:1rem";
const ATTACH_MAX = 950_000; // attach inline if under ~1MB (API limit)

export function CareerForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => ((f.get(k) as string) || "").trim();

    const attachments: Attachment[] = [];
    let resumeNote = "No";
    if (file) {
      if (file.size <= ATTACH_MAX) {
        try {
          attachments.push({ filename: file.name, content: await fileToBase64(file) });
          resumeNote = file.name;
        } catch {
          resumeNote = `${file.name} (attachment failed)`;
        }
      } else {
        resumeNote = `${file.name}, to be sent separately (too large to attach)`;
      }
    }

    const fields: Field[] = [
      { label: "Full name", value: g("name") },
      { label: "Phone", value: g("phone") },
      { label: "Email", value: g("email") },
      { label: "Availability", value: g("availability") },
      { label: "Position of interest", value: g("position") },
      { label: "Years of experience", value: g("experience") },
      { label: "About", value: g("about") },
      { label: "Resume", value: resumeNote },
    ];
    const subject = `Job application, ${g("name")}${g("position") ? ` (${g("position")})` : ""}`;
    setBusy(true);
    const res = await submitForm({ formType: "careers", subject, replyTo: g("email"), fields, attachments, company: g("company") });
    if (!res.ok && res.code === "not_configured") {
      const a = document.createElement("a");
      a.href = mailtoFallback(subject, fields);
      a.click();
    }
    setBusy(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div style={s("flex:2;min-width:300px")}>
        <div style={s("background:#fff;border:1px solid #E3E9F0;border-radius:20px;box-shadow:0 10px 30px rgba(12,44,82,.07);padding:clamp(32px,5vw,52px);text-align:center")}>
          <span style={s("width:72px;height:72px;border-radius:50%;background:#E7F6EC;color:#1A9E4B;display:flex;align-items:center;justify-content:center;margin:0 auto 18px")}><Check size={38} sw={2.5} /></span>
          <h2 style={s("color:#0C2C52;font-size:1.6rem;font-weight:800;margin:0 0 10px")}>Thank you for applying!</h2>
          <p style={s("color:#0b1016;font-size:1.08rem;line-height:1.6;margin:0 auto;max-width:44ch")}>We&apos;ve received your application and our team will be in touch. Questions? Call <a href="tel:+17039395287" style={s("color:#15589A;font-weight:700;text-decoration:none")}>703-939-5287</a>.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s("flex:2;min-width:300px")}>
      <form onSubmit={onSubmit} style={s("background:#fff;border:1px solid #E3E9F0;border-radius:20px;box-shadow:0 10px 30px rgba(12,44,82,.07);padding:clamp(24px,4vw,40px)")}>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={s("position:absolute;left:-9999px;width:1px;height:1px")} />
        <h2 style={s("color:#0C2C52;font-size:1.4rem;font-weight:800;margin:0 0 4px")}>Apply to join our team</h2>
        <p style={s("color:#283341;font-size:1rem;margin:0 0 22px")}>Tell us a little about yourself, it only takes a few minutes.</p>
        <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px")}>
          <label style={s(LABEL)}><span style={s(LSPAN)}>Full name <span style={s("color:#DD5A2A")}>*</span></span><input type="text" name="name" required placeholder="First and last name" autoComplete="name" className="fld" style={s(FIELD)} /></label>
          <label style={s(LABEL)}><span style={s(LSPAN)}>Phone <span style={s("color:#DD5A2A")}>*</span></span><input type="tel" name="phone" required placeholder="(703) 555-0100" autoComplete="tel" className="fld" style={s(FIELD)} /></label>
          <label style={s(LABEL)}><span style={s(LSPAN)}>Email <span style={s("color:#DD5A2A")}>*</span></span><input type="email" name="email" required placeholder="you@example.com" autoComplete="email" className="fld" style={s(FIELD)} /></label>
          <label style={s(LABEL)}><span style={s(LSPAN)}>Availability</span><select name="availability" className="fld" style={s(FIELD)}><option>Full-time</option><option>Part-time</option><option>Either</option></select></label>
          <label style={s(LABEL)}><span style={s(LSPAN)}>Position of interest</span><select name="position" className="fld" style={s(FIELD)}><option>Caregiver</option><option>Certified Nursing Assistant (CNA)</option><option>Companion</option><option>Homemaker</option><option>Other</option></select></label>
          <label style={s(LABEL)}><span style={s(LSPAN)}>Years of experience</span><select name="experience" className="fld" style={s(FIELD)}><option>Less than 1 year</option><option>1-3 years</option><option>3-5 years</option><option>5+ years</option></select></label>
          <label style={s(LABEL + ";grid-column:1/-1")}><span style={s(LSPAN)}>Tell us about yourself</span><textarea name="about" placeholder="Your experience, certifications, and why you'd like to join Kirpa…" className="fld" style={s(FIELD + ";min-height:120px;resize:vertical")} /></label>
        </div>

        <label
          className="hv-drop"
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); const ff = e.dataTransfer.files?.[0]; if (ff) setFile(ff); }}
          style={s(`grid-column:1/-1;margin-top:16px;border:1.5px dashed ${drag ? "#1466B8" : "#B7D0E8"};background:${drag ? "#E4EFF8" : "#EFF5FB"};border-radius:12px;padding:22px;text-align:center;cursor:pointer;display:block`)}
        >
          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} style={s("display:none")} />
          <Upload size={28} color="#1466B8" style={s("margin:0 auto 8px")} />
          <div style={s("color:#0C2C52;font-size:1.02rem")}><strong style={s("color:#15589A")}>Upload your resume</strong> or drag &amp; drop</div>
          <div style={s("color:#283341;font-size:.9rem;margin-top:4px")}>{file ? `✓ ${file.name}` : "PDF or Word, up to 10MB"}</div>
        </label>

        <label style={s("display:flex;gap:12px;align-items:flex-start;margin-top:20px;font-size:1rem;color:#0b1016;cursor:pointer")}><input type="checkbox" name="consent" required style={s("width:22px;height:22px;margin-top:2px;flex:none;accent-color:#1466B8")} /><span>I agree to be contacted by Kirpa Home Health Care about my application. <span style={s("color:#DD5A2A")}>*</span></span></label>
        <div style={s("margin-top:24px")}><Btn type="submit" disabled={busy} arrow={!busy}>{busy ? "Submitting…" : "Submit Application"}</Btn></div>
      </form>
    </div>
  );
}
