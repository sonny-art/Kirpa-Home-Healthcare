import type { Metadata } from "next";
import Link from "next/link";
import { s } from "@/lib/style";
import { CoverPhoto } from "@/components/CoverPhoto";
import { Btn } from "@/components/Btn";
import { Check } from "@/components/DCIcon";

export const metadata: Metadata = {
  title: "Home Care Services",
  description:
    "Non-medical home care in Ashburn, VA: personal care, companionship, homemaking, errands and transportation, medication reminders, and respite for families, supervised by nurses.",
  alternates: { canonical: "/services" },
};

const eyebrow = "font-size:.95rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1466B8";
const pageHero = "background:linear-gradient(180deg,#EEF4FA 0%,#F8FBFD 100%);border-bottom:1px solid #E3E9F0";
const crumb = "font-size:.96rem;color:#283341;margin-bottom:14px";
const h1S = "color:#0C2C52;font-size:clamp(2.4rem,6.6vw,4.4rem);line-height:1.1;font-weight:800;letter-spacing:-.022em;margin:0;max-width:20ch";

const SERVICES = [
  { title: "Personal Care", desc: "Compassionate, hands-on help with the everyday activities that keep daily life comfortable and dignified.", grid: true, items: ["Bathing", "Dressing", "Oral hygiene", "Eating", "Incontinence care", "Safety & fall protection"], icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
  { title: "Companionship", desc: "Friendly company and engagement that brighten the day and support emotional well-being.", grid: true, items: ["Companionship", "Accompany on walks", "Hobbies", "Recreational activities", "Pet care & feeding"], icon: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" /> },
  { title: "Homemaking", desc: "Light household help that keeps the home tidy, organized, and running smoothly.", grid: true, items: ["Meal preparation", "Laundry", "Bed making", "Dusting & mopping", "Organizing mail", "Household activities"], icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></> },
  { title: "Errands & Transportation", desc: "A reliable hand with errands and getting to where you need to be.", grid: true, items: ["Errands", "Grocery shopping", "Prescription pickups", "Post office visits", "Limited transportation", "Rides to appointments"], icon: <><path d="M5 17H3v-5l2-5h14l2 5v5h-2" /><circle cx="7.5" cy="17" r="2" /><circle cx="16.5" cy="17" r="2" /><path d="M5 12h14" /></> },
  { title: "Medication Reminders", desc: "Gentle, timely reminders that help keep medication routines on track, so nothing important is missed.", grid: false, items: ["Timely medication reminders"], icon: <><rect x="2" y="8" width="20" height="8" rx="4" /><path d="M12 8v8" /></> },
  { title: "Respite & Family Relief", desc: "Short-term relief so family caregivers can rest and recharge, knowing their loved one is in caring hands.", grid: false, items: ["Respite & relief for families"], icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
];

const APPROACH = [
  "Care supervised by nurses",
  "A team of registered nurses, social workers, and certified nursing assistants",
  "Care professionals available 24/7",
  "We work with a variety of insurance providers, including Medicare and Medicaid",
];

export default function ServicesPage() {
  return (
    <div>
      <section style={s(pageHero)}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(34px,5vw,60px) 24px")}>
          <div style={s(crumb)}><Link href="/" className="hv-underline" style={s("cursor:pointer;color:#1466B8;text-decoration:none")}>Home</Link> <span style={s("color:#9AA7B2;margin:0 4px")}>/</span> Services</div>
          <h1 style={s(h1S)}>Care designed around daily life</h1>
          <p style={s("color:#0b1016;font-size:1.32rem;line-height:1.6;margin:18px 0 0;max-width:62ch")}>Non-medical home care for everyday life, so your loved one can live safely and comfortably at home, with nurse-supervised care.</p>
        </div>
      </section>

      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,6vw,84px) 24px")}>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(440px,100%),1fr));gap:24px;align-items:stretch")}>
            {SERVICES.map((sv) => (
              <article key={sv.title} style={s("background:#fff;border:1px solid #E3E9F0;border-radius:18px;padding:32px;box-shadow:0 1px 2px rgba(12,44,82,.04),0 10px 28px rgba(12,44,82,.05);display:flex;flex-direction:column")}>
                <div style={s("display:flex;align-items:center;gap:16px")}>
                  <span style={s("width:58px;height:58px;flex:none;border-radius:15px;background:#EAF2FB;color:#1466B8;display:flex;align-items:center;justify-content:center")}><svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{sv.icon}</svg></span>
                  <h2 style={s("color:#0C2C52;font-size:1.5rem;font-weight:800;letter-spacing:-.01em;margin:0")}>{sv.title}</h2>
                </div>
                <p style={s("color:#0b1016;font-size:1.05rem;line-height:1.6;margin:16px 0 0")}>{sv.desc}</p>
                <div style={s("display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 0")}>
                  {sv.items.map((it) => (
                    <span key={it} style={s("display:inline-flex;align-items:center;gap:7px;background:#F4F8FC;border:1px solid #E7EDF4;color:#0b1016;font-size:0.94rem;font-weight:500;padding:8px 14px;border-radius:999px")}>
                      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#1466B8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={s("flex:none")}><path d="M20 6 9 17l-5-5" /></svg>
                      {it}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach split */}
      <section style={s("background:#F4F8FC;border-top:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,6vw,84px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:clamp(36px,5vw,64px);align-items:center")}>
          <div>
            <span style={s(eyebrow)}>Our approach</span>
            <h2 style={s("color:#0C2C52;font-size:clamp(2.25rem,4.4vw,3.1rem);line-height:1.14;font-weight:800;letter-spacing:-.02em;margin:12px 0 0")}>Thoughtful, nurse-supervised care</h2>
            <p style={s("color:#0b1016;font-size:1.28rem;line-height:1.6;margin:14px 0 0;max-width:50ch")}>We take time to understand each person&apos;s physical, emotional, and spiritual needs, and we build strong, trustworthy relationships with the families we serve.</p>
            <ul style={s("list-style:none;padding:0;margin:24px 0 0;display:grid;gap:14px")}>
              {APPROACH.map((a) => (
                <li key={a} style={s("display:flex;gap:14px;align-items:flex-start")}>
                  <span style={s("width:30px;height:30px;flex:none;border-radius:50%;background:#fff;border:1px solid #D7E3EF;color:#1466B8;display:flex;align-items:center;justify-content:center;margin-top:2px")}><Check size={16} sw={3} /></span>
                  <span style={s("font-size:1.06rem;color:#0b1016")}>{a}</span>
                </li>
              ))}
            </ul>
            <div style={s("margin-top:28px")}><Btn href="/request-service">Request a Service</Btn></div>
          </div>
          <div style={s("position:relative;border-radius:22px;overflow:hidden;box-shadow:0 18px 44px rgba(12,44,82,.14);aspect-ratio:5/4;background:#dce7f2")}>
            <CoverPhoto src="/images/consulting.jpg" alt="A Kirpa caregiver supporting a senior client outdoors" />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,6vw,84px) 24px")}>
          <div style={s("background:#0C2C52;border-radius:24px;padding:clamp(40px,6vw,68px) clamp(28px,5vw,64px);text-align:center")}>
            <h2 style={s("color:#fff;font-size:clamp(2.25rem,4.4vw,3.1rem);line-height:1.14;font-weight:800;letter-spacing:-.02em;margin:0")}>Not sure which service fits?</h2>
            <p style={s("color:#C5D4E6;font-size:1.14rem;line-height:1.6;margin:14px auto 0;max-width:52ch")}>Tell us about your situation and we&apos;ll help you find the right care.</p>
            <div style={s("display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:28px")}>
              <Btn href="/request-service">Request a Service</Btn>
              <Btn href="tel:+17039395287" variant="white" arrow={false}>Call 703-939-5287</Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
