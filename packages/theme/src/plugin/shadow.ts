import {ThemeConfig} from "tailwindcss/types/config";

export const boxShadow = {
  0: "none",
  1: "0 1px 3px 1px rgb(0 0 0 / 0.15), 0 1px 2px 0 rgb(0 0 0 / 0.3)",
  2: "0 2px 6px 2px rgb(0 0 0 / 0.15), 0 1px 2px 0 rgb(0 0 0 / 0.3)",
  3: "0 4px 8px 3px rgb(0 0 0 / 0.15), 0 1px 3px 0 rgb(0 0 0 / 0.3)",
  4: "0 6px 10px 4px rgb(0 0 0 / 0.15), 0 2px 3px 0 rgb(0 0 0 / 0.3)",
  5: "0 8px 12px 6px rgb(0 0 0 / 0.15), 0 4px 4px 0 rgb(0 0 0 / 0.3)",
};

export const boxShadowColor: ThemeConfig["boxShadowColor"] = ({theme}) => ({
  DEFAULT: theme("colors.light.shadow"),

  light: theme("colors.light.shadow"),
  dark: theme("colors.dark.shadow"),
});
