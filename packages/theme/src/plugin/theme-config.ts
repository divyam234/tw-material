import type {Options} from "./types";

import {resolveTwcConfig} from "./m3-colors";
import {colors, createTheme} from "./create-theme";

export const genThemeConfig = ({sourceColor, customColors, defaultTheme}: Options) => {
  const m3Theme = createTheme({sourceColor, customColors});

  return resolveTwcConfig(colors(m3Theme), "m3", defaultTheme);
};
