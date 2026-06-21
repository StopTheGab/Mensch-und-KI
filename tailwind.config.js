/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Editoriale Farbwelt als Tailwind-Tokens (entsprechen den CSS-Variablen
      // in index.css). So lässt sich der Akzent an EINER Stelle ändern.
      colors: {
        paper: "var(--paper)",
        "paper-deep": "var(--paper-deep)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        accent: "var(--accent)",
        "accent-deep": "var(--accent-deep)",
        hairline: "var(--hairline)",
        "hairline-strong": "var(--hairline-strong)",
      },
      fontFamily: {
        // Selbst gehostete Schriften (siehe @font-face in index.css)
        serif: ["Fraunces", "Georgia", "Times New Roman", "serif"],
        sans: ["Hanken Grotesk", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        measure: "40rem", // Lesespalte ~65–72 Zeichen
      },
    },
  },
  plugins: [],
};
