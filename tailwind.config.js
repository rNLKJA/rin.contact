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
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        // Wisr × Nothing three-font system — CSS variables injected by next/font
        sans:      ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        editorial: ["var(--font-playfair)", "Georgia", "serif"],
        display:   ["var(--font-bitcount)", "monospace"],
      },
    },
  },
  plugins: [],
};
