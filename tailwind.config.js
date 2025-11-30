/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'editor-bg': '#1a1a1a',
        'editor-panel': '#2a2a2a',
        'editor-accent': '#3b82f6',
      },
    },
  },
  plugins: [],
}
