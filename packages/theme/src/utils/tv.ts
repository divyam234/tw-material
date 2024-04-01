import {tv as tvBase, type TV, ClassValue} from "tailwind-variants";
import {extendTailwindMerge} from "tailwind-merge";
import clsx from "clsx";

import {opacity} from "../plugin/opacity";
import {borderRadius} from "../plugin/border";

const COMMON_UNITS = ["small", "medium", "large"];

const opacityKeys = Object.keys(opacity);

export const twMergeConfig = {
  "bg-opacity": [{"bg-opacity": opacityKeys}],
  "text-opacity": [{"text-opacity": opacityKeys}],
  rounded: [{rounded: Object.keys(borderRadius)}],
  "border-w": [{border: COMMON_UNITS}],
  shadow: [{shadow: ["1", "2", "3", "4", "5"]}],
  "font-size": [
    {
      text: ["label", "display", "headline", "body", "title"]
        .map((key) => COMMON_UNITS.map((unit) => `${key}-${unit}`))
        .flat()
        .concat([...COMMON_UNITS, "tiny"]),
    },
  ],
};

export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? true,
    theme: {
      borderWidth: COMMON_UNITS,
      borderRadius: COMMON_UNITS,
    },
    twMergeConfig: {
      ...config?.twMergeConfig,
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
        ...twMergeConfig,
      },
    },
  });

const extendedTwMerge = extendTailwindMerge({
  extend: {
    classGroups: twMergeConfig,
  },
});

export function cn(...inputs: ClassValue[]) {
  return extendedTwMerge(clsx(inputs));
}
