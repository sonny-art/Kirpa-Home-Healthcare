import type { Metadata } from "next";
import Link from "next/link";
import { s } from "@/lib/style";
import { SITE } from "@/lib/site";
import { CoverPhoto } from "@/components/CoverPhoto";
import { Btn } from "@/components/Btn";
import { Phone, Clock, Check } from "@/components/DCIcon";

export const metadata: Metadata = {
  title: `${SITE.name} · Compassionate In-Home Care in ${SITE.address.city}, ${SITE.address.state}`,
  description:
    "Kirpa Home Health Care provides non-medical in-home care in Ashburn, VA: personal care, companionship, homemaking, errands, and respite. Care supervised by nurses, with professionals available 24/7.",
  alternates: { canonical: "/" },
};

const ico = "width:56px;height:56px;border-radius:14px;background:#EAF2FB;color:#1466B8;display:flex;align-items:center;justify-content:center";
const cardS = "cursor:pointer;background:#fff;border:1px solid #E3E9F0;border-radius:16px;padding:28px;box-shadow:0 1px 2px rgba(12,44,82,.04),0 10px 28px rgba(12,44,82,.05);text-decoration:none;display:block";
const eyebrow = "font-size:.95rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1466B8";
const h2S = "color:#0C2C52;font-size:clamp(2.25rem,4.4vw,3.1rem);line-height:1.12;font-weight:800;letter-spacing:-.02em;margin:12px 0 0";

function CkIcon() {
  return <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="#1466B8" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s("flex:none")}><path d="M20 6 9 17l-5-5" /></svg>;
}

