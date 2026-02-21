/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['"IBM Plex Serif"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        canvas: '#f5f3ef',
        ink: '#20211e',
      },
      boxShadow: {
        card: '0 16px 32px rgba(27, 30, 26, 0.12)',
      },
      keyframes: {
        riseIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(18px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        riseIn: 'riseIn 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
