/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

import gradients from "tailwindcss-gradients";
const typography = require("@tailwindcss/typography");

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [gradients, typography],
};
