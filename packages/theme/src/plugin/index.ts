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
      resolved.variants.forEach(({name, definition}) => addVariant(name, definition));
    },
    {
      theme: {
        extend: {
          borderRadius: borderRadius,
          borderColor: borderColor,
          boxShadow: boxShadow,
          boxShadowColor: boxShadowColor,
          fontSize: typography,
          borderWidth: borderWidth,
          screens: {
            xs: "475px",
          },
          transitionDuration: transitionDuration,
          transitionTimingFunction: transitionTimingFunction,
          zIndex: zIndex,
          opacity: opacity,
          // @ts-ignore tailwind types are broken
          colors: resolved.colors,
        },
      },
    },
  );
};
