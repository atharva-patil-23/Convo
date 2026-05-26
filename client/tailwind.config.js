/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "surface-1": "var(--surface-1)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        accent: "var(--accent)",
        "bubble-self": "var(--bubble-self)",
        "bubble-other": "var(--bubble-other)",
        danger: "var(--danger)",
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.2, 0, 0, 1)",
      },
      transitionDuration: {
        micro: "80ms",
        short: "150ms",
        medium: "300ms",
      },
      maxWidth: {
        bubble: "min(60ch, 75%)",
      },
    },
  },
  plugins: [],
}
