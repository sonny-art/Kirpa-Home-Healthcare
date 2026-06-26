import type { CSSProperties, ReactNode } from "react";

type Props = { size?: number; sw?: number; color?: string; style?: CSSProperties };

function I({
  size = 24,
  sw = 2,
  color = "currentColor",
  style,
  children,
}: Props & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {children}
    </svg>
  );
}

export const Phone = (p: Props) => (
  <I {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </I>
);
export const Arrow = (p: Props) => (
  <I {...p}><path d="M5 12h14M13 5l7 7-7 7" /></I>
);
export const Check = (p: Props) => (
  <I {...p}><path d="M20 6 9 17l-5-5" /></I>
);
export const Clock = (p: Props) => (
  <I {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></I>
);
export const Pin = (p: Props) => (
  <I {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></I>
);
export const Mail = (p: Props) => (
  <I {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></I>
);
export const Lock = (p: Props) => (
  <I {...p}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></I>
);
export const Upload = (p: Props) => (
  <I {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5M12 3v12" /></I>
);
export const Menu = (p: Props) => (
  <I {...p}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></I>
);
export const Close = (p: Props) => (
  <I {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></I>
);
export const Sun = (p: Props) => (
  <I {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></I>
);
export const Moon = (p: Props) => (
  <I {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></I>
);
