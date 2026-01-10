/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",    // ✅ CRITICAL for purge
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
