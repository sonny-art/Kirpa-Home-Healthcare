import type { Metadata } from "next";
import Link from "next/link";
import { s } from "@/lib/style";
import { ContactForm } from "@/components/forms/ContactForm";
import { Phone, Mail, Pin, Clock, Arrow } from "@/components/DCIcon";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Kirpa Home Health Care in Ashburn, VA. Call 703-939-5287, email kirpahhc@gmail.com, or send a message about home care or careers.",
  alternates: { canonical: "/contact" },
};

const MAPS = "https://maps.google.com/?q=20130%20Lakeview%20Center%20Plaza%20Suite%20409%20Ashburn%20VA%2020147";
const cardA = "display:block;text-decoration:none;background:#fff;border:1px solid #E3E9F0;border-radius:16px;padding:28px;box-shadow:0 1px 2px rgba(12,44,82,.04),0 10px 28px rgba(12,44,82,.05)";
const cardIco = "width:54px;height:54px;border-radius:14px;background:#EAF2FB;color:#1466B8;display:flex;align-items:center;justify-content:center";
const cardH = "color:#0C2C52;font-size:1.25rem;font-weight:700;margin:16px 0 6px";
const cardP = "color:#0b1016;font-size:1.02rem;margin:0 0 14px";
const cardLink = "color:#15589A;font-weight:700;display:inline-flex;align-items:center;gap:8px";
const asideIco = "width:40px;height:40px;border-radius:11px;background:rgba(127,177,222,.18);color:#7FB1DE;display:flex;align-items:center;justify-content:center;flex:none";

