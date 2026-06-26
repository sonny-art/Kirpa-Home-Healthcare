"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Btn } from "@/components/Btn";
import { Phone } from "@/components/DCIcon";

/**
 * Fixed bottom action bar for phones. It stays hidden until the page's primary
 * hero CTAs ([data-primary-cta]) have scrolled out of view, so it never doubles
 * up with the buttons already on screen. On pages without a hero CTA it appears
 * after roughly the first screenful of scrolling. Same <Btn> styling as the rest
 * of the site for a consistent look.
 *
 * Hidden on the request-service page, where it would be redundant (you're already
 * on the request form, and its "Request Care" button points back to this page).
 */
const HIDE_ON = ["/request-service"];

export function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const hidden = HIDE_ON.includes(pathname);

  useEffect(() => {
    if (hidden) return;
    setShow(false);
    const target = document.querySelector("[data-primary-cta]");

    if (target && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
        { threshold: 0 }
      );
      io.observe(target);
      return () => io.disconnect();
    }

    // Pages without hero CTAs: reveal after the first screenful of scrolling.
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, hidden]);

  if (hidden) return null;

  return (
    <div className={"mobile-cta" + (show ? " is-visible" : "")} inert={!show}>
      <Btn href="tel:+17039395287" variant="secondary" arrow={false}>
        <Phone size={18} /> Call
      </Btn>
      <Btn href="/request-service" variant="primary" arrow={false}>
        Request Care
      </Btn>
    </div>
  );
}
