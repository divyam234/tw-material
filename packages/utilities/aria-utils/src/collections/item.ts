export {Item as BaseItem} from "@react-stately/collections";
import type {HTMLTwM3Props, As} from "@tw-material/system";

import {ItemProps as BaseItemProps} from "@react-types/shared";

/**
 * A modified version of the ItemProps from @react-types/shared, with the addition of the NextUI props.
 *
 */
export type ItemProps<Type extends As = "div", T extends object = {}> = BaseItemProps<T> &
  HTMLTwM3Props<Type>;
