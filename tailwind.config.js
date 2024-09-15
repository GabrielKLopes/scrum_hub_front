/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customBg: '#121212',
        customBgInput:'#121212'
      }
    },
  },
  plugins: [],
}

