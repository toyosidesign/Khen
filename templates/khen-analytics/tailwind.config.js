const preset = require("@tp/config/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Inherit the shared visual language (colors, fonts, radius, shadow → tokens).
  presets: [preset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    // Scan the shared UI package so its utility classes aren't purged.
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // The original HTML was desktop-first with max-width queries at 960px and
      // 560px. These named screens reproduce those exact breakpoints mobile-first
      // without disturbing Tailwind's defaults.
      screens: { mob: "560px", tab: "960px" },
      maxWidth: { wrap: "1216px" },
    },
  },
  plugins: [],
};
