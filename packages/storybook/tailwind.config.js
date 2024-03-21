const { material3} = require('@tw-material/theme')

// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../components/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    material3({
      sourceColor: "#b8ff8c",
      customColors: []
    }),
  ],
}
