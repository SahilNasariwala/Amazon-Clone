/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#2c3e50', // header / detail image background
        price: '#e67e22', // product price orange
        accent: '#3b82f6', // checkboxes, active page, Apply button
      },
    },
  },
  plugins: [],
}
