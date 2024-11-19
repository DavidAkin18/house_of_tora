/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          100: '#FBEDE0', // Light orange for background
          200: '#F9DAC3', // Slightly darker shade
          600: '#F76C1A', // Bright orange for text
        },
        gray: {
          800: '#333333', // Dark gray for text
          700: '#555555', // Lighter gray for text
        },
      },
    },
  },
  plugins: [],
}



