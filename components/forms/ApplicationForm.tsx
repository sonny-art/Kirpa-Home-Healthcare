"use client";

import { useState } from "react";
import { s } from "@/lib/style";
import { Btn } from "@/components/Btn";
import { Check } from "@/components/DCIcon";

const FIELD = "font-family:inherit;font-size:1.02rem;color:#0C2C52;background:#fff;border:1.5px solid #D7DFE8;border-radius:11px;padding:12px 13px;width:100%;box-sizing:border-box";
const LABEL = "display:flex;flex-direction:column;gap:6px;min-width:0";
const LSPAN = "font-weight:700;color:#0C2C52;font-size:.98rem";
const GRID = "display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px";
const H3 = "color:#0C2C52;font-size:1.16rem;font-weight:800;margin:0;display:flex;align-items:center;gap:10px";
const SECTION = "border-top:1px solid #E3E9F0;margin-top:26px;padding-top:22px;display:grid;gap:16px";
const RADIO = "display:inline-flex;align-items:center;gap:8px;font-size:1rem;color:#0b1016;cursor:pointer;margin-right:18px";
const DETAILS = "border:1px solid #E3E9F0;border-radius:12px;padding:0;background:#F8FBFD";
const SUMMARY = "cursor:pointer;font-weight:700;color:#15589A;font-size:1rem;padding:14px 16px;list-style-position:inside";
const DBODY = "padding:2px 16px 16px;display:grid;gap:14px";
const REQ = <span style={{ color: "#DD5A2A" }}>*</span>;

function Txt(p: { label: React.ReactNode; name: string; span?: boolean; required?: boolean; type?: string; placeholder?: string; auto?: string }) {
  return (
    <label style={s(LABEL + (p.span ? ";grid-column:1/-1" : ""))}>
      <span style={s(LSPAN)}>{p.label} {p.required ? REQ : null}</span>
      <input type={p.type || "text"} name={p.name} required={p.required} placeholder={p.placeholder} autoComplete={p.auto} className="fld" style={s(FIELD)} />
    </label>
  );
}

function Choice(p: { label: string; name: string; options: [string, string][] }) {
  return (
    <div style={s("grid-column:1/-1")}>
      <div style={s(LSPAN + ";margin-bottom:8px")}>{p.label}</div>
      {p.options.map(([value, text]) => (
        <label key={value} style={s(RADIO)}>
          <input type="radio" name={p.name} value={value} style={s("width:19px;height:19px;accent-color:#1466B8")} />
          {text}
        </label>
      ))}
    </div>
  );
}

function YesNo(p: { label: string; name: string }) {
  return <Choice label={p.label} name={p.name} options={[["yes", "Yes"], ["no", "No"]]} />;
}

function PayRow(p: { label: string; name: string }) {
  return (
    <div style={s("display:flex;flex-wrap:wrap;align-items:flex-end;gap:14px")}>
      <label style={s(LABEL + ";flex:1;min-width:150px")}>
        <span style={s(LSPAN)}>{p.label}</span>
        <input type="text" name={p.name} placeholder="$" className="fld" style={s(FIELD)} />
      </label>
      <div style={s("padding-bottom:12px")}>
        <label style={s(RADIO)}><input type="radio" name={`${p.name}Type`} value="hour" style={s("width:19px;height:19px;accent-color:#1466B8")} />Per hour</label>
        <label style={s(RADIO)}><input type="radio" name={`${p.name}Type`} value="salary" style={s("width:19px;height:19px;accent-color:#1466B8")} />Salary</label>
      </div>
    </div>
  );
}

