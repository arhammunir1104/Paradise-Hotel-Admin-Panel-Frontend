/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      custom_white: '#FFFFFF',
      custom_grey: '#ababab',
      custom_black: "#333333",
      custom_lightBrown : "#978667",
      custom_darkBrown : "#4B514D",
      custom_camel : "#EBD7B2",
      custom_lightCamel : "#FAF8F5",
  },
  keyframes: {
    pulses: { 
      '0%, 100%' :{
      opacity: .1
    },
    '50%': {
      opacity: .0
    }
    }
  },
  
  animation: {
    pulses: 'pulses 1s ease-in-out infinite',
  }


    },
  },
  plugins: [],
}