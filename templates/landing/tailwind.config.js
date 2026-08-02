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
      // Local additions on top of the shared preset (allowed; keep global stuff in the preset).
      height: { 13: "3.25rem" },
    },
  },
  plugins: [],
};
