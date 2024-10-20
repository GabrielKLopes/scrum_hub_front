/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customBg: '#121212',
        customInput: '#1e1e1e',
        customButton:'#B30013',
        customColor1: '#160b00',
        customColor2: '#c26b00',
        customColor3: '#7a4400',
        customColor4: '#B4B4B40A',
      }
    },
  },
  plugins: [],
}

