// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'], // Menetapkan 'Nunito' sebagai font sans default
      },
    },
  },
  plugins: [],
};
