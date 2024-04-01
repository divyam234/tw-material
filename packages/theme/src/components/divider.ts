import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * Divider wrapper **Tailwind Variants** component
 *
 * @example
 *
 * const styles = divider()
 *
 * <span className={styles} />
 */
const divider = tv({
  base: "shrink-0 bg-outline-variant border-none",
  variants: {
    orientation: {
      horizontal: "w-full h-[1px]",
      vertical: "h-full w-[1px]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type DividerVariantProps = VariantProps<typeof divider>;

export {divider};
