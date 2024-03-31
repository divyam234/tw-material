import type {ListboxSectionSlots, SlotsToClasses} from "@tw-material/theme";

import {BaseSection, SectionProps} from "@tw-material/aria-utils";
import {DividerProps} from "@tw-material/divider";

import {ListboxItemProps} from "../listbox-item";

export interface ListboxSectionBaseProps<T extends object = {}> extends SectionProps<"ul", T> {
  /**
   * The listbox section classNames.
   */
  classNames?: SlotsToClasses<ListboxSectionSlots>;
  /**
   * The listbox items classNames.
   */
  itemClasses?: ListboxItemProps["classNames"];
  /**
   * Whether to hide the check icon when the items are selected.
   * @default false
   */
  hideSelectedIcon?: boolean;
  /**
   * Shows a divider between sections
   * @default false
   */
  showDivider?: boolean;
  /**
   * The divider props
   */
  dividerProps?: DividerProps;
}

const ListboxSectionBase = BaseSection as <T extends object>(
  props: ListboxSectionBaseProps<T>,
) => JSX.Element;

export default ListboxSectionBase;
