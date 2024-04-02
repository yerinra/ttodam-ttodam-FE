/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4696D3',
        second: '#f9e000',
      },
      fontSize: {},
    },
  },
  plugins: [],
};
