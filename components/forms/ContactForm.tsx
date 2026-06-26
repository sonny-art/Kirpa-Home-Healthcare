"use client";

import { useState } from "react";
import { s } from "@/lib/style";
import { submitForm, mailtoFallback, type Field } from "@/lib/forms";
import { Btn } from "@/components/Btn";
import { Check } from "@/components/DCIcon";

const FIELD = "font-family:inherit;font-size:1.05rem;color:#0C2C52;background:#fff;border:1.5px solid #D7DFE8;border-radius:11px;padding:13px 14px;width:100%";
const LABEL = "display:flex;flex-direction:column;gap:6px";
const LSPAN = "font-weight:700;color:#0C2C52;font-size:1rem";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => ((f.get(k) as string) || "").trim();
    const fields: Field[] = [
      { label: "Name", value: g("name") },
      { label: "Phone", value: g("phone") },
      { label: "Email", value: g("email") },
      { label: "Interested in", value: g("topic") },
      { label: "Message", value: g("message") },
    ];
    const subject = `Contact form, ${g("topic") || "General"}`;
    setBusy(true);
    const res = await submitForm({ formType: "contact", subject, replyTo: g("email"), fields, company: g("company") });
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
          <h2 style={s("color:#0C2C52;font-size:1.6rem;font-weight:800;margin:0 0 10px")}>Thank you, your message has been sent!</h2>
          <p style={s("color:#0b1016;font-size:1.08rem;line-height:1.6;margin:0 auto;max-width:44ch")}>A real person will get back to you soon. Need to talk right away? Call <a href="tel:+17039395287" style={s("color:#15589A;font-weight:700;text-decoration:none")}>703-939-5287</a>.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s("flex:2;min-width:300px")}>
      <form onSubmit={onSubmit} style={s("background:#fff;border:1px solid #E3E9F0;border-radius:20px;box-shadow:0 10px 30px rgba(12,44,82,.07);padding:clamp(24px,4vw,40px)")}>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={s("position:absolute;left:-9999px;width:1px;height:1px")} />
        <h2 style={s("color:#0C2C52;font-size:1.4rem;font-weight:800;margin:0 0 4px")}>Send us a message</h2>
        <p style={s("color:#283341;font-size:1rem;margin:0 0 22px")}>We&apos;ll reply by phone or email, whichever you prefer.</p>
        <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px")}>
          <label style={s(LABEL)}><span style={s(LSPAN)}>Your name <span style={s("color:#DD5A2A")}>*</span></span><input type="text" name="name" required placeholder="First and last name" autoComplete="name" className="fld" style={s(FIELD)} /></label>
          <label style={s(LABEL)}><span style={s(LSPAN)}>Phone</span><input type="tel" name="phone" placeholder="(703) 555-0100" autoComplete="tel" className="fld" style={s(FIELD)} /></label>
          <label style={s(LABEL)}><span style={s(LSPAN)}>Email <span style={s("color:#DD5A2A")}>*</span></span><input type="email" name="email" required placeholder="you@example.com" autoComplete="email" className="fld" style={s(FIELD)} /></label>
          <label style={s(LABEL)}><span style={s(LSPAN)}>I&apos;m interested in</span><select name="topic" className="fld" style={s(FIELD)}><option>Home care for a loved one</option><option>Careers / employment</option><option>Insurance &amp; billing</option><option>Something else</option></select></label>
          <label style={s(LABEL + ";grid-column:1/-1")}><span style={s(LSPAN)}>Message <span style={s("color:#DD5A2A")}>*</span></span><textarea name="message" required placeholder="How can we help?" className="fld" style={s(FIELD + ";min-height:130px;resize:vertical")} /></label>
        </div>
        <label style={s("display:flex;gap:12px;align-items:flex-start;margin-top:20px;font-size:1rem;color:#0b1016;cursor:pointer")}><input type="checkbox" name="consent" required style={s("width:22px;height:22px;margin-top:2px;flex:none;accent-color:#1466B8")} /><span>I agree to be contacted by Kirpa Home Health Care. <span style={s("color:#DD5A2A")}>*</span></span></label>
        <div style={s("margin-top:24px")}><Btn type="submit" disabled={busy} arrow={!busy}>{busy ? "Sending…" : "Send Message"}</Btn></div>
      </form>
    </div>
  );
}
