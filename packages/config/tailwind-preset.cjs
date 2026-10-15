/**
 * Shared Tailwind preset. Every template extends this so all templates
 * share one visual language. Colors map to the CSS vars from @tp/tokens.
 *
 * CommonJS on purpose: Tailwind loads presets with require(), so an ESM
 * `export default` here arrives as { default: … } and Tailwind silently
 * drops the theme — every brand-* utility disappears with no error.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--color-brand-50)", 100: "var(--color-brand-100)",
          200: "var(--color-brand-200)", 300: "var(--color-brand-300)",
          400: "var(--color-brand-400)", 500: "var(--color-brand-500)",
          600: "var(--color-brand-600)", 700: "var(--color-brand-700)",
          800: "var(--color-brand-800)", 900: "var(--color-brand-900)",
        },
        neutral: {
          0: "var(--color-neutral-0)", 50: "var(--color-neutral-50)",
          100: "var(--color-neutral-100)", 200: "var(--color-neutral-200)",
          300: "var(--color-neutral-300)", 400: "var(--color-neutral-400)",
          500: "var(--color-neutral-500)", 600: "var(--color-neutral-600)",
          700: "var(--color-neutral-700)", 800: "var(--color-neutral-800)",
          900: "var(--color-neutral-900)", 950: "var(--color-neutral-950)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        sm: "var(--radius-sm)", md: "var(--radius-md)", lg: "var(--radius-lg)",
        xl: "var(--radius-xl)", "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)", md: "var(--shadow-md)",
        lg: "var(--shadow-lg)", xl: "var(--shadow-xl)",
      },
    },
  },
};
