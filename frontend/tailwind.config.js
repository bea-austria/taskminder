/** @type {import('tailwindcss').Config} */
const { screens } = require('tailwindcss/defaultTheme')
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      screens: {
        'xsm': '480px',
        ...screens,
      },
      backgroundImage: {
        'custom-image': "url('/taskminder-landing-bg.jpg')",
      },
      colors: {
        customLightBlue: '#d3e6f5',
      },
      animation: {
        'slow-bounce': 'bounce 2s infinite', 
      },
    },
  },
  plugins: [],
}

