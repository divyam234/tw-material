import plugin from "tailwindcss/plugin";

import {borderColor, borderRadius} from "./border";
import {opacity} from "./opacity";
import {boxShadow, boxShadowColor} from "./shadow";
import {transitionDuration, transitionTimingFunction} from "./transition";
import {typography} from "./typography";
import {zIndex} from "./z-index";
import {borderWidth} from "./border-width";
import {genThemeConfig} from "./theme-config";
import {Options} from "./types";

export const material3 = (options: Options) => {
  const resolved = genThemeConfig(options);

  return plugin(
    ({addUtilities, addVariant}) => {
      addUtilities(resolved.utilities);
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",

          "scrollbar-width": "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-default": {
          "-ms-overflow-style": "auto",

          "scrollbar-width": "auto",

          "&::-webkit-scrollbar": {
            display: "block",
          },
        },
      });
      resolved.variants.forEach(({name, definition}) => addVariant(name, definition));
    },
    {
      theme: {
        extend: {
          borderRadius,
          borderColor,
          boxShadow,
          boxShadowColor,
          fontSize: typography,
          borderWidth,
          screens: {
            xs: "475px",
          },
          transitionDuration,
          transitionTimingFunction,
          zIndex,
          opacity,
          // @ts-ignore tailwind types are broken
          colors: resolved.colors,
        },
      },
    },
  );
};
