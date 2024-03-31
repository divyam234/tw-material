import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils";

/**
 * Dropdown wrapper **Tailwind Variants** component
 *
 * const { base, menu } = dropdown({...})
 *
 * @example
 * <div>
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={base()}>
 *    // dropdown content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
const dropdown = tv({
  base: [
    "w-full",
    "p-0 min-w-[200px] shadow-none",
    "bg-transparent border-0",
    "text-inherit rounded-none",
  ],
});

/**
 * Dropdown wrapper **Tailwind Variants** component
 *
 * const { base, section, heading } = dropdownSection({...})
 *
 * @example
 * <div className={base()}>
 *  <button className={trigger()} aria-expanded="true/false">your trigger</button>
 *  <div className={section()}>
 *    // dropdown content
 *    <span className={arrow()} data-placement="top/bottom/left/right..." /> // arrow
 *  </div>
 * </div>
 */
const dropdownSection = tv({
  slots: {
    base: "relative mb-2",
    heading: "pl-1 text-tiny text-foreground-500",
    group: "data-[has-title=true]:pt-1",
    divider: "mt-2",
  },
});

/**
 * Dropdown Menu wrapper **Tailwind Variants** component
 *
 * const classNames = dropdownMenu({...})

 */
const dropdownMenu = tv({
  base: "w-full flex flex-col gap-0.5 p-1",
});

export type DropdownSectionVariantProps = VariantProps<typeof dropdownSection>;
export type DropdownSectionSlots = keyof ReturnType<typeof dropdownSection>;

export {dropdown, dropdownSection, dropdownMenu};
