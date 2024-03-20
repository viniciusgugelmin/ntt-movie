/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Noto Sans"', 'Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        'primary': '#6785C1',
        'secondary': '#0080B1',
        'tertiary': '#0F1C50',
        'quaternary': '#E6B600',
        'quinary': '#BC4328',
      },
    },
  },
  plugins: [],
}

