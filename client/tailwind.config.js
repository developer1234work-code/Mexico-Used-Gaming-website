/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lion: {
          dark: '#0B0F19',
          cardDark: '#111827',
          surface: '#1E293B',
          gold: '#F59E0B',
          goldHover: '#D97706',
          goldLight: '#FEF3C7',
          goldText: '#B45309',
          accent: '#EAB308'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