export default function ContactPage() {
  return (
    <div>
      <section style={s("background:linear-gradient(180deg,#EEF4FA 0%,#F8FBFD 100%);border-bottom:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(34px,5vw,60px) 24px")}>
          <div style={s("font-size:.96rem;color:#283341;margin-bottom:14px")}><Link href="/" className="hv-underline" style={s("cursor:pointer;color:#1466B8;text-decoration:none")}>Home</Link> <span style={s("color:#9AA7B2;margin:0 4px")}>/</span> Contact</div>
          <h1 style={s("color:#0C2C52;font-size:clamp(2.4rem,6.6vw,4.4rem);line-height:1.1;font-weight:800;letter-spacing:-.022em;margin:0;max-width:20ch")}>We&apos;re here to help</h1>
          <p style={s("color:#0b1016;font-size:1.32rem;line-height:1.6;margin:18px 0 0;max-width:62ch")}>Questions about care or careers? Reach out, and a real person will get back to you.</p>
        </div>
      </section>

      <section style={s("background:#fff")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:clamp(40px,5vw,72px) 24px")}>

          {/* Contact method cards */}
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;margin-bottom:clamp(32px,4vw,48px)")}>
            <a href="tel:+17039395287" className="hv-card" style={s(cardA)}>
              <span style={s(cardIco)}><Phone size={26} /></span>
              <h3 style={s(cardH)}>Call us</h3>
              <p style={s(cardP)}>Speak with our team about home care or employment.</p>
              <span style={s(cardLink)}>703-939-5287 <Arrow size={17} /></span>
            </a>
            <a href="mailto:kirpahhc@gmail.com" className="hv-card" style={s(cardA)}>
              <span style={s(cardIco)}><Mail size={26} /></span>
              <h3 style={s(cardH)}>Email us</h3>
              <p style={s(cardP)}>Send us the details and we&apos;ll get back to you.</p>
              <span style={s(cardLink)}>kirpahhc@gmail.com <Arrow size={17} /></span>
            </a>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="hv-card" style={s(cardA)}>
              <span style={s(cardIco)}><Pin size={26} /></span>
              <h3 style={s(cardH)}>Visit us</h3>
              <p style={s(cardP)}>20130 Lakeview Center Plaza, Suite 409, Ashburn, VA 20147</p>
              <span style={s(cardLink)}>Get directions <Arrow size={17} /></span>
            </a>
          </div>

          {/* Form + aside */}
          <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(28px,4vw,44px);align-items:start")}>
            <ContactForm />

            <aside className="form-aside" style={s("flex:1;min-width:260px;display:grid;gap:18px;align-content:start")}>
              <div style={s("background:#0C2C52;color:#C5D4E6;border-radius:18px;padding:28px")}>
                <h3 style={s("color:#fff;font-size:1.32rem;font-weight:800;margin:0 0 18px")}>Get in touch</h3>
                <ul style={s("list-style:none;padding:0;margin:0;display:grid;gap:16px")}>
                  <li style={s("display:flex;gap:14px;align-items:flex-start")}><span style={s(asideIco)}><Pin size={20} /></span><span><strong style={s("color:#fff;display:block;font-size:1.02rem")}>Address</strong><span style={s("font-size:.96rem")}>20130 Lakeview Center Plaza, Suite 409, Ashburn, VA 20147</span></span></li>
                  <li style={s("display:flex;gap:14px;align-items:flex-start")}><span style={s(asideIco)}><Phone size={20} /></span><span><strong style={s("color:#fff;display:block;font-size:1.02rem")}>Phone</strong><a href="tel:+17039395287" className="hv-white" style={s("color:#CDD9E6;font-size:.96rem;text-decoration:none")}>703-939-5287</a></span></li>
                  <li style={s("display:flex;gap:14px;align-items:flex-start")}><span style={s(asideIco)}><Mail size={20} /></span><span><strong style={s("color:#fff;display:block;font-size:1.02rem")}>Email</strong><a href="mailto:kirpahhc@gmail.com" className="hv-white" style={s("color:#CDD9E6;font-size:.96rem;text-decoration:none")}>kirpahhc@gmail.com</a></span></li>
                  <li style={s("display:flex;gap:14px;align-items:flex-start")}><span style={s(asideIco)}><Clock size={20} /></span><span><strong style={s("color:#fff;display:block;font-size:1.02rem")}>Availability</strong><span style={s("font-size:.96rem")}>Care professionals available 24/7</span></span></li>
                </ul>
              </div>
              <div style={s("background:#fff;border:1px solid #E3E9F0;border-radius:18px;padding:26px;text-align:center;box-shadow:0 1px 2px rgba(12,44,82,.04)")}>
                <p style={s("color:#283341;font-size:1rem;margin:0 0 12px")}>Looking to join our team?</p>
                <Link href="/careers#apply" className="hv-blue" style={s("cursor:pointer;display:inline-flex;width:100%;box-sizing:border-box;align-items:center;justify-content:center;gap:9px;background:#1466B8;color:#fff;font-weight:700;font-size:1.04rem;padding:13px 20px;border-radius:12px;text-decoration:none")}>Submit an Application</Link>
              </div>
            </aside>
          </div>

          {/* Map */}
          <div style={s("margin-top:clamp(32px,4vw,48px);border-radius:18px;overflow:hidden;border:1px solid #E3E9F0;position:relative;background:#EAF1F8;min-height:300px;display:flex;align-items:center;justify-content:center")}>
            <div style={s("position:absolute;inset:0;background-image:linear-gradient(#D9E5F1 1px,transparent 1px),linear-gradient(90deg,#D9E5F1 1px,transparent 1px);background-size:46px 46px;opacity:.7")} />
            <div style={s("position:relative;text-align:center;padding:28px")}>
              <span style={s("width:58px;height:58px;border-radius:50%;background:#1466B8;color:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;box-shadow:0 8px 20px rgba(20,102,184,.3)")}><Pin size={28} /></span>
              <strong style={s("display:block;color:#0C2C52;font-size:1.1rem")}>Kirpa Home Health Care</strong>
              <span style={s("display:block;color:#0b1016;font-size:1rem;margin-top:4px")}>20130 Lakeview Center Plaza, Suite 409, Ashburn, VA 20147</span>
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="hv-bordonly" style={s("display:inline-flex;align-items:center;gap:8px;margin-top:14px;background:#fff;color:#15589A;font-weight:700;font-size:1rem;padding:11px 20px;border-radius:10px;text-decoration:none;border:1px solid #D7DFE8")}>Open in Google Maps <Arrow size={16} /></a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
