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
        slideOut: "slideOut 0.3s ease",
        slideUp: "slideUp 0.5s ease",
        slideDown: "slideDown 0.5s ease",
        fadeIn: "fadeIn 0.5s ease",
        fadeOut: "fadeOut 0.5s ease",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translate(-30px, 0)", opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideOut: {
          "100%": { transform: "translate(-30px, 0)", opacity: 0 },
          "0%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translate(0, 30px)", opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideDown: {
          "100%": { transform: "translate(0, 30px)", opacity: 0 },
          "0%": { opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
