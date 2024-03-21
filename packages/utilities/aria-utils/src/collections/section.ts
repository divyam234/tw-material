export {Section as BaseSection} from "@react-stately/collections";
import type {HTMLTwM3Props, As} from "@tw-material/system";

import {SectionProps as BaseSectionProps} from "@react-types/shared";

/**
 * A modified version of the SectionProps from @react-types/shared, with the addition of the NextUI props.
 *
 */
export type SectionProps<Type extends As = "div", T extends object = {}> = BaseSectionProps<T> &
  HTMLTwM3Props<Type>;
