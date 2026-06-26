import type { Metadata } from "next";
import Link from "next/link";
import { s } from "@/lib/style";
import { CoverPhoto } from "@/components/CoverPhoto";
import { Btn } from "@/components/Btn";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Kirpa Home Health Care is a dedicated home care provider in Ashburn, VA, committed to comfort, support, and dignity, with a team of registered nurses, social workers, and certified nursing assistants.",
  alternates: { canonical: "/about" },
};

const eyebrow = "font-size:.95rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1466B8";
const valIco = "width:54px;height:54px;border-radius:14px;background:#EAF2FB;color:#1466B8;display:flex;align-items:center;justify-content:center";
const valCard = "background:#fff;border:1px solid #E3E9F0;border-radius:16px;padding:28px;box-shadow:0 1px 2px rgba(12,44,82,.04)";

const VALUES = [
  { h: "Compassion & respect", p: "Everyone deserves to be treated with compassion and respect, it guides everything we do.", icon: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" /> },
  { h: "Comfort, support & dignity", p: "Our goal is to enhance the lives of our patients and their families by providing comfort, support, and dignity.", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></> },
  { h: "Trustworthy relationships", p: "We take time to build strong, trustworthy relationships with the people and families we serve.", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { h: "Care at home", p: "We support individuals and families in the comfort of their own homes, where they feel most themselves.", icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></> },
  { h: "Accessible care", p: "We work with a variety of insurance providers, including Medicare and Medicaid, to help make care accessible.", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v6M9 11h6" /></> },
  { h: "Whole-person care", p: "We take time to understand each person's physical, emotional, and spiritual needs.", icon: <path d="M20 6 9 17l-5-5" />, sw: 2.4 },
];

const FACTS = [
  { n: "24/7", l: "Care professionals available" },
  { n: "Nurse-led", l: "Care supervised by nurses" },
  { n: "Medicare & Medicaid", l: "Insurance accepted" },
  { n: "Ashburn, VA", l: "Serving our community" },
];

export default function AboutPage() {
  return (
    <div>
      <section style={s("background:linear-gradient(180deg,#EEF4FA 0%,#F8FBFD 100%);border-bottom:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(34px,5vw,60px) 24px")}>
          <div style={s("font-size:.96rem;color:#283341;margin-bottom:14px")}><Link href="/" className="hv-underline" style={s("cursor:pointer;color:#1466B8;text-decoration:none")}>Home</Link> <span style={s("color:#9AA7B2;margin:0 4px")}>/</span> About</div>
          <h1 style={s("color:#0C2C52;font-size:clamp(2.4rem,6.6vw,4.4rem);line-height:1.1;font-weight:800;letter-spacing:-.022em;margin:0;max-width:20ch")}>Dedicated to exceptional care</h1>
          <p style={s("color:#0b1016;font-size:1.32rem;line-height:1.6;margin:18px 0 0;max-width:62ch")}>A dedicated home care provider, delivering exceptional care in the comfort of home.</p>
        </div>
      </section>

      {/* Who we are */}
      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,6vw,84px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:clamp(36px,5vw,64px);align-items:center")}>
          <div>
            <span style={s(eyebrow)}>Who we are</span>
            <h2 style={s("color:#0C2C52;font-size:clamp(2.25rem,4.4vw,3.1rem);line-height:1.14;font-weight:800;letter-spacing:-.02em;margin:12px 0 0")}>Care that feels like family</h2>
            <p style={s("color:#0b1016;font-size:1.28rem;line-height:1.6;margin:16px 0 0")}>At Kirpa Home Health Care, we are dedicated to providing exceptional care and support to individuals and families in the comfort of their own homes. We believe everyone deserves to be treated with compassion and respect.</p>
            <p style={s("color:#0b1016;font-size:1.28rem;line-height:1.6;margin:16px 0 0")}>Our goal is to enhance the lives of our patients and their families by providing comfort, support, and dignity. Our team includes registered nurses, social workers, and certified nursing assistants, and our care professionals are available 24/7. We take time to understand each person&apos;s physical, emotional, and spiritual needs, and we work with a variety of insurance providers, including Medicare and Medicaid, to help make our services accessible.</p>
            <div style={s("margin-top:26px")}><Btn href="/request-service">Request a Service</Btn></div>
          </div>
          <div style={s("position:relative;border-radius:22px;overflow:hidden;box-shadow:0 18px 44px rgba(12,44,82,.14);aspect-ratio:5/4;background:#dce7f2")}>
            <CoverPhoto src="/images/care-2.jpg" alt="An adult daughter spending time with her elderly mother at home" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={s("background:#F4F8FC;border-top:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,6vw,84px) 24px")}>
          <div style={s("text-align:center;max-width:50ch;margin:0 auto")}>
            <span style={s(eyebrow)}>What we stand for</span>
            <h2 style={s("color:#0C2C52;font-size:clamp(2.25rem,4.4vw,3.1rem);line-height:1.14;font-weight:800;letter-spacing:-.02em;margin:12px 0 0")}>Our values</h2>
          </div>
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;margin-top:clamp(32px,4vw,48px)")}>
            {VALUES.map((v) => (
              <div key={v.h} style={s(valCard)}>
                <span style={s(valIco)}><svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={v.sw || 2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{v.icon}</svg></span>
                <h3 style={s("color:#0C2C52;font-size:1.22rem;font-weight:700;margin:16px 0 8px")}>{v.h}</h3>
                <p style={s("color:#0b1016;font-size:1.02rem;line-height:1.6;margin:0")}>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facts band */}
      <section style={s("background:#0C2C52")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(40px,5vw,64px) 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:28px;text-align:center")}>
          {FACTS.map((fct) => (
            <div key={fct.n}>
              <div style={s("color:#fff;font-size:clamp(1.5rem,3vw,2.1rem);font-weight:800;line-height:1.1")}>{fct.n}</div>
              <div style={s("color:#A8BBD2;font-size:1rem;margin-top:8px")}>{fct.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,6vw,84px) 24px")}>
          <div style={s("background:#F4F8FC;border:1px solid #E3E9F0;border-radius:24px;padding:clamp(40px,6vw,68px) clamp(28px,5vw,64px);text-align:center")}>
            <h2 style={s("color:#0C2C52;font-size:clamp(2.25rem,4.4vw,3.1rem);line-height:1.14;font-weight:800;letter-spacing:-.02em;margin:0")}>We&apos;d be honored to care for your family</h2>
            <p style={s("color:#0b1016;font-size:1.14rem;line-height:1.6;margin:14px auto 0;max-width:48ch")}>Let&apos;s talk about what your loved one needs.</p>
            <div style={s("display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:28px")}>
              <Btn href="/request-service">Request a Service</Btn>
              <Btn href="/contact" variant="secondary">Contact Us</Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