function EmployerBlock(p: { n: number }) {
  const k = `emp${p.n}`;
  return (
    <>
      <div style={s(GRID)}>
        <Txt label={`Employer #${p.n}`} name={`${k}Name`} />
        <Txt label="Job title" name={`${k}Title`} />
        <Txt label="Phone" name={`${k}Phone`} type="tel" />
        <Txt label="E-mail" name={`${k}Email`} type="email" />
        <Txt label="Address" name={`${k}Address`} span />
        <Txt label="City" name={`${k}City`} />
        <Txt label="State" name={`${k}State`} />
        <Txt label="ZIP code" name={`${k}Zip`} />
        <Txt label="Starting date" name={`${k}StartDate`} placeholder="MM/YYYY" />
        <Txt label="Ending date" name={`${k}EndDate`} placeholder="MM/YYYY or Present" />
        <Txt label="Responsibilities" name={`${k}Responsibilities`} span />
        <Txt label="Reason for leaving" name={`${k}Reason`} span />
      </div>
      <PayRow label="Starting pay" name={`${k}StartPay`} />
      <PayRow label="Ending pay" name={`${k}EndPay`} />
    </>
  );
}

function ReferenceBlock(p: { n: number }) {
  const k = `ref${p.n}`;
  return (
    <div style={s(GRID)}>
      <Txt label={`Reference #${p.n}`} name={`${k}Name`} placeholder="Full name" />
      <Txt label="Relationship" name={`${k}Relationship`} />
      <Txt label="Company" name={`${k}Company`} />
      <Txt label="Title" name={`${k}Title`} />
      <Txt label="E-mail" name={`${k}Email`} type="email" />
      <Txt label="Phone" name={`${k}Phone`} type="tel" />
    </div>
  );
}

