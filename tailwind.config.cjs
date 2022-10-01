/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
    theme: {
    extend: {},
  },
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'sans-serif']
    }
  },
  content: ["./index.html",'./src/**/*.{svelte,js,ts}'], // for unused CSS
  variants: {
    extend: {},
  },
  darkMode: 'media', // or 'media' or 'class'
}
