const { material3} = require('tw-material3-plugin')

// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../components/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    material3({
      sourceColor: "#8c9eff",
      customColors: [],
    }),
  ],
}
