"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Subtle entrance animation: fades + slides each section's content up as it
 * scrolls into view. Auto-targets `main section > div` — no markup changes.
 *
 * No flash / no SSR issue: the `.reveal` class is only added by this client
 * effect, and only to elements that are BELOW the fold on mount. Above-the-fold
 * content is never hidden, and with JS disabled nothing is hidden at all.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("main section > div"));
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    const vh = window.innerHeight;
    els.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < vh) return; // already in view — leave visible, no animation
      el.classList.add("reveal");
      io.observe(el);
    });

    // Failsafe: never leave content hidden.
    const t = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("in"));
    }, 2800);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
