/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        danger: "#e3342f",
        rebeccaPurple: "#663399",
        thistle: "#d8bfd8",
        richlilac: "#b666d2",
      },
      fontFamily: {
        body: ["Arial", "sans-serif"],
        heading: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
