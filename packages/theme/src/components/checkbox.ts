import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {groupDataFocusVisibleClasses} from "../utils";

/**
 * Checkbox wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, icon, label} = checkbox({...})
 *
 * @example
 * <label className={base())}>
 *  // hidden input
 *  <span className={wrapper()} aria-hidden="true" data-selected={selected}>
 *     <svg className={icon()}>
 *       // check icon
 *     </svg>
 *  </span>
 *  <span className={label()}>Label</span>
 * </label>
 */
const checkbox = tv({
  slots: {
    base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2",
    wrapper: [
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "flex-shrink-0",
      "overflow-hidden",
      "after:bg-primary after:text-on-primary text-on-primary",
      // before
      "before:content-['']",
      "before:absolute",
      "before:inset-0",
      "before:border-solid",
      "before:border-2",
      "before:box-border",
      "before:border-outline",
      // after
      "after:content-['']",
      "after:absolute",
      "after:inset-0",
      "after:scale-50",
      "after:opacity-0",
      "after:origin-center",
      "group-data-[selected=true]:after:scale-100",
      "group-data-[selected=true]:after:opacity-100",
      // hover
      "group-data-[hover=true]:before:bg-surface-variant",
      // focus ring
      ...groupDataFocusVisibleClasses,
    ],
    icon: "z-10 w-4 h-3 opacity-0 group-data-[selected=true]:opacity-100",
    label: "relative text-foreground select-none",
  },
  variants: {
    size: {
      sm: {
        wrapper: [
          "w-4 h-4 mr-2 rtl:ml-2 rtl:mr-[unset]",
          "rounded-[calc(theme(borderRadius.medium)*0.5)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.5)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.5)]",
        ],
        label: "text-small",
        icon: "w-3 h-2",
      },
      md: {
        wrapper: [
          "w-5 h-5 mr-2 rtl:ml-2 rtl:mr-[unset]",
          "rounded-[calc(theme(borderRadius.medium)*0.6)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.6)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.6)]",
        ],
        label: "text-medium",
        icon: "w-4 h-3",
      },
      lg: {
        wrapper: [
          "w-6 h-6 mr-2 rtl:ml-2 rtl:mr-[unset]",
          "rounded-[calc(theme(borderRadius.medium)*0.7)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.7)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.7)]",
        ],
        label: "text-large",
        icon: "w-5 h-4",
      },
    },
    radius: {
      none: {
        wrapper: "rounded-none before:rounded-none after:rounded-none",
      },
      sm: {
        wrapper: [
          "rounded-[calc(theme(borderRadius.medium)*0.5)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.5)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.5)]",
        ],
      },
      md: {
        wrapper: [
          "rounded-[calc(theme(borderRadius.medium)*0.6)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.6)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.6)]",
        ],
      },
      lg: {
        wrapper: [
          "rounded-[calc(theme(borderRadius.medium)*0.7)]",
          "before:rounded-[calc(theme(borderRadius.medium)*0.7)]",
          "after:rounded-[calc(theme(borderRadius.medium)*0.7)]",
        ],
      },
      full: {
        wrapper: "rounded-full before:rounded-full after:rounded-full",
      },
    },
    lineThrough: {
      true: {
        label: [
          "inline-flex",
          "items-center",
          "justify-center",
          "before:content-['']",
          "before:absolute",
          "before:bg-on-background",
          "before:w-0",
          "before:h-0.5",
          "group-data-[selected=true]:opacity-60",
          "group-data-[selected=true]:before:w-full",
        ],
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    isInvalid: {
      true: {
        wrapper: "before:border-error",
        label: "text-error",
      },
    },
    disableAnimation: {
      true: {
        wrapper: "transition-none",
        icon: "transition-none",
        label: "transition-none",
      },
      false: {
        wrapper: [
          "before:transition-colors",
          "group-data-[pressed=true]:scale-95",
          "transition-transform",
          "after:transition-transform-opacity",
          "after:!ease-linear",
          "after:!duration-200",
          "motion-reduce:transition-none",
        ],
        icon: "transition-opacity motion-reduce:transition-none",
        label: "transition-colors-opacity before:transition-width motion-reduce:transition-none",
      },
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
    lineThrough: false,
  },
});
/**
 * CheckboxGroup wrapper **Tailwind Variants** component
 *
 * const {base, label, wrapper} = checkboxGroup({...})
 *
 * @example
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={wrapper()} data-orientation="vertical/horizontal">
 *     // checkboxes
 *  </div>
 * </div>
 */
const checkboxGroup = tv({
  slots: {
    base: "relative flex flex-col gap-2",
    label: "relative text-medium text-background",
    wrapper: "flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row",
    description: "text-small text-background",
    errorMessage: "text-small text-error",
  },
  variants: {
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-error after:ml-0.5",
      },
    },
    isInvalid: {
      true: {
        description: "text-error",
      },
    },
    disableAnimation: {
      true: {},
      false: {
        description: "transition-colors !duration-150 motion-reduce:transition-none",
      },
    },
  },
  defaultVariants: {
    isInvalid: false,
    isRequired: false,
  },
});

export type CheckboxGroupSlots = keyof ReturnType<typeof checkboxGroup>

export type CheckboxVariantProps = VariantProps<typeof checkbox>;
export type CheckboxSlots = keyof ReturnType<typeof checkbox>;

export {checkbox,checkboxGroup};