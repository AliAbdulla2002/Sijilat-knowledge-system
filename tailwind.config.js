/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        moicBlue: '#004080',
        moicGold: '#f5c518',
        moicLight: '#f8f9fa'
      }
    },
  },
  plugins: [],
}