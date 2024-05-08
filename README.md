### Tailwind Material You Components
```sh
npm install @tw-material/react @tw-material/theme @tw-material/system framer-motion
```
```ts
//tailwind.config.ts

import type {Config} from "tailwindcss";
import {material3} from "@tw-material/theme";

export default {
  content: [
    "./node_modules/@tw-material/**/*.{js,ts,jsx,tsx,mjs}",
  ],
  darkMode: "class",
  plugins: [
    material3({
      sourceColor: "#b8ff8c",
      customColors: [],
    }),
  ],
} as Config;
```
