import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {groupDataFocusVisibleClasses} from "../utils";

/**
 * Radio wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, point, labelWrapper, label, description} = radio({...})
 *
 * @example
 * <label
 *    className={base())}
 *    data-selected={boolean}
 *    data-hover-unselected={boolean}
 *    data-focus-visible={boolean}
 * >
 *  // input
 *  <span className={wrapper()} aria-hidden="true" data-selected={selected} data-hover-unselected={hoverUnchecked}>
 *     <span className={point()}/>
 *  </span>
 *  <div className={labelWrapper()}>
 *    <span className={label()}>Label</span>
 *    <span className={description()}>Description</span>
 *  </div>
 * </label>
 */
const radio = tv({
  slots: {
    base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2",
    wrapper: [
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "flex-shrink-0",
      "overflow-hidden",
      "border-solid",
      "border-medium",
      "box-border",
      "border-on-surface-variant",
      "group-data-[selected=true]:border-primary",
      "rounded-full",
      "group-data-[hover-selected=true]:bg-primary/hover",
      "group-data-[hover-unselected=true]:bg-on-surface/hover",
      // focus ring
      ...groupDataFocusVisibleClasses,
    ],
    labelWrapper: "flex flex-col ml-1",
    control: [
      "z-10",
      "w-2",
      "h-2",
      "opacity-0",
      "scale-0",
      "origin-center",
      "rounded-full",
      "group-data-[selected=true]:opacity-100",
      "group-data-[selected=true]:scale-100",
      "group-data-[selected=true]:bg-primary",
      "group-data-[selected=true]:text-on-primary"
    ],
    label: "relative text-on-background select-none",
    description: "relative text-outline",
  },
  variants: {
    size: {
      sm: {
        wrapper: "w-4 h-4",
        control: "w-1.5 h-1.5",
        labelWrapper: "ml-1",
        label: "text-small",
        description: "text-tiny",
      },
      md: {
        wrapper: "w-5 h-5",
        control: "w-2 h-2",
        labelWrapper: "ml-2 rtl:mr-2 rtl:ml-[unset]",
        label: "text-medium",
        description: "text-small",
      },
      lg: {
        wrapper: "w-6 h-6",
        control: "w-2.5 h-2.5",
        labelWrapper: "ml-2 rtl:mr-2 rtl:ml-[unset]",
        label: "text-large",
        description: "text-medium",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    isInvalid: {
      true: {
        control: "bg-error text-on-error",
        wrapper: "border-error group-data-[selected=true]:border-error",
        label: "text-error",
        description: "text-error-60",
      },
    },
    disableAnimation: {
      true: {},
      false: {
        wrapper: [
          "group-data-[pressed=true]:scale-95",
          "transition-transform-colors",
          "motion-reduce:transition-none",
        ],
        control: "transition-transform-opacity motion-reduce:transition-none",
        label: "transition-colors motion-reduce:transition-none",
        description: "transition-colors motion-reduce:transition-none",
      },
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
    isInvalid: false,
  },
});

/**
 * RadioGroup wrapper **Tailwind Variants** component
 *
 * const {base, label, wrapper} = radioGroup({...})
 *
 * @example
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={wrapper()} data-orientation="vertical/horizontal">
 *     // radios
 *  </div>
 * </div>
 */
const radioGroup = tv({
  slots: {
    base: "relative flex flex-col gap-2",
    label: "relative text-on-background",
    wrapper: "flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row",
    description: "text-tiny text-on-background",
    errorMessage: "text-tiny text-error",
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

export type RadioGroupSlots = keyof ReturnType<typeof radioGroup>;

export type RadioVariantProps = VariantProps<typeof radio>;
export type RadioSlots = keyof ReturnType<typeof radio>;

export {radio, radioGroup};