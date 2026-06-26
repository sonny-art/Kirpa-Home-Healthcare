import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/DCIcon";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "white";
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  arrow?: boolean;
};

/**
 * Rectangular, flat button with a split two-tone arrow section
 * (Inova / MyChart style). Renders a Link, an anchor (tel/mailto/external),
 * or a <button>.
 */
export function Btn({
  children,
  variant = "primary",
  href,
  external,
  type,
  onClick,
  disabled,
  arrow = true,
}: Props) {
  const cls = `btn btn--${variant}${arrow ? "" : " btn--noarrow"}`;
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && (
        <span className="btn__arrow">
          <Arrow size={20} />
        </span>
      )}
    </>
  );

  if (href) {
    const isRaw = external || /^(tel:|mailto:|https?:|#)/.test(href);
    if (isRaw) {
      return (
        <a
          href={href}
          className={cls}
          onClick={onClick}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type || "button"} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
