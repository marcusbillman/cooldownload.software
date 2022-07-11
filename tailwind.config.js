/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'glow-blue': '0 0 16px 0 rgba(59, 130, 246, 0.3)',
        'glow-red': '0 0 16px 0 rgba(239, 68, 68, 0.3)',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
};
