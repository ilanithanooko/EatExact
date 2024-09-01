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
        "light-green": "#7da822",
        "gray-bg": "#D3D3D3",
        "lightest-gray": "#F3F3F3",
        "pastel-green": "#b1dbad"
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
