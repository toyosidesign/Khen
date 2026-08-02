/**
 * Design Tokens — single source of truth.
 * Mirrors CSS variables in tokens.css and Figma variables in figma-variables.json.
 * Change here, propagate everywhere.
 */
export const colors = {
  brand: {
    50: "#eef4ff", 100: "#d9e6ff", 200: "#bcd3ff", 300: "#8db6ff",
    400: "#578dff", 500: "#2f66f5", 600: "#1d4ed8", 700: "#1b3fb0",
    800: "#1c368c", 900: "#1c316f",
  },
  neutral: {
    0: "#ffffff", 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0",
    300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569",
    700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617",
  },
  success: { 500: "#16a34a" },
  warning: { 500: "#d97706" },
  danger:  { 500: "#dc2626" },
} as const;

export const spacing = {
  0: "0", 1: "0.25rem", 2: "0.5rem", 3: "0.75rem", 4: "1rem",
  5: "1.25rem", 6: "1.5rem", 8: "2rem", 10: "2.5rem", 12: "3rem",
  16: "4rem", 20: "5rem", 24: "6rem", 32: "8rem",
} as const;

export const radius = {
  none: "0", sm: "0.25rem", md: "0.5rem", lg: "0.75rem",
  xl: "1rem", "2xl": "1.5rem", full: "9999px",
} as const;

export const typography = {
  fontFamily: {
    display: '"Clash Display", "Space Grotesk", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  fontSize: {
    xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem",
    xl: "1.25rem", "2xl": "1.5rem", "3xl": "1.875rem", "4xl": "2.25rem",
    "5xl": "3rem", "6xl": "3.75rem", "7xl": "4.5rem",
  },
  fontWeight: { regular: "400", medium: "500", semibold: "600", bold: "700" },
  lineHeight: { tight: "1.1", snug: "1.3", normal: "1.5", relaxed: "1.7" },
} as const;

export const shadow = {
  sm: "0 1px 2px 0 rgb(15 23 42 / 0.05)",
  md: "0 4px 12px -2px rgb(15 23 42 / 0.08)",
  lg: "0 12px 32px -8px rgb(15 23 42 / 0.12)",
  xl: "0 24px 48px -12px rgb(15 23 42 / 0.18)",
} as const;

export const tokens = { colors, spacing, radius, typography, shadow };
export default tokens;
