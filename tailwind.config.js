/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'oot-green': '#009600',
        'oot-blue': '#0064c8',
        'oot-gold': '#ffc800',
      }
    },
  },
  plugins: [],
}
