import {resolveTwcConfig} from "tw-colors";

import {colors, createTheme} from "./create-theme";
import {Options} from "./types";

export const genThemeConfig = ({sourceColor, customColors, defaultTheme}: Options) => {
  const m3Theme = createTheme({sourceColor, customColors});

  return resolveTwcConfig(colors(m3Theme), {
    produceCssVariable: (colorName) => `--m3-${colorName}`,
    defaultTheme,
  });
};
