import type {Config} from "tailwindcss";

import {material3} from "@tw-material/theme";

export default {
  content: [
    "../components/*/src/**/*.{js,jsx,ts,tsx}",
    "../components/*/stories/**/*.{js,jsx,ts,tsx}",
    "../theme/src/components/**/*.{js,jsx,ts,tsx}",
    "../theme/src/utils/**/*.{js,jsx,ts,tsx}",
    "../theme/stories/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [
    material3({
      sourceColor: "#b8ff8c",
      customColors: [],
    }),
  ],
} as Config;
