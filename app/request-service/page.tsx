import type { Metadata } from "next";
import Link from "next/link";
import { s } from "@/lib/style";
import { RequestForm } from "@/components/forms/RequestForm";
import { Btn } from "@/components/Btn";
import { Phone } from "@/components/DCIcon";

export const metadata: Metadata = {
  title: "Request a Service",
  description:
    "Request in-home care from Kirpa Home Health Care in Ashburn, VA. Tell us what your loved one needs and our team will reach out to arrange care.",
  alternates: { canonical: "/request-service" },
};

const asideIco = "width:44px;height:44px;border-radius:12px;background:rgba(127,177,222,.18);color:#7FB1DE;display:flex;align-items:center;justify-content:center;flex:none";

const STEPS = [
  { h: "We review your request", p: "So we understand your situation.", icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 15l2 2 4-4" /></> },
  { h: "We reach out to you", p: "To talk through needs and options.", icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /> },
  { h: "We arrange care", p: "A caregiver from our team supports your loved one.", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
];

export default function RequestServicePage() {
  return (
    <div>
      <section style={s("background:linear-gradient(180deg,#EEF4FA 0%,#F8FBFD 100%);border-bottom:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(34px,5vw,60px) 24px")}>
          <div style={s("font-size:.96rem;color:#283341;margin-bottom:14px")}><Link href="/" className="hv-underline" style={s("cursor:pointer;color:#1466B8;text-decoration:none")}>Home</Link> <span style={s("color:#9AA7B2;margin:0 4px")}>/</span> Request a Service</div>
          <h1 style={s("color:#0C2C52;font-size:clamp(2.4rem,6.6vw,4.4rem);line-height:1.1;font-weight:800;letter-spacing:-.022em;margin:0;max-width:20ch")}>Request care in just a few minutes</h1>
          <p style={s("color:#0b1016;font-size:1.32rem;line-height:1.6;margin:18px 0 0;max-width:62ch")}>Tell us a little about your loved one&apos;s needs and our team will reach out to talk through the right care plan. Prefer to talk now?</p>
          <div style={s("margin-top:20px")}><Btn href="tel:+17039395287" variant="secondary" arrow={false}><Phone size={19} /> Call Now</Btn></div>
        </div>
      </section>

      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(40px,5vw,72px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(28px,4vw,44px);align-items:start")}>
          <RequestForm />

          <aside className="aside-center" style={s("min-width:260px;display:flex;flex-direction:column;gap:18px")}>
            <div style={s("background:#0C2C52;color:#C5D4E6;border-radius:18px;padding:clamp(26px,2.8vw,36px)")}>
              <h3 style={s("color:#fff;font-size:1.5rem;font-weight:800;margin:0 0 20px")}>What happens next</h3>
              <ul style={s("list-style:none;padding:0;margin:0;display:grid;gap:20px")}>
                {STEPS.map((st) => (
                  <li key={st.h} style={s("display:flex;gap:14px;align-items:flex-start")}>
                    <span style={s(asideIco)}><svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{st.icon}</svg></span>
                    <span><strong style={s("color:#fff;display:block;font-size:1.14rem;margin-bottom:2px")}>{st.h}</strong><span style={s("font-size:1rem;line-height:1.45")}>{st.p}</span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={s("background:#fff;border:1px solid #E3E9F0;border-radius:18px;padding:24px;text-align:center;box-shadow:0 1px 2px rgba(12,44,82,.04)")}>
              <p style={s("color:#283341;font-size:1.04rem;margin:0")}>Prefer to speak with someone?</p>
              <a href="tel:+17039395287" style={s("display:block;font-size:1.7rem;font-weight:800;color:#15589A;text-decoration:none;margin:6px 0 12px")}>703-939-5287</a>
              <a href="tel:+17039395287" className="hv-outline" style={s("display:inline-flex;width:100%;box-sizing:border-box;align-items:center;justify-content:center;gap:9px;background:#fff;color:#0C2C52;font-weight:700;font-size:1.06rem;padding:13px 20px;border-radius:12px;border:2px solid #D7DFE8;text-decoration:none")}><Phone size={18} />Call Now</a>
              <p style={s("color:#283341;font-size:.94rem;margin:12px 0 0")}>Care professionals available 24/7.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
