import plugin from "tailwindcss/plugin";
import {resolveTwcConfig} from "tw-colors";

import {borderColor, borderRadius} from "./border";
import {colors, createTheme} from "./createTheme";
import {opacity} from "./opacity";
import {boxShadow, boxShadowColor} from "./shadow";
import {transitionDuration, transitionTimingFunction} from "./transition";
import {typography} from "./typography";
import {zIndex} from "./z-index";
import {borderWidth} from "./border-width";

interface CustomColor {
  value: string;
  name: string;
  blend: boolean;
}

export type Options = {
  sourceColor: string;
  customColors: CustomColor[];
  defaultTheme?: "light" | "dark";
};

export const material3 = ({sourceColor, customColors, defaultTheme}: Options) => {
  const m3Theme = createTheme({sourceColor, customColors});

  const resolved = resolveTwcConfig(colors(m3Theme), {
    produceCssVariable: (colorName) => `--m3-${colorName}`,
    defaultTheme,
  });

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
