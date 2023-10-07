import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./Pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'whiteShadow': "inset 0px -2.8px 0px 0px white",
        'trendyShadow': "5px 7px 2px 1px rgb(255, 255, 128)",
        'bottomBlackShadow': "0px 5px 0px 0px black",
      },
      spacing: {
        "90px": "90px",
      },
      rotate: {
        "70": "70deg",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
export default config;
