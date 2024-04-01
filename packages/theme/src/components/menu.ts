import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses, tv} from "../utils";

const menu = tv({
  slots: {
    base: [
      "w-full  relative",
      "flex flex-col gap-1 bg-surface-container rounded-extra-small",
      "shadow-1",
    ],
    list: "w-full flex flex-col gap-0.5 outline-none p-1.5",
    emptyContent: [
      "h-10",
      "px-2",
      "py-1.5",
      "w-full",
      "h-full",
      "text-on-background",
      "text-start",
    ],
  },
});

const menuItem = tv({
  slots: {
    base: [
      "flex",
      "group",
      "gap-2",
      "items-center",
      "justify-between",
      "relative",
      "px-2",
      "py-1.5",
      "w-full",
      "min-h-10",
      "box-border",
      "rounded-small",
      "subpixel-antialiased",
      "outline-none",
      "cursor-pointer",
      "tap-highlight-transparent",
      "data-[hover=true]:bg-on-surface/hover",
      "data-[hover=true]:text-on-surface",
      "data-[selected=true]:bg-secondary-container",
      // ...dataFocusVisibleClasses,
    ],
    wrapper: "w-full flex flex-col items-start justify-center",
    title: "flex-1 truncate text-label-large text-on-surface",
    description: ["w-full", "text-small", "text-outline", "group-data-[hover=true]:text-current"],
    selectedIcon: ["text-on-surface-variant", "size-4", "flex-shrink-0"],
    startIcon: [
      "text-on-surface-variant",
      "[&>svg]:size-6",
      "pointer-events-none",
      "flex-shrink-0",
    ],
    endIcon: ["text-on-surface-variant", "[&>svg]:size-6", "pointer-events-none", "flex-shrink-0"],
    shortcut: [
      "px-1",
      "py-0.5",
      "rounded",
      "font-sans",
      "text-on-surface-variant",
      "text-tiny",
      "border-small",
      "border-default-300",
      "group-hover:border-current",
    ],
  },
  variants: {
    showDivider: {
      true: {
        base: [
          "mb-1.5",
          "after:content-['']",
          "after:absolute",
          "after:-bottom-1",
          "after:left-0",
          "after:right-0",
          "after:h-[1px]",
          "after:bg-outline-variant",
        ],
      },
      false: {},
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    disableAnimation: {
      true: {},
      false: {
        base: "data-[hover=true]:transition-colors",
      },
    },
  },
  defaultVariants: {
    disableAnimation: false,
    showDivider: false,
  },
});

const menuSection = tv({
  slots: {
    base: "relative mb-2",
    heading: "pl-1 text-tiny text-outline",
    group: "data-[has-title=true]:pt-1",
    divider: "mt-2",
  },
});

export type MenuVariantProps = VariantProps<typeof menu>;
export type MenuSlots = keyof ReturnType<typeof menu>;
export type MenuSectionVariantProps = VariantProps<typeof menuSection>;
export type MenuSectionSlots = keyof ReturnType<typeof menuSection>;
export type MenuItemVariantProps = VariantProps<typeof menuItem>;
export type MenuItemSlots = keyof ReturnType<typeof menuItem>;

export {menu, menuItem, menuSection};
