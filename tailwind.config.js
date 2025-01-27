import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  corePlugins: {
    float: false,
    objectPosition: false,
  },

  theme: {
    extend: {
      screens: {
        sm: "520px",
      },
    },
  },
  plugins: [daisyui],
};
