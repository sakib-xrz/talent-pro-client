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
        primary: "#65a30d",
        "primary-200": "#d9f99d",
        "primary-100": "#ecfccb",
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
