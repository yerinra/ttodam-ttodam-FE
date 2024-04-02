/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      tablet: '769px',
      desktop: '1024px',
    },
    extend: {
      colors: {
        primary: '#1E88E5',
        secondary: '#64B5F6',
        'light-gray': '#BCC4C6',
        'dark-gray': '#828989',
        black: '#000000',
        orange: 'FF9B05',
      },
    },
  },
  plugins: [],
};
