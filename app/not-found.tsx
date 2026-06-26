import type { Metadata } from "next";
import { s } from "@/lib/style";
import { Btn } from "@/components/Btn";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section style={s("background:linear-gradient(180deg,#F4F8FC 0%,#fff 100%)")}>
      <div style={s("max-width:1200px;margin:0 auto;padding:clamp(60px,9vw,120px) 24px;text-align:center")}>
        <span style={s("font-size:.95rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1466B8")}>404</span>
        <h1 style={s("color:#0C2C52;font-size:clamp(2.1rem,4.4vw,3rem);line-height:1.1;font-weight:800;letter-spacing:-.022em;margin:12px 0 0")}>We couldn&apos;t find that page</h1>
        <p style={s("color:#0b1016;font-size:1.18rem;line-height:1.6;margin:16px auto 0;max-width:48ch")}>The page you&apos;re looking for may have moved. Let&apos;s get you back on track.</p>
        <div style={s("display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:30px")}>
          <Btn href="/">Back to Home</Btn>
          <Btn href="/request-service" variant="secondary">Request a Service</Btn>
        </div>
      </div>
    </section>
  );
}
