const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  theme: {
    fill: {
      primary: "#3F51B5",
      hover: "#3F6DB5",
      danger: "#E46D04",
      darkGray: "#494949",
      lightGray: "#888383",
      white: "#FFFFFF",
    },
    textColor: {
      primary: "#3F51B5",
      hover: "#3F6DB5",
      danger: "#E46D04",
      darkGray: "#494949",
      lightGray: "#888383",
      white: "#FFFFFF",
    },
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["22px", "30px"],
      xl: ["26px", "34px"],
    },
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: { color: theme("textColor.darkGray") },
      });
    }),
  ],
};
