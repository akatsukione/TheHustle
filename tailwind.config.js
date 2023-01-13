/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        olive: "#d3ddd3",
        "money-green": "#118C4F",
        "profile-green": "#d3ddb3",
        primary: "#d1c6a2",
      },
    },
  },
  plugins: [],
};
