// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./resources/**/*.blade.php",
    "./resources/js/**/*.{vue,js,ts,jsx,tsx}",
    "./resources/css/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E34234',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#212121',
          foreground: '#FFFFFF',
        },
        background: '#FFFFFF',
        foreground: '#000000',
      },
      fontFamily: {
        sans: ['Orbitron', 'sans-serif'],
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scaleX(-1)', opacity: '0.5', color: 'var(--secondary)' },
          '50%': { transform: 'scaleX(1)', opacity: '1', color: 'var(--primary)' },
          '100%': { transform: 'scaleX(1)', opacity: '1', color: 'var(--primary)' },
        }
      },
      animation: {
        scale: 'scale 2s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}