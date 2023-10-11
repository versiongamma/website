/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    fontFamily: {
      body: "Assistant, Arial, sans-serif",
      heading: "Josefin Sans, sans-serif",
      mono: "Martian Mono, mono",
    },
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
        "2xl": "2400px",
      },
      backgroundImage: {
        photos:
          'linear-gradient(126deg,rgba(163, 72, 212, 0.7) 0%, rgba(240, 86, 187, 0.7) 33%, rgba(255, 96, 0, 0.7) 100%), url("/static/photos-bg.webp") ',
        video:
          'linear-gradient(126deg,rgba(163, 72, 212, 0.7) 0%, rgba(240, 86, 187, 0.7) 33%, rgba(255, 96, 0, 0.7) 100%), url("/static/video-bg-2.webp") ',
      },
      animation: {
        slideIn: "slideIn 0.5s ease-in-out",
        slideOut: "slideOut 0.3s ease",
        slideUp: "slideUp 0.5s ease",
        slideDown: "slideDown 0.5s ease",
        fadeIn: "fadeIn 0.5s ease",
        fadeOut: "fadeOut 0.5s ease",
      },
      gridTemplateColumns: {
        "video-thumbnails": "repeat(auto-fill, 480px)",
        "video-thumbnails-lg": "repeat(auto-fill, 640px)",
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
