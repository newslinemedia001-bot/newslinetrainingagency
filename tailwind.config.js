/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#E53E3E',
          purple: '#5B21B6',
          dark: '#2D3748',
        },
        newsline: {
          red: '#DC2626',
          purple: '#6B21A8',
          light: '#F7FAFC',
        },
      },
    },
  },
  plugins: [],
}
