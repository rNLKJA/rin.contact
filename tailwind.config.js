/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Wisr × Nothing three-font system — CSS variables injected by next/font
        sans:      ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        editorial: ["var(--font-playfair)", "Georgia", "serif"],
        display:   ["var(--font-bitcount)", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
