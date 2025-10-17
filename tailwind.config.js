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
          red: '#DC2626',
          accent: '#374151',
          dark: '#1F2937',
        },
        newsline: {
          red: '#DC2626',
          darkred: '#B91C1C',
          gray: '#374151',
          light: '#F9FAFB',
        },
      },
    },
  },
  plugins: [],
}
