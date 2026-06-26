import Link from "next/link";
import { s } from "@/lib/style";
import { Phone, Mail, Pin } from "@/components/DCIcon";

const linkS = s("cursor:pointer;color:#B9C8DA;font-size:1rem;text-decoration:none");

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={s("background:#0C2C52;color:#9FB2C8")}>
      <div style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,6vw,72px) 24px 32px")}>
        <div style={s("display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px")}>
          {/* About */}
          <div style={s("max-width:34ch")}>
            <div style={s("display:inline-flex;flex-direction:column;line-height:1")}>
              <span style={s("font-family:var(--font-serif),Georgia,serif;font-size:1.6rem;font-weight:600;color:#fff;letter-spacing:-.01em;line-height:1")}>Kirpa</span>
              <span style={s("font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#7FB1DE;margin-top:4px")}>Home Health Care</span>
            </div>
            <p style={s("margin:18px 0 0;font-size:1rem;line-height:1.6;color:#9FB2C8")}>
              Dedicated to providing exceptional care and support to individuals and families in the comfort of their own homes.
            </p>
          </div>

          {/* Care */}
          <div>
            <h4 style={s("color:#fff;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;margin:0 0 16px")}>Care</h4>
            <ul style={s("list-style:none;padding:0;margin:0;display:grid;gap:11px")}>
              <li><Link href="/services" className="hv-white" style={linkS}>Services</Link></li>
              <li><Link href="/request-service" className="hv-white" style={linkS}>Request a Service</Link></li>
              <li><Link href="/about" className="hv-white" style={linkS}>About Us</Link></li>
              <li><Link href="/contact" className="hv-white" style={linkS}>Contact</Link></li>
            </ul>
          </div>

          {/* Work With Us */}
          <div>
            <h4 style={s("color:#fff;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;margin:0 0 16px")}>Work With Us</h4>
            <ul style={s("list-style:none;padding:0;margin:0;display:grid;gap:11px")}>
              <li><Link href="/careers" className="hv-white" style={linkS}>Careers</Link></li>
              <li><Link href="/careers#apply" className="hv-white" style={linkS}>Apply Now</Link></li>
              <li><Link href="/request-service" className="hv-white" style={linkS}>Get Started</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 style={s("color:#fff;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;margin:0 0 16px")}>Get in Touch</h4>
            <ul style={s("list-style:none;padding:0;margin:0;display:grid;gap:13px")}>
              <li style={s("display:flex;gap:11px;align-items:flex-start")}>
                <Phone size={18} color="#7FB1DE" style={s("flex:none;margin-top:3px")} />
                <a href="tel:+17039395287" className="hv-white" style={s("color:#CDD9E6;font-size:1rem;text-decoration:none")}>703-939-5287</a>
              </li>
              <li style={s("display:flex;gap:11px;align-items:flex-start")}>
                <Mail size={18} color="#7FB1DE" style={s("flex:none;margin-top:3px")} />
                <a href="mailto:kirpahhc@gmail.com" className="hv-white" style={s("color:#CDD9E6;font-size:1rem;text-decoration:none")}>kirpahhc@gmail.com</a>
              </li>
              <li style={s("display:flex;gap:11px;align-items:flex-start")}>
                <Pin size={18} color="#7FB1DE" style={s("flex:none;margin-top:3px")} />
                <span style={s("color:#CDD9E6;font-size:1rem")}>20130 Lakeview Center Plaza, Suite 409, Ashburn, VA 20147</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={s("border-top:1px solid rgba(255,255,255,.12);margin-top:36px;padding-top:24px;display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;font-size:.9rem;color:#8499AF")}>
          <span>© {year} Kirpa Home Health Care. All rights reserved.</span>
          <span>Non-medical home care · Ashburn, VA</span>
        </div>
      </div>
    </footer>
  );
}
