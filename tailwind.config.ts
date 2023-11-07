import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        200: "#D4E0FF",
        500: "#2663FF",
        600: "#1E4FCC",
      },
      grayscale: {
        100: "#F4F4F4",
        200: "#edf2ff",
        700: "#7D7D7D",
      },
      white: "#FAFAFA",
      black: "#000000",
      error: {
        100: "#ffe1df",
        500: "#da0f00",
      },
    },
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;
