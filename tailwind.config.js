/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1500px",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
        },
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
    fontFamily: {
      body: ["Andada Pro", "serif"],
      sans: ["ui-sans-serif", "system-ui"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
  ],
};
