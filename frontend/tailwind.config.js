/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "dark-landing": "url('assets/black-concrete-wall.jpg')",
      },
      colors: {
        "wood-green": "#6C9614",
        "light-green": "#7da822"
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
