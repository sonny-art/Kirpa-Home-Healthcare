import type { CSSProperties } from "react";

/**
 * Convert a CSS declaration string (as authored in the design prototype) into a
 * React style object. Lets us keep the design's exact pixel/color values verbatim.
 *
 *   s("background:#fff;border-radius:16px;padding:28px")
 *     -> { background: "#fff", borderRadius: "16px", padding: "28px" }
 *
 * Note: splits declarations on ";" — safe here because no value in the design
 * contains a semicolon (gradients/clamp use commas only).
 */
export function s(css: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    if (!prop) continue;
    const value = decl.slice(i + 1).trim();
    const camel = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[camel] = value;
  }
  return out as CSSProperties;
}
