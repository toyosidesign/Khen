import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

/** Outline icons share these defaults; size comes from width/height props. */
const outline = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const ChevronDown = (p: IconProps) => (
  <svg {...outline} strokeWidth={2} width={16} height={16} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...outline} strokeWidth={2} width={16} height={16} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Play = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width={18} height={18} {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...outline} strokeWidth={2} width={26} height={26} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

/* ---- feature icons ---- */

export const Inbox = (p: IconProps) => (
  <svg {...outline} width={24} height={24} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const ChatCheck = (p: IconProps) => (
  <svg {...outline} width={24} height={24} {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const BarChart = (p: IconProps) => (
  <svg {...outline} width={24} height={24} {...p}>
    <path d="M3 3v18h18" />
    <rect x="7" y="11" width="3" height="6" />
    <rect x="12" y="7" width="3" height="10" />
    <rect x="17" y="13" width="3" height="4" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...outline} width={24} height={24} {...p}>
    <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 20v-2a4 4 0 0 0-3-3.87" />
  </svg>
);

export const Integrations = (p: IconProps) => (
  <svg {...outline} width={24} height={24} {...p}>
    <rect x="3" y="9" width="6" height="6" rx="2" />
    <rect x="15" y="9" width="6" height="6" rx="2" />
    <path d="M9 12h6M6 3v6M6 21v-6M18 3v6M18 21v-6" />
  </svg>
);

export const Heart = (p: IconProps) => (
  <svg {...outline} width={24} height={24} {...p}>
    <path d="M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21.6l8.8-8.4a5.4 5.4 0 0 0 0-7.6Z" />
  </svg>
);

/* ---- social ---- */

export const Twitter = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width={22} height={22} {...p}>
    <path d="M17.5 3h3l-6.6 7.5L22 21h-6l-4.3-5.6L6.7 21h-3l7-8L2.3 3h6.1l3.9 5.1L17.5 3Z" />
  </svg>
);

export const LinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width={22} height={22} {...p}>
    <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4 0 4.75 2.63 4.75 6V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4V9Z" />
  </svg>
);

export const GitHub = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width={22} height={22} {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

export const Dribbble = (p: IconProps) => (
  <svg {...outline} width={22} height={22} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5 8c4 1 9 1.5 14 5M8 4c3 4 5 9 5.5 16M20 13c-6-1.5-11 0-14 4" />
  </svg>
);
