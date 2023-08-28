/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    fontFamily: {
      body: "Assistant, Arial, sans-serif",
      heading: "Josefin Sans, sans-serif",
    },
    extend: {
      animation: {
        slideIn: "slideIn 0.5s ease-in-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translate(-15px, 0)", opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