export function ApplicationForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallback, setFallback] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const f = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    for (const [key, value] of f.entries()) {
      if (typeof value === "string" && value.trim() !== "") data[key] = value.trim();
    }
    // Map the pay radio names to the API's semantic keys.
    for (const k of ["desiredPay", "emp1StartPay", "emp1EndPay", "emp2StartPay", "emp2EndPay", "emp3StartPay", "emp3EndPay"]) {
      if (data[`${k}Type`]) {
        const target = k === "desiredPay" ? "payType" : k.replace("StartPay", "PayType").replace("EndPay", "EndPayType");
        data[target] = data[`${k}Type`];
        delete data[`${k}Type`];
      }
    }

    setBusy(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, company: (f.get("company") as string) || "" }),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; error?: string };
      if (res.ok && out.ok) {
        setSent(true);
      } else if (out.code === "not_configured") {
        setFallback(true);
      } else {
        setError(out.error || "Something went wrong. Please try again, or call 703-939-5287.");
      }
    } catch {
      setError("Network error. Please try again, or call 703-939-5287.");
    }
    setBusy(false);
  }

  if (sent) {
    return (
      <div style={s("flex:2;min-width:300px")}>
        <div style={s("background:#fff;border:1px solid #E3E9F0;border-radius:20px;box-shadow:0 10px 30px rgba(12,44,82,.07);padding:clamp(32px,5vw,52px);text-align:center")}>
          <span style={s("width:72px;height:72px;border-radius:50%;background:#E7F6EC;color:#1A9E4B;display:flex;align-items:center;justify-content:center;margin:0 auto 18px")}><Check size={38} sw={2.5} /></span>
          <h2 style={s("color:#0C2C52;font-size:1.6rem;font-weight:800;margin:0 0 10px")}>Thank you for applying!</h2>
          <p style={s("color:#0b1016;font-size:1.08rem;line-height:1.6;margin:0 auto;max-width:44ch")}>We&apos;ve received your completed application and our team will be in touch. Questions? Call <a href="tel:+17039395287" style={s("color:#15589A;font-weight:700;text-decoration:none")}>703-939-5287</a>.</p>
        </div>
      </div>
    );
  }

  if (fallback) {
    return (
      <div style={s("flex:2;min-width:300px")}>
        <div style={s("background:#fff;border:1px solid #E3E9F0;border-radius:20px;box-shadow:0 10px 30px rgba(12,44,82,.07);padding:clamp(32px,5vw,52px);text-align:center")}>
          <h2 style={s("color:#0C2C52;font-size:1.5rem;font-weight:800;margin:0 0 10px")}>Online submission isn&apos;t available right now</h2>
          <p style={s("color:#0b1016;font-size:1.05rem;line-height:1.6;margin:0 auto 18px;max-width:52ch")}>Please <a href="/Kirpa-Employment-Application-Fillable.pdf" download style={s("color:#15589A;font-weight:700")}>download the application</a>, fill it out, and email it to <a href="mailto:kirpahhc@gmail.com" style={s("color:#15589A;font-weight:700")}>kirpahhc@gmail.com</a> — or call <a href="tel:+17039395287" style={s("color:#15589A;font-weight:700;text-decoration:none")}>703-939-5287</a>.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s("flex:2;min-width:300px")}>
      <form onSubmit={onSubmit} style={s("background:#fff;border:1px solid #E3E9F0;border-radius:20px;box-shadow:0 10px 30px rgba(12,44,82,.07);padding:clamp(24px,4vw,40px)")}>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={s("position:absolute;left:-9999px;width:1px;height:1px")} />

        <h2 style={s("color:#0C2C52;font-size:1.4rem;font-weight:800;margin:0 0 4px")}>Employment application</h2>
        <p style={s("color:#283341;font-size:1rem;margin:0 0 22px")}>This is our official application — submit it right here and it goes straight to our hiring team. Fields marked {REQ} are required; fill in as much of the rest as you can.</p>

        {/* Personal information */}
        <div style={s("display:grid;gap:16px")}>
          <h3 style={s(H3)}>Personal information</h3>
          <div style={s(GRID)}>
            <Txt label="Full name" name="fullName" required auto="name" placeholder="First and last name" />
            <Txt label="Phone" name="phone" required type="tel" auto="tel" placeholder="(703) 555-0100" />
            <Txt label="E-mail" name="email" required type="email" auto="email" placeholder="you@example.com" />
            <Txt label="Date available to start" name="dateAvailable" placeholder="MM/DD/YYYY" />
            <Txt label="Address" name="address" span auto="street-address" />
            <Txt label="City" name="city" auto="address-level2" />
            <Txt label="State" name="state" auto="address-level1" />
            <Txt label="ZIP code" name="zip" auto="postal-code" />
            <Txt label={<>Social Security Number <span style={s("font-weight:400;color:#5B6B7B")}>(optional here — may be provided later)</span></>} name="ssn" span />
            <label style={s(LABEL)}>
              <span style={s(LSPAN)}>Position applied for {REQ}</span>
              <select name="position" required className="fld" style={s(FIELD)}>
                <option value="">Select a position…</option>
                <option>Caregiver</option>
                <option>Certified Nursing Assistant (CNA)</option>
                <option>Companion</option>
                <option>Homemaker</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <PayRow label="Desired pay" name="desiredPay" />
          <Choice label="Employment desired" name="employmentDesired" options={[["full-time", "Full-time"], ["part-time", "Part-time"], ["seasonal", "Seasonal"]]} />
        </div>

        {/* Employment eligibility */}
        <div style={s(SECTION)}>
          <h3 style={s(H3)}>Employment eligibility</h3>
          <div style={s("display:grid;gap:14px")}>
            <YesNo label="Are you a U.S. citizen?" name="usCitizen" />
            <YesNo label="If no, are you allowed to work in the U.S.?" name="allowedToWork" />
            <YesNo label="Have you ever worked for Kirpa Home Health Care before?" name="workedBefore" />
            <div style={s(GRID)}><Txt label="If yes, start and end dates" name="workedBeforeDates" span /></div>
            <YesNo label="Have you ever been convicted of a felony?" name="felony" />
            <div style={s(GRID)}><Txt label="If yes, please explain" name="felonyExplain" span /></div>
          </div>
        </div>

        {/* Education */}
        <div style={s(SECTION)}>
          <h3 style={s(H3)}>Education</h3>
          <div style={s(GRID)}>
            <Txt label="High school" name="hsName" />
            <Txt label="City / State" name="hsCityState" />
            <Txt label="From" name="hsFrom" placeholder="YYYY" />
            <Txt label="To" name="hsTo" placeholder="YYYY" />
            <Txt label="Diploma" name="hsDiploma" />
          </div>
          <YesNo label="Graduated high school?" name="hsGraduate" />
          <div style={s(GRID)}>
            <Txt label="College" name="collegeName" />
            <Txt label="City / State" name="collegeCityState" />
            <Txt label="From" name="collegeFrom" placeholder="YYYY" />
            <Txt label="To" name="collegeTo" placeholder="YYYY" />
            <Txt label="Degree" name="collegeDegree" />
          </div>
          <YesNo label="Graduated college?" name="collegeGraduate" />
          <details style={s(DETAILS)}>
            <summary style={s(SUMMARY)}>Other education or certifications (optional)</summary>
            <div style={s(DBODY)}>
              <div style={s(GRID)}>
                <Txt label="School / Program" name="other1Name" />
                <Txt label="City / State" name="other1CityState" />
                <Txt label="From" name="other1From" />
                <Txt label="To" name="other1To" />
                <Txt label="Degree / Certificate" name="other1Degree" />
              </div>
              <div style={s(GRID)}>
                <Txt label="School / Program" name="other2Name" />
                <Txt label="City / State" name="other2CityState" />
                <Txt label="From" name="other2From" />
                <Txt label="To" name="other2To" />
                <Txt label="Degree / Certificate" name="other2Degree" />
              </div>
            </div>
          </details>
        </div>

        {/* Employment history */}
        <div style={s(SECTION)}>
          <h3 style={s(H3)}>Employment history</h3>
          <EmployerBlock n={1} />
          <details style={s(DETAILS)}>
            <summary style={s(SUMMARY)}>Add employer #2 (optional)</summary>
            <div style={s(DBODY)}><EmployerBlock n={2} /></div>
          </details>
          <details style={s(DETAILS)}>
            <summary style={s(SUMMARY)}>Add employer #3 (optional)</summary>
            <div style={s(DBODY)}><EmployerBlock n={3} /></div>
          </details>
        </div>

        {/* References */}
        <div style={s(SECTION)}>
          <h3 style={s(H3)}>References</h3>
          <ReferenceBlock n={1} />
          <details style={s(DETAILS)}>
            <summary style={s(SUMMARY)}>Add more references (optional)</summary>
            <div style={s(DBODY)}>
              <ReferenceBlock n={2} />
              <ReferenceBlock n={3} />
            </div>
          </details>
        </div>

        {/* Military service */}
        <div style={s(SECTION)}>
          <h3 style={s(H3)}>Military service</h3>
          <YesNo label="Are you a veteran?" name="veteran" />
          <details style={s(DETAILS)}>
            <summary style={s(SUMMARY)}>Military service details (if applicable)</summary>
            <div style={s(DBODY)}>
              <div style={s(GRID)}>
                <Txt label="Branch" name="militaryBranch" />
                <Txt label="Rank at discharge" name="militaryRank" />
                <Txt label="Starting date" name="militaryStartDate" />
                <Txt label="Ending date" name="militaryEndDate" />
                <Txt label="Type of discharge" name="militaryDischargeType" />
                <Txt label="If not honorable, please explain" name="militaryDischargeExplain" span />
              </div>
            </div>
          </details>
        </div>

        {/* Background check */}
        <div style={s(SECTION)}>
          <h3 style={s(H3)}>Background check</h3>
          <p style={s("color:#283341;font-size:.98rem;line-height:1.6;margin:0")}>Home care positions require a background screening. This information is used only for that screening and never in hiring decisions.</p>
          <div style={s(GRID)}>
            <Txt label="Birth date" name="bgBirthDate" placeholder="MM/DD/YYYY" />
            <Txt label="Driver's license #" name="bgDlNumber" />
            <Txt label="License state" name="bgDlState" />
          </div>
          <details style={s(DETAILS)}>
            <summary style={s(SUMMARY)}>Professional license, previous names &amp; previous addresses (optional)</summary>
            <div style={s(DBODY)}>
              <div style={s(GRID)}>
                <Txt label="Professional license type" name="bgLicenseType" placeholder="e.g. CNA" />
                <Txt label="License state" name="bgLicenseState" />
                <Txt label="License #" name="bgLicenseNumber" />
                <Txt label="Expiration date" name="bgLicenseExpiration" />
                <Txt label="Other / previous names" name="bgPreviousNames" />
                <Txt label="Date changed" name="bgPreviousNamesDate" />
              </div>
              <p style={s("color:#283341;font-size:.94rem;margin:4px 0 0")}>Previous addresses (past seven years — your current address is included automatically):</p>
              <div style={s(GRID)}>
                <Txt label="Address 2" name="bgAddr2" span />
                <Txt label="City" name="bgAddr2City" />
                <Txt label="State" name="bgAddr2State" />
                <Txt label="ZIP" name="bgAddr2Zip" />
                <Txt label="County / dates lived there" name="bgAddr2County" />
              </div>
              <div style={s(GRID)}>
                <Txt label="Address 3" name="bgAddr3" span />
                <Txt label="City" name="bgAddr3City" />
                <Txt label="State" name="bgAddr3State" />
                <Txt label="ZIP" name="bgAddr3Zip" />
                <Txt label="County / dates lived there" name="bgAddr3County" />
              </div>
            </div>
          </details>
          <div style={s("background:#F4F8FC;border:1px solid #E3E9F0;border-radius:12px;padding:16px;font-size:.92rem;line-height:1.6;color:#41525f")}>
            By signing below I acknowledge receipt of the FCRA disclosure documents (available at <a href="https://www.trudiligence.com/downloadforms.php" target="_blank" rel="noopener noreferrer" style={s("color:#15589A")}>trudiligence.com/downloadforms.php</a>) and authorize Kirpa Home Health Care and TruDiligence, LLC to obtain consumer reports about me for employment purposes, as described in full on the application form. My birth date and SSN are used solely as identifiers for the background check.
          </div>
          <label style={s("display:flex;gap:12px;align-items:flex-start;font-size:1rem;color:#0b1016;cursor:pointer")}>
            <input type="checkbox" required style={s("width:22px;height:22px;margin-top:2px;flex:none;accent-color:#1466B8")} />
            <span>I have read and agree to the background check authorization above. {REQ}</span>
          </label>
          <div style={s(GRID)}>
            <label style={s(LABEL)}>
              <span style={s(LSPAN)}>Signature — type your full legal name {REQ}</span>
              <input type="text" name="signature" required placeholder="Your full name" className="fld" style={s(FIELD + ";font-family:Georgia,serif;font-style:italic;font-size:1.15rem")} />
            </label>
          </div>
        </div>

        {/* Consent + submit */}
        <div style={s(SECTION)}>
          <label style={s("display:flex;gap:12px;align-items:flex-start;font-size:1rem;color:#0b1016;cursor:pointer")}>
            <input type="checkbox" required style={s("width:22px;height:22px;margin-top:2px;flex:none;accent-color:#1466B8")} />
            <span>I agree to be contacted by Kirpa Home Health Care about my application, and I certify the information above is true and complete. {REQ}</span>
          </label>
          {error && <p style={s("color:#B4331B;font-weight:600;font-size:1rem;margin:0")}>{error}</p>}
          <div><Btn type="submit" disabled={busy} arrow={!busy}>{busy ? "Submitting…" : "Submit Application"}</Btn></div>
          <p style={s("color:#5B6B7B;font-size:.92rem;margin:0")}>Your answers are placed onto our official application form (PDF) and sent securely to our hiring team.</p>
        </div>
      </form>
    </div>
  );
}
