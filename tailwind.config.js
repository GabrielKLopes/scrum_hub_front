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
        customBgLight: '#F1F1F1',
        customBgLight2: '#D1D1D1',
        customColor1: '#160b00',
        customColor2: '#c26b00',
        customColor3: '#7a4400',
        customColor4: '#B4B4B40A',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

