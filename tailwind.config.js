/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#F9FAFB",
        error: "#E30909",
        primary: "#059669",
        "primary-700": "#047857",
        "primary-200": "#a7f3d0",
        "primary-100": "#d1fae5",
        "grey-800": "#1F2937",
        "grey-500": "#6B7280",
        "grey-400": "#9CA3AF",
        "grey-300": "#D1D5DB",
        "grey-200": "#E5E7EB",
        "grey-100": "#F3F4F6",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
