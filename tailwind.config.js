/** @type {import('tailwindcss').Config} */
import("tailwindcss").Config;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
    },
    width: {
      max: 1920,
      min: 350,
    },
    minHeight: {
      navMax: 80,
      navMin: 45,
    },
  },
  plugins: [],
};
