/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#4B91F7',
          DEFAULT: '#1A56DB',
          dark: '#0D3B8A',
        },
        secondary: {
          light: '#FDE68A',
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        success: '#10B981',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
}
