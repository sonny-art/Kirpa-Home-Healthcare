import type { Metadata } from "next";
import Link from "next/link";
import { s } from "@/lib/style";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { Phone } from "@/components/DCIcon";

export const metadata: Metadata = {
  title: "Careers · Join Our Caregiving Team",
  description:
    "Looking for a fulfilling career in home care? Kirpa Home Health Care is hiring caregivers in Ashburn, VA, full-time and part-time. Apply in minutes.",
  alternates: { canonical: "/careers" },
};

const eyebrow = "font-size:.95rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1466B8";
const perkCard = "text-align:center;background:#fff;border:1px solid #E3E9F0;border-radius:16px;padding:30px 24px;box-shadow:0 1px 2px rgba(12,44,82,.04)";
const perkIco = "width:62px;height:62px;border-radius:16px;background:#EAF2FB;color:#1466B8;display:flex;align-items:center;justify-content:center;margin:0 auto 16px";

const PERKS = [
  { h: "More than just a job", p: "An opportunity to advance your career in the healthcare industry.", icon: <><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0z" /><path d="M12 15l-3-3a22 22 0 0 1 8-10c3 0 5 2 5 5a22 22 0 0 1-10 8z" /><circle cx="15" cy="9" r="1.5" /></> },
  { h: "Family-focused team", p: "We work closely with our clients and their families, together.", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { h: "Excellence & collaboration", p: "We value diversity and collaboration, and strive for excellence in all we do.", icon: <path d="M12 2l3 6.5 7 .8-5 4.7 1.3 6.9L12 17.6 5.4 20.9 6.7 14 1.7 9.3l7-.8z" /> },
  { h: "Full-time & part-time", p: "Whether you're seeking full-time or part-time work, we have opportunities.", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></> },
];

const LOOKFOR = [
  "A caring, dependable, and patient nature",
  "A genuine passion for helping others",
  "Reliability and good communication",
];

export default function CareersPage() {
  return (
    <div>
      <section style={s("background:linear-gradient(180deg,#EEF4FA 0%,#F8FBFD 100%);border-bottom:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(34px,5vw,60px) 24px")}>
          <div style={s("font-size:.96rem;color:#283341;margin-bottom:14px")}><Link href="/" className="hv-underline" style={s("cursor:pointer;color:#1466B8;text-decoration:none")}>Home</Link> <span style={s("color:#9AA7B2;margin:0 4px")}>/</span> Careers</div>
          <h1 style={s("color:#0C2C52;font-size:clamp(2.4rem,6.6vw,4.4rem);line-height:1.1;font-weight:800;letter-spacing:-.022em;margin:0;max-width:20ch")}>Build a fulfilling career in home care</h1>
          <p style={s("color:#0b1016;font-size:1.32rem;line-height:1.6;margin:18px 0 0;max-width:62ch")}>Looking for a fulfilling career in healthcare? We&apos;re hiring talented, passionate caregivers.</p>
        </div>
      </section>

      {/* Perks */}
      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,6vw,80px) 24px")}>
          <div style={s("text-align:center;max-width:54ch;margin:0 auto")}>
            <span style={s(eyebrow)}>Why join Kirpa</span>
            <h2 style={s("color:#0C2C52;font-size:clamp(2.25rem,4.4vw,3.1rem);line-height:1.14;font-weight:800;letter-spacing:-.02em;margin:12px 0 0")}>More than just a job</h2>
            <p style={s("color:#0b1016;font-size:1.28rem;line-height:1.6;margin:16px auto 0")}>Joining our home care team is an opportunity to grow your career while making a real difference in people&apos;s lives.</p>
          </div>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;margin-top:clamp(32px,4vw,48px)")}>
            {PERKS.map((p) => (
              <div key={p.h} style={s(perkCard)}>
                <span style={s(perkIco)}><svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p.icon}</svg></span>
                <h3 style={s("color:#0C2C52;font-size:1.28rem;font-weight:700;margin:0 0 8px")}>{p.h}</h3>
                <p style={s("color:#0b1016;font-size:1rem;line-height:1.6;margin:0")}>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application */}
      <section id="apply" style={s("background:#F4F8FC;border-top:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,6vw,80px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(28px,4vw,44px);align-items:start")}>
          <ApplicationForm />

          <aside className="form-aside" style={s("flex:1;min-width:260px;display:grid;gap:18px;align-content:start")}>
            <div style={s("background:#0C2C52;color:#C5D4E6;border-radius:18px;padding:28px")}>
              <h3 style={s("color:#fff;font-size:1.32rem;font-weight:800;margin:0 0 16px")}>What we look for</h3>
              <ul style={s("list-style:none;padding:0;margin:0;display:grid;gap:14px")}>
                {LOOKFOR.map((l) => (
                  <li key={l} style={s("display:flex;gap:12px;align-items:flex-start")}>
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#7FB1DE" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s("flex:none;margin-top:2px")}><path d="M20 6 9 17l-5-5" /></svg>
                    <span style={s("font-size:1rem")}>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={s("background:#fff;border:1px solid #E3E9F0;border-radius:18px;padding:26px;text-align:center;box-shadow:0 1px 2px rgba(12,44,82,.04)")}>
              <p style={s("color:#283341;font-size:1rem;margin:0 0 14px")}>Prefer a paper application?</p>
              <a href="/Kirpa-Employment-Application-Fillable.pdf" download className="hv-outline" style={s("display:inline-flex;width:100%;box-sizing:border-box;align-items:center;justify-content:center;gap:9px;background:#fff;color:#0C2C52;font-weight:700;font-size:1.06rem;padding:13px 20px;border-radius:12px;border:2px solid #D7DFE8;text-decoration:none")}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
                Download our employment application
              </a>
            </div>
            <div style={s("background:#fff;border:1px solid #E3E9F0;border-radius:18px;padding:26px;text-align:center;box-shadow:0 1px 2px rgba(12,44,82,.04)")}>
              <p style={s("color:#283341;font-size:1rem;margin:0")}>Questions about working with us?</p>
              <a href="tel:+17039395287" style={s("display:block;font-size:1.5rem;font-weight:800;color:#15589A;text-decoration:none;margin:6px 0 14px")}>703-939-5287</a>
              <a href="tel:+17039395287" className="hv-outline" style={s("display:inline-flex;width:100%;box-sizing:border-box;align-items:center;justify-content:center;gap:9px;background:#fff;color:#0C2C52;font-weight:700;font-size:1.06rem;padding:13px 20px;border-radius:12px;border:2px solid #D7DFE8;text-decoration:none")}><Phone size={18} />Call Now</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
