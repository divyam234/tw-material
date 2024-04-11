import {to as convert, serialize, ColorSpace, parse, OKLCH, sRGB} from "colorjs.io/fn";

ColorSpace.register(sRGB);
ColorSpace.register(OKLCH);

type Resolved = {
  variants: Array<{name: string; definition: string[]}>;
  utilities: {[selector: string]: Record<string, any>};
  colors: {
    [colorName: string]: ({
      opacityValue,
      opacityVariable,
    }: {
      opacityValue: string;
      opacityVariable: string;
    }) => string;
  };
};

const parsedColorsCache: Record<string, string> = {};

export const resolveTwcConfig = (
  themes: Record<string, Record<string, string>> = {},
  prefix = "m3",
  defaultTheme?: string,
) => {
  const resolved: Resolved = {
    variants: [],
    utilities: {},
    colors: {},
  };

  for (const [themeName, colors] of Object.entries(themes)) {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`;

    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }

    resolved.utilities[cssSelector] = themeName
      ? {
          "color-scheme": themeName,
        }
      : {};

    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    });

    for (const [colorName, colorValue] of Object.entries(colors)) {
      try {
        const parsedColor = parsedColorsCache[colorValue] || toOkLch(colorValue);

        parsedColorsCache[colorValue] = parsedColor;

        const m3ColorVariable = `--${prefix}-${colorName}`;
        const m3OpacityVariable = `--${prefix}-${colorName}-opacity`;

        resolved.utilities[cssSelector]![m3ColorVariable] = parsedColor;

        resolved.colors[colorName] = ({opacityVariable, opacityValue}) => {
          if (!isNaN(+opacityValue)) {
            return `oklch(var(${m3ColorVariable}) / ${opacityValue})`;
          }
          if (opacityVariable) {
            return `oklch(var(${m3ColorVariable}) / var(${m3OpacityVariable}, var(${opacityVariable})))`;
          }

          return `oklch(var(${m3ColorVariable}) / var(${m3OpacityVariable}, 1))`;
        };
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log("error", error?.message);
      }
    }
  }

  return resolved;
};

function toOkLch(colorValue: string) {
  return serialize(convert(parse(colorValue), "oklch"), {precision: 5})
    .split("(")[1]
    .split(")")[0];
}
