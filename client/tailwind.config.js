/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens:{
        'desktop':'1024px',
        'tablet':'520px'
      }
    },
  },
  plugins: [],
}

