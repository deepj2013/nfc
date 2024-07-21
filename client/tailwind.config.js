/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
    
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        "2xll": "1400px",
        "3xll": "1600px",
      },
      colors: {
        btnColor: "#6D28D9",
        secondry: "#666476",
        bgColor: "#2e37a40c",
        stroke_Color: "#DBDBDB",
        theme: "#2E37A4",
        grayText:'#727272'

    
      },
      screens: {
        '2xll': '1500px',
        '3xxl':'1600px'
      },
    },
  },
  plugins: [
  ],}

