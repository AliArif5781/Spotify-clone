/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/assets/sass/**/*.scss", // Add this line
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-b": "linear-gradient(transparent, rgba(0, 0, 0, 1))",
        "gradient-teal": "linear-gradient(transparent, rgba(0, 128, 128, 1))",
        "gradient-pink": "linear-gradient(transparent, rgba(255, 20, 147, 1))",
      },
      colors: {
        Black: "#000000",
        "A-Black": "#1F1F1F",
        "B-Black": "#2A2A2A",
        "C-Black": "#121212",
        "D-Black": "#8B8B8B",
        "E-Black": "#2A2D2C",
        Green: "#1db954",
        White: "#F0F0F0",
        "custom-blue": "#509BF5",
        "A-White": "#B3B3B3",
        "B-White": "#FAFAFA",
        "C-White": "#F6F6F6",
        "D-White": "#FFFFFF",
        "E-White": "#B3B3B3",
        Gray: "#B3B3B3",
        "custom-bg": "rgb(32, 87, 100)",
        "custom-white-black-bg": "rgb(128, 128, 128)",
        "Volum-color": "#1DB954",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
