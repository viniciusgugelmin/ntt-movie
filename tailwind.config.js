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
        'background': '#141414',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-in-80': 'fade-in-80 0.5s ease-in-out',
        'scale-out': 'scale-out 0.3s ease-in-out',
        'intro': 'fade-in 0.45s ease-in-out, scale-out 0.45s ease-in-out',
        'input-fade-in-x': 'input-fade-in-x 0.3s ease-in-out'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-80': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.8' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'input-fade-in-x': {
          '0%': { minWidth: '0' },
          '100%': { minWidth: '200px' }
        }
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('first-child', '& > *:first-child');
      addVariant('last-child', '& > *:last-child');
    }
  ],
}

