/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#1a1a2e',
        card: '#16213e',
        sidebar: '#0b1120',
        accent: '#00E676',
        'accent-dark': '#00C853',
        success: '#4CAF50',
        info: '#2979FF',
        danger: '#FF5252',
        muted: '#9E9E9E',
        'table-avail': '#37474F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'accent-glow': '0 0 20px rgba(0, 230, 118, 0.25)',
        'success-glow': '0 0 20px rgba(76, 175, 80, 0.25)',
      },
    },
  },
  plugins: [],
}
