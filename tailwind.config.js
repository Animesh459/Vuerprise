/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(yellow|teal|green|cyan|gray)-500\/(20)/,
    },
    {
      pattern: /text-(yellow|teal|green|cyan|gray)-400/,
    },
    {
      pattern: /border-(yellow|teal|green|cyan)-500\/(30)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}