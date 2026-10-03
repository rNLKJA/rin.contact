/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./hooks/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Wisr × Nothing three-font system — CSS variables injected by next/font
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        editorial: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-bitcount)", "monospace"],
      },
      // Rin's motion rules: every UI animation completes within 300ms of its
      // trigger and starts at least 70% of the way to its end state. These use
      // the standalone `translate` / `scale` properties so they compose with
      // existing Tailwind transform classes (e.g. -translate-x-1/2) instead of
      // overwriting them.
      keyframes: {
        enter: {
          from: { opacity: "0.7" },
          to: { opacity: "1" },
        },
        "enter-up": {
          from: { opacity: "0.7", translate: "0 4px" },
          to: { opacity: "1", translate: "0 0" },
        },
        "enter-scale": {
          from: { opacity: "0.7", scale: "0.96" },
          to: { opacity: "1", scale: "1" },
        },
        "enter-grow-x": {
          from: { scale: "0.7 1" },
          to: { scale: "1 1" },
        },
      },
      // Fill is `backwards`, not `both`: a forward fill keeps the animation
      // holding opacity/translate/scale after it ends, which blocks the exit
      // transition on hide (the element snaps to 0). Every call site sets its
      // shown-state resting values to the keyframe end, so nothing is lost.
      animation: {
        enter: "enter 150ms ease-out backwards",
        "enter-up": "enter-up 200ms ease-out backwards",
        "enter-scale": "enter-scale 200ms ease-out backwards",
        "enter-grow-x": "enter-grow-x 200ms ease-out backwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
