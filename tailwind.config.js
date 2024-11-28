/** @type {import('tailwindcss').Config} */

import tailwindPresetMantine from "tailwind-preset-mantine";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [tailwindPresetMantine()],
  theme: {
    extend: {},
  },
  plugins: [],
};
