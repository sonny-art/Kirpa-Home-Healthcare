"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { s } from "@/lib/style";
import { Btn } from "@/components/Btn";
import { Pin, Menu, Close, Sun, Moon } from "@/components/DCIcon";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const MAPS =
  "https://maps.google.com/?q=20130%20Lakeview%20Center%20Plaza%20Suite%20409%20Ashburn%20VA%2020147";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Day vs night by the visitor's local time: sun in the day, moon at night.
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const h = new Date().getHours();
    setIsNight(h < 6 || h >= 19);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Utility bar */}
      <div className="utilbar" style={s("background:#0C2C52;color:#C5D4E6")}>
        <div className="utilbar-inner" style={s("max-width:1200px;margin:0 auto;padding:0 24px;min-height:44px;display:flex;align-items:center;justify-content:center;gap:16px")}>
          <div className="util-secondary" style={s("display:inline-flex;align-items:center;gap:22px;font-size:.95rem")}>
            <span style={s("display:inline-flex;align-items:center;gap:8px")}>
              {isNight ? <Moon size={16} /> : <Sun size={16} />} Care available 24/7
            </span>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="hv-white" style={s("color:#C5D4E6;text-decoration:none;display:inline-flex;align-items:center;gap:8px")}>
              <Pin size={16} /> Ashburn, VA
            </a>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <header style={s("position:sticky;top:0;z-index:50;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);border-bottom:1px solid #E3E9F0")}>
        <div style={s("max-width:1200px;margin:0 auto;padding:17px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:nowrap")}>
          <Link href="/" aria-label="Kirpa Home Health Care, home" style={s("display:inline-flex;flex-direction:column;text-decoration:none;flex:none;line-height:1")}>
            <span style={s("font-family:var(--font-serif),Georgia,serif;font-size:2.9rem;font-weight:600;color:#0C2C52;letter-spacing:-.015em;line-height:1")}>Kirpa</span>
            <span style={s("font-size:.82rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#1466B8;margin-top:6px")}>Home Health Care</span>
          </Link>

          {/* Desktop nav + CTA */}
          <div className="mast-actions" style={s("margin-left:auto;display:flex;align-items:center;gap:20px;flex-wrap:wrap;justify-content:flex-end")}>
            <nav aria-label="Primary" style={s("display:flex;align-items:center;gap:4px;flex-wrap:wrap")}>
              {NAV.map((n) => {
                const active = isActive(n.href);
                return (
                  <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} className="navlink" style={s("font-weight:700;font-size:1.12rem;text-decoration:none;padding:8px 13px 10px;display:inline-block")}>
                    {n.label}
                  </Link>
                );
              })}
            </nav>
            <Btn href="/request-service">Request care</Btn>
          </div>

          {/* Mobile toggle */}
          <button className="mast-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)} style={s("margin-left:auto;background:none;border:0;cursor:pointer;color:#0C2C52;padding:10px;align-items:center;justify-content:center")}>
            {open ? <Close size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={"mast-mobile" + (open ? " is-open" : "")} style={s("background:#fff;border-top:1px solid #E3E9F0;padding:6px 24px 18px")}>
          <nav aria-label="Mobile" style={s("display:grid")}>
            {NAV.map((n) => {
              const active = isActive(n.href);
              return (
                <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} style={s(`padding:13px 4px;font-weight:700;font-size:1.08rem;text-decoration:none;color:${active ? "#1466B8" : "#0C2C52"};border-bottom:1px solid #EEF2F6`)}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <Btn href="/request-service" onClick={() => setOpen(false)}>Request care</Btn>
        </div>
      </header>
    </>
  );
}
