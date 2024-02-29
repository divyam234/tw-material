# Tailwindcss Material3 Plugin

## Usage

```javascript
// tailwind.config.js
import { material3 } from "tailwindcss-m3-plugin";

export default {
  plugins: [
    material3({
      sourceColor: "#8282f4",
      customColors: [{ name: "info", value: "#42a5f5", blend: true }],
    }),
  ],
};
```

```html
<div class="text-body-medium color-primary">Hello World!</div>
```
