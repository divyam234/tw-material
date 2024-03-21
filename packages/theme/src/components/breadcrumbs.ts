import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses, tv} from "../utils";

const breadcrumbItem = tv({
  slots: {
    base: "flex items-center",
    item: [
      "flex gap-1 items-center",
      "cursor-pointer",
      "whitespace-nowrap",
      "line-clamp-1",
      "outline-none",
      "tap-highlight-transparent",
      ...dataFocusVisibleClasses,
    ],
    separator: "text-inherit",
  },
  variants: {
    size: {
      sm: {
        item: "text-tiny",
      },
      md: {
        item: "text-small",
      },
      lg: {
        item: "text-medium",
      },
    },
    underline: {
      none: {
        item: "no-underline",
      },
      hover: {
        item: "hover:underline",
      },
      always: {
        item: "underline",
      },
      active: {
        item: "active:underline",
      },
      focus: {
        item: "focus:underline",
      },
    },
    isCurrent: {
      true: {
        item: "cursor-default",
      },
      false: {
        item: ["hover:opacity-80", "active:opacity-disabled"],
      },
    },
    isDisabled: {
      true: {
        item: "opacity-disabled pointer-events-none",
        separator: "opacity-disabled",
      },
    },
    disableAnimation: {
      false: {
        item: "transition-opacity",
      },
      true: {
        item: "transition-none",
      },
    },
  },
  defaultVariants: {
    size: "md",
    underline: "none",
    isDisabled: false,
    disableAnimation: false,
  },
  compoundVariants: [
    {
      underline: ["hover", "always", "active", "focus"],
      class: "underline-offset-4",
    },
  ],
});

const breadcrumbs = tv({
  slots: {
    base: "",
    list: "flex flex-wrap list-none",
    ellipsis: "text-medium",
    separator: "text-inherit px-1",
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      size: "sm",
      class: {
        list: "px-2 py-1",
      },
    },
    {
      size: "md",
      class: {
        list: "px-2.5 py-1.5",
      },
    },
    {
      size: "lg",
      class: {
        list: "px-3 py-2",
      },
    },
  ],
});

export type BreadcrumbsVariantProps = VariantProps<typeof breadcrumbs>;
export type BreadcrumbsSlots = keyof ReturnType<typeof breadcrumbs>;
export type BreadcrumbItemVariantProps = VariantProps<typeof breadcrumbItem>;
export type BreadcrumbItemSlots = keyof ReturnType<typeof breadcrumbItem>;

export {breadcrumbs, breadcrumbItem};
