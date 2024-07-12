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

      colors: {
        btnColor: "#6D28D9",
        secondry: "#666476",
        background: "#FAFAFA",
        stroke_Color: "#DBDBDB",
        theme: "#2E37A4",
        lightPurpule: "#EEECF8",
        darkVolted: "#28253C",
        gradinet: "#C597FF",
        sucess: "#14783D",
        lightSucess: "#DBF4EC",
        errror: "#DD4040",
        errorLight: "#FBEAEA",
        darkbgColor:'#272138',
        yellowBg:'#CD8800',
        progreeBar:'#FAC847',

        // dark mode colror
        darkSecondry: "#000000",
        darkBackground: "#111827",
        darkText:'#1F2937',
        Stroke_Color: "#000000",
        darkTheme: "red",
        darkLightPurpule: "#EEECF8",
        darkVolted: "#28253C",
        darkGradinet: "#C597FF",
        lightYellow:'#FFFBE4',
        purple:'#7429D4',
        cardShade:'#E1DEF2',
        purpleShade:'#8037D3',
        lightPurpule: "#F5EDFF"
      },
      screens: {
        '2xll': '1500px',
        '3xxl':'1600px'
      },
    },
  },
  plugins: [
  ],}

