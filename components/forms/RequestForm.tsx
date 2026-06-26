"use client";

import { useState } from "react";
import { s } from "@/lib/style";
import { submitForm, mailtoFallback, type Field } from "@/lib/forms";
import { Btn } from "@/components/Btn";
import { Lock, Check } from "@/components/DCIcon";

const FIELD = "font-family:inherit;font-size:1.05rem;color:#0C2C52;background:#fff;border:1.5px solid #D7DFE8;border-radius:11px;padding:13px 14px;width:100%";
const LABEL = "display:flex;flex-direction:column;gap:6px";
const LSPAN = "font-weight:700;color:#0C2C52;font-size:1rem";
const STEPNUM = "width:30px;height:30px;border-radius:50%;background:#0C2C52;color:#fff;font-weight:800;font-size:.95rem;display:flex;align-items:center;justify-content:center;flex:none";
const STEPH = "color:#0C2C52;font-size:1.32rem;font-weight:800;margin:0";
const STEPSUB = "color:#283341;font-size:1rem;margin:8px 0 16px;padding-left:42px";

const CARE_OPTIONS = [
  { v: "Personal Care", icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
  { v: "Companionship", icon: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" /> },
  { v: "Homemaking", icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></> },
  { v: "Errands & Transportation", label: "Errands & Transport", icon: <><path d="M5 17H3v-5l2-5h14l2 5v5h-2" /><circle cx="7.5" cy="17" r="2" /><circle cx="16.5" cy="17" r="2" /><path d="M5 12h14" /></> },
  { v: "Medication Reminders", icon: <><rect x="2" y="8" width="20" height="8" rx="4" /><path d="M12 8v8" /></> },
  { v: "Respite & Family Relief", label: "Respite & Relief", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { v: "Not sure yet", icon: <><circle cx="12" cy="12" r="10" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.7-2.5 2-2.5 3.5" /><path d="M12 17h.01" /></> },
];

export function RequestForm() {
  const [care, setCare] = useState<string[]>([]);
  const [careError, setCareError] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const toggleCare = (v: string) => {
    setCareError(false);
    setCare((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  };

  const chip = (on: boolean) =>
    s(`display:flex;gap:13px;align-items:center;padding:16px 18px;border:2px solid ${on ? "#1466B8" : "#E3E9F0"};background:${on ? "#EAF2FB" : "#fff"};border-radius:13px;cursor:pointer;box-shadow:${on ? "inset 0 0 0 1px #1466B8" : "none"}`);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const g = (k: string) => ((f.get(k) as string) || "").trim();
    const custom = g("custom");
    if (care.length === 0 && !custom) {
      setCareError(true);
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const services = care.join(", ");
    const fields: Field[] = [
      { label: "Services requested", value: services || "(see custom request)" },
      { label: "Other / custom request", value: custom },
      { label: "Care is for", value: g("recipient") },
      { label: "Care recipient name", value: g("recipientName") },
      { label: "City / area", value: g("city") },
      { label: "Hours needed", value: g("hours") },
      { label: "Your name", value: g("yourName") },
      { label: "Phone", value: g("phone") },
      { label: "Email", value: g("email") },
      { label: "Best time to reach", value: g("bestTime") },
      { label: "Details", value: g("details") },
    ];
    const careSummary = care.length > 1 ? `${care[0]} +${care.length - 1} more` : care[0] || "custom request";
    const subject = `Service request, ${careSummary} (${g("city")})`;
    setBusy(true);
    const res = await submitForm({ formType: "request-service", subject, replyTo: g("email"), fields, company: g("company") });
    if (!res.ok && res.code === "not_configured") {
      const a = document.createElement("a");
      a.href = mailtoFallback(subject, fields);
      a.click();
    }
    setBusy(false);
    setSent(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, left: 0 });
  }

  if (sent) {
    return (
      <div style={s("flex:2;min-width:300px")}>
        <div style={s("background:#fff;border:1px solid #E3E9F0;border-radius:20px;box-shadow:0 10px 30px rgba(12,44,82,.07);padding:clamp(32px,5vw,52px);text-align:center")}>
          <span style={s("width:78px;height:78px;border-radius:50%;background:#E7F6EC;color:#1A9E4B;display:flex;align-items:center;justify-content:center;margin:0 auto 20px")}><Check size={40} sw={2.5} /></span>
          <h2 style={s("color:#0C2C52;font-size:1.7rem;font-weight:800;margin:0 0 10px")}>Thank you, your request has been sent!</h2>
          <p style={s("color:#0b1016;font-size:1.1rem;line-height:1.6;margin:0 auto;max-width:46ch")}>A member of our team will reach out to talk through your needs and the right care plan. If you&apos;d like to speak with us sooner, call <a href="tel:+17039395287" style={s("color:#15589A;font-weight:700;text-decoration:none")}>703-939-5287</a>.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s("flex:2;min-width:300px")}>
      <form onSubmit={onSubmit} style={s("background:#fff;border:1px solid #E3E9F0;border-radius:20px;box-shadow:0 10px 30px rgba(12,44,82,.07);padding:clamp(24px,4vw,40px)")}>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={s("position:absolute;left:-9999px;width:1px;height:1px")} />

        {/* Step 1 */}
        <div style={s("margin-bottom:28px")}>
          <div style={s("display:flex;align-items:center;gap:12px")}><span style={s(STEPNUM)}>1</span><h2 style={s(STEPH)}>What type of care are you looking for?</h2></div>
          <p style={s(STEPSUB)}>Choose all that apply, we&apos;ll tailor the details together.</p>
          <div role="group" aria-label="Type of care, select all that apply" style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px")}>
            {CARE_OPTIONS.map((c) => {
              const on = care.includes(c.v);
              return (
                <div key={c.v} role="button" tabIndex={0} aria-pressed={on}
                  onClick={() => toggleCare(c.v)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCare(c.v); } }}
                  style={chip(on)}>
                  <span style={s("width:40px;height:40px;border-radius:11px;background:#EAF2FB;color:#1466B8;display:flex;align-items:center;justify-content:center;flex:none")}>
                    <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c.icon}</svg>
                  </span>
                  <strong style={s("color:#0C2C52;font-size:1.02rem;font-weight:700")}>{c.label || c.v}</strong>
                  {on && <span style={s("margin-left:auto;color:#1466B8;display:inline-flex;flex:none")} aria-hidden="true"><Check size={20} sw={2.6} /></span>}
                </div>
              );
            })}
          </div>
          <label style={s(LABEL + ";margin-top:14px")}><span style={s(LSPAN)}>Other care or a specific request <span style={s("color:#283341;font-weight:500")}>(optional)</span></span>
            <textarea name="custom" onChange={() => setCareError(false)} placeholder="Tell us about anything else you need, e.g. overnight care, dementia experience, a specific schedule…" className="fld" style={s(FIELD + ";min-height:84px;resize:vertical")} />
          </label>
          {careError && <p role="alert" style={s("color:#C0392B;font-size:.98rem;margin:12px 0 0;font-weight:600")}>Please pick at least one type of care, or describe your request above.</p>}
        </div>

        <hr style={s("border:0;border-top:1px solid #E3E9F0;margin:26px 0")} />

        {/* Step 2 */}
        <div style={s("margin-bottom:28px")}>
          <div style={s("display:flex;align-items:center;gap:12px")}><span style={s(STEPNUM)}>2</span><h2 style={s(STEPH)}>Who is the care for?</h2></div>
          <p style={s(STEPSUB)}>A few quick details about the person who will receive care.</p>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px")}>
            <label style={s(LABEL)}><span style={s(LSPAN)}>Care is for <span style={s("color:#DD5A2A")}>*</span></span>
              <select name="recipient" required className="fld" style={s(FIELD)}><option value="">Select one…</option><option>My parent</option><option>My spouse / partner</option><option>Myself</option><option>Another family member</option><option>A client / patient</option></select>
            </label>
            <label style={s(LABEL)}><span style={s(LSPAN)}>Care recipient&apos;s first name</span><input type="text" name="recipientName" placeholder="e.g. Margaret" className="fld" style={s(FIELD)} /></label>
            <label style={s(LABEL)}><span style={s(LSPAN)}>City / area <span style={s("color:#DD5A2A")}>*</span></span><input type="text" name="city" required placeholder="e.g. Ashburn, VA" className="fld" style={s(FIELD)} /></label>
            <label style={s(LABEL)}><span style={s(LSPAN)}>Estimated hours needed</span>
              <select name="hours" className="fld" style={s(FIELD)}><option value="">Select…</option><option>A few hours a week</option><option>Several hours, a few days a week</option><option>Daily (part-time)</option><option>Daily (full-time)</option><option>Nighttime hours</option><option>Around the clock</option><option>Not sure yet</option></select>
            </label>
          </div>
        </div>

        <hr style={s("border:0;border-top:1px solid #E3E9F0;margin:26px 0")} />

        {/* Step 3 */}
        <div>
          <div style={s("display:flex;align-items:center;gap:12px")}><span style={s(STEPNUM)}>3</span><h2 style={s(STEPH)}>How can we reach you?</h2></div>
          <p style={s(STEPSUB)}>We&apos;ll use this only to follow up about care.</p>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px")}>
            <label style={s(LABEL)}><span style={s(LSPAN)}>Your name <span style={s("color:#DD5A2A")}>*</span></span><input type="text" name="yourName" required placeholder="First and last name" autoComplete="name" className="fld" style={s(FIELD)} /></label>
            <label style={s(LABEL)}><span style={s(LSPAN)}>Phone <span style={s("color:#DD5A2A")}>*</span></span><input type="tel" name="phone" required placeholder="(703) 555-0100" autoComplete="tel" className="fld" style={s(FIELD)} /></label>
            <label style={s(LABEL)}><span style={s(LSPAN)}>Email <span style={s("color:#DD5A2A")}>*</span></span><input type="email" name="email" required placeholder="you@example.com" autoComplete="email" className="fld" style={s(FIELD)} /></label>
            <label style={s(LABEL)}><span style={s(LSPAN)}>Best time to reach you</span>
              <select name="bestTime" className="fld" style={s(FIELD)}><option value="">Select…</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Anytime</option></select>
            </label>
            <label style={s(LABEL + ";grid-column:1/-1")}><span style={s(LSPAN)}>Anything else we should know? <span style={s("color:#283341;font-weight:500")}>(optional)</span></span><textarea name="details" placeholder="Mobility, conditions, languages spoken, schedule notes, insurance questions…" className="fld" style={s(FIELD + ";min-height:120px;resize:vertical")} /></label>
          </div>
        </div>

        <label style={s("display:flex;gap:12px;align-items:flex-start;margin-top:22px;font-size:1rem;color:#0b1016;cursor:pointer")}><input type="checkbox" name="consent" required style={s("width:22px;height:22px;margin-top:2px;flex:none;accent-color:#1466B8")} /><span>I agree to be contacted by Kirpa Home Health Care about my request. <span style={s("color:#DD5A2A")}>*</span></span></label>

        <div style={s("display:flex;flex-wrap:wrap;gap:16px;align-items:center;margin-top:26px")}>
          <Btn type="submit" disabled={busy} arrow={!busy}>{busy ? "Sending…" : "Submit Request"}</Btn>
          <span style={s("display:inline-flex;align-items:center;gap:7px;color:#283341;font-size:.95rem")}><Lock size={16} />Your information is kept private.</span>
        </div>
      </form>
    </div>
  );
}