const SERVICES = [
  { title: "Personal Care", desc: "Compassionate, hands-on help with the everyday activities that keep daily life comfortable and dignified.", items: ["Bathing & dressing", "Eating & oral hygiene", "Safety & fall protection"], icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
  { title: "Companionship", desc: "Friendly company and engagement that brighten the day and support emotional well-being.", items: ["Conversation & hobbies", "Accompany on walks", "Pet care & feeding"], icon: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" /> },
  { title: "Homemaking", desc: "Light household help that keeps the home tidy, organized, and running smoothly.", items: ["Meal preparation", "Laundry & tidying", "Organizing mail"], icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></> },
  { title: "Errands & Transportation", desc: "A reliable hand with errands and getting to where you need to be.", items: ["Grocery shopping", "Prescription pickups", "Rides to appointments"], icon: <><path d="M5 17H3v-5l2-5h14l2 5v5h-2" /><circle cx="7.5" cy="17" r="2" /><circle cx="16.5" cy="17" r="2" /><path d="M5 12h14" /></> },
  { title: "Medication Reminders", desc: "Gentle, timely reminders that help keep medication routines on track.", items: ["Timely daily reminders", "Routine support"], icon: <><rect x="2" y="8" width="20" height="8" rx="4" /><path d="M12 8v8" /></> },
  { title: "Respite & Family Relief", desc: "Short-term relief so family caregivers can rest, knowing their loved one is in caring hands.", items: ["Planned or short-notice relief", "Peace of mind for families"], icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
];

const TRUST = [
  { title: "Supervised by nurses", sub: "RNs, social workers & CNAs", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></> },
  { title: "Available 24/7", sub: "Support whenever you need it", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></> },
  { title: "Medicare & Medicaid", sub: "Insurance accepted", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v6M9 11h6" /></> },
  { title: "Locally owned", sub: "Proudly serving Ashburn, VA", icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></> },
];

export default function HomePage() {
  return (
    <div style={s("font-family:inherit;color:#0b1016;background:#fff")}>
      {/* Hero */}
      <section style={s("background:linear-gradient(180deg,#F4F8FC 0%,#fff 100%)")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(40px,6vw,76px) 24px clamp(48px,6vw,80px);display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:clamp(36px,5vw,64px);align-items:center")}>
          <div className="hero-copy">
            <span style={s("display:inline-flex;align-items:center;gap:9px;background:#EAF2FB;color:#15589A;font-size:.92rem;font-weight:700;padding:9px 16px;border-radius:999px")}>
              <Check size={16} sw={2.4} /> Care supervised by nurses
            </span>
            <h1 style={s("color:#0C2C52;font-size:clamp(1.9rem,12cqi,4.4rem);line-height:1.08;font-weight:800;letter-spacing:-.025em;margin:20px 0 0;max-width:15ch")}>Compassionate care, right at home.</h1>
            <p style={s("color:#0b1016;font-size:clamp(1.22rem,1.8vw,1.42rem);line-height:1.6;margin:20px 0 0;max-width:50ch")}>Helping your loved one live safely and comfortably at home, with kind caregivers and nurse-supervised care.</p>
            <div className="hero-cta" data-primary-cta style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(215px,1fr));gap:14px;margin-top:30px")}>
              <Btn href="/request-service">Request Care</Btn>
              <Btn href="tel:+17039395287" variant="secondary" arrow={false}><Phone size={20} /> Call 703-939-5287</Btn>
            </div>
            <p style={s("display:inline-flex;align-items:center;gap:9px;color:#283341;font-size:1rem;margin:22px 0 0")}>
              <Clock size={17} color="#1466B8" /> Talk to a real person, any time. We&apos;re here 24/7.
            </p>
          </div>

          <div style={s("position:relative")}>
            <div style={s("position:relative;border-radius:22px;overflow:hidden;box-shadow:0 24px 60px rgba(12,44,82,.18);aspect-ratio:4/5;background:#dce7f2")}>
              <CoverPhoto src="/images/care-1.jpg" alt="A Kirpa caregiver standing with a smiling senior woman at home" priority sizes="(max-width: 760px) 92vw, 540px" />
            </div>
            <div style={s("position:absolute;left:-16px;bottom:22px;background:#fff;border-radius:14px;padding:14px 18px;box-shadow:0 14px 34px rgba(12,44,82,.16);display:flex;align-items:center;gap:12px;max-width:248px")}>
              <span style={s("width:44px;height:44px;border-radius:11px;background:#EAF2FB;color:#1466B8;display:flex;align-items:center;justify-content:center;flex:none")}><Clock size={22} /></span>
              <span style={s("line-height:1.25")}><strong style={s("display:block;color:#0C2C52;font-size:1rem")}>Available 24/7</strong><span style={s("color:#283341;font-size:.98rem")}>Care when you need it</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section style={s("background:#F4F8FC;border-top:1px solid #E3E9F0;border-bottom:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:28px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px")}>
          {TRUST.map((t) => (
            <div key={t.title} style={s("display:flex;align-items:flex-start;gap:14px")}>
              <span style={s("width:48px;height:48px;border-radius:50%;background:#EAF2FB;color:#1466B8;display:flex;align-items:center;justify-content:center;flex:none")}>
                <svg width={23} height={23} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{t.icon}</svg>
              </span>
              <span style={s("line-height:1.3")}><strong style={s("display:block;color:#0C2C52;font-size:1.02rem")}>{t.title}</strong><span style={s("color:#283341;font-size:.92rem")}>{t.sub}</span></span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(56px,7vw,96px) 24px")}>
          <div style={s("max-width:60ch;margin:0 auto;text-align:center")}>
            <span style={s(eyebrow)}>How we help</span>
            <h2 style={s(h2S)}>Personalized home care services</h2>
            <p style={s("color:#0b1016;font-size:1.3rem;line-height:1.6;margin:16px auto 0;max-width:56ch")}>Everyday support that keeps your loved one safe, comfortable, and independent at home.</p>
          </div>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;margin-top:clamp(36px,4vw,52px)")}>
            {SERVICES.map((sv) => (
              <Link key={sv.title} href="/services" className="hv-card" style={s(cardS)}>
                <span style={s(ico)}><svg width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{sv.icon}</svg></span>
                <h3 style={s("color:#0C2C52;font-size:1.3rem;font-weight:700;margin:16px 0 8px")}>{sv.title}</h3>
                <p style={s("color:#0b1016;font-size:1.02rem;margin:0")}>{sv.desc}</p>
                <ul style={s("list-style:none;padding:0;margin:16px 0 0;display:grid;gap:9px")}>
                  {sv.items.map((it) => (
                    <li key={it} style={s("display:flex;gap:10px;align-items:center;color:#0b1016;font-size:1rem")}><CkIcon /> {it}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
          <div style={s("text-align:center;margin-top:40px")}>
            <Btn href="/services" variant="secondary">View all services</Btn>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={s("background:#F4F8FC;border-top:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(56px,7vw,96px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:clamp(36px,5vw,64px);align-items:center")}>
          <div style={s("position:relative;border-radius:22px;overflow:hidden;box-shadow:0 18px 44px rgba(12,44,82,.14);aspect-ratio:5/4;background:#dce7f2")}>
            <CoverPhoto src="/images/consulting.jpg" alt="A Kirpa caregiver with a senior client outdoors" />
          </div>
          <div>
            <span style={s(eyebrow)}>Getting started</span>
            <h2 style={s(h2S)}>Bringing care home is simple</h2>
            <p style={s("color:#0b1016;font-size:1.3rem;line-height:1.6;margin:14px 0 0;max-width:48ch")}>We make it easy to start, and we listen first, so care fits your family.</p>
            <div style={s("display:grid;gap:22px;margin-top:30px")}>
              {[
                { n: "1", h: "Tell us what you need", p: "Share a little about your loved one online or by phone." },
                { n: "2", h: "We build a care plan", p: "We take time to understand physical, emotional, and spiritual needs, with care supervised by nurses." },
                { n: "3", h: "Welcome your caregiver", p: "A caregiver from our team supports your loved one at home." },
              ].map((st) => (
                <div key={st.n} style={s("display:flex;gap:18px;align-items:flex-start")}>
                  <span style={s("width:48px;height:48px;flex:none;border-radius:50%;background:#0C2C52;color:#fff;font-weight:800;font-size:1.15rem;display:flex;align-items:center;justify-content:center")}>{st.n}</span>
                  <div><h3 style={s("color:#0C2C52;font-size:1.2rem;font-weight:700;margin:6px 0 4px")}>{st.h}</h3><p style={s("color:#0b1016;font-size:1.05rem;margin:0")}>{st.p}</p></div>
                </div>
              ))}
            </div>
            <div style={s("margin-top:30px")}><Btn href="/request-service">Request Care</Btn></div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(56px,7vw,96px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:clamp(36px,5vw,64px);align-items:center")}>
          <div>
            <span style={s(eyebrow)}>Why families choose Kirpa</span>
            <h2 style={s(h2S)}>Care built on compassion and respect</h2>
            <p style={s("color:#0b1016;font-size:1.3rem;line-height:1.6;margin:14px 0 0;max-width:50ch")}>Our goal is to enhance the lives of our patients and their families by providing comfort, support, and dignity.</p>
            <ul style={s("list-style:none;padding:0;margin:26px 0 0;display:grid;gap:16px")}>
              {[
                <><strong style={s("color:#0C2C52")}>Care supervised by nurses</strong>, with a team that includes registered nurses, social workers, and certified nursing assistants.</>,
                <><strong style={s("color:#0C2C52")}>Care professionals available 24/7</strong>, so support is there when your family needs it.</>,
                <><strong style={s("color:#0C2C52")}>Strong, trustworthy relationships</strong>, we take time to understand each person&apos;s needs.</>,
                <><strong style={s("color:#0C2C52")}>We work with Medicare, Medicaid</strong>, and a variety of insurance providers to help make care accessible.</>,
              ].map((node, i) => (
                <li key={i} style={s("display:flex;gap:14px;align-items:flex-start")}>
                  <span style={s("width:30px;height:30px;flex:none;border-radius:50%;background:#EAF2FB;color:#1466B8;display:flex;align-items:center;justify-content:center;margin-top:2px")}><Check size={17} sw={3} /></span>
                  <span style={s("font-size:1.08rem;color:#0b1016")}>{node}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={s("position:relative;border-radius:22px;overflow:hidden;box-shadow:0 18px 44px rgba(12,44,82,.14);aspect-ratio:5/4;background:#dce7f2")}>
            <CoverPhoto src="/images/care-2.jpg" alt="An adult daughter spending time with her elderly mother at home" />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:0 24px clamp(56px,7vw,96px)")}>
          <div style={s("background:#0C2C52;border-radius:24px;padding:clamp(40px,6vw,72px) clamp(28px,5vw,64px);text-align:center")}>
            <span style={s("font-size:.95rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7FB1DE")}>Ready when you are</span>
            <h2 style={s("color:#fff;font-size:clamp(2.25rem,4.4vw,3.1rem);line-height:1.14;font-weight:800;letter-spacing:-.02em;margin:12px 0 0")}>Let&apos;s find the right care together</h2>
            <p style={s("color:#C5D4E6;font-size:1.15rem;line-height:1.6;margin:14px auto 0;max-width:54ch")}>Request a consultation and we&apos;ll talk through your needs and the care that fits your family.</p>
            <div style={s("display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:30px")}>
              <Btn href="/request-service">Request Care</Btn>
              <Btn href="tel:+17039395287" variant="white" arrow={false}>Call 703-939-5287</Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
