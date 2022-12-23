/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': 'Nunito Sans'
      },
      colors: {
        'primary': '#FF5F00',
        'secondary': '#3A3D42'
      },
      borderColor: {
        'primary': '#FF5F00'
      },
      backgroundColor: {
        'primary': '#FF5F00'
      }
    }
  },
  plugins: [require("daisyui")],
}
