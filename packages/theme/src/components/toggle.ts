import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {groupDataFocusVisibleClasses} from "../utils";

/**
 * Toggle (Switch) wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, thumb, thumbIcon, label, startContent, endContent} = toggle({...})
 *
 * @example
 * <label
 *    className={base())}
 *    data-selected={true/false}
 *    data-pressed={true/false}
 *    data-focus={true/false}
 *    data-hover={true/false}
 *    data-focus-visible={true/false}
 * >
 *  <input/> // hidden input
 *  <span className={wrapper()} aria-hidden="true">
 *    <svg className={startContent()}>...</svg>
 *    <span className={thumb()}>
 *      <svg className={thumbIcon()}>...</svg>
 *    </span>
 *    <svg className={endContent()}>...</svg>
 *  </span>
 *  <span className={label()}>Label</span>
 * </label>
 */
const toggle = tv({
  slots: {
    base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer touch-none tap-highlight-transparent",
    wrapper: [
      "px-1",
      "relative",
      "inline-flex",
      "items-center",
      "justify-start",
      "flex-shrink-0",
      "overflow-hidden",
      "bg-surface-container-highest",
      "border-2",
      "border-outline",
      "rounded-full",
      "group-data-[selected=true]:bg-primary",
      "group-data-[selected=true]:border-0",
      ...groupDataFocusVisibleClasses,
    ],
    thumb: [
      "z-10",
      "flex",
      "items-center",
      "justify-center",
      "bg-outline",
      "group-data-[selected=true]:bg-on-primary",
      "shadow-small",
      "rounded-full",
      "origin-right",
    ],
    startContent: "z-0 absolute left-1.5 rtl:right-1.5 rtl:left-[unset] text-current",
    endContent: "z-0 absolute right-1.5 rtl:left-1.5 rtl:right-[unset] text-default-600",
    thumbIcon: "text-surface-container-highest group-data-[selected=true]:text-primary",
    label: "relative text-on-background select-none",
  },
  variants: {
    size: {
      sm: {
        wrapper: "w-10 h-6 mr-2 rtl:ml-2 rtl:mr-[unset]",
        thumb: [
          "size-3 text-tiny group-data-[selected=true]:size-4",
          "group-data-[selected=true]:ml-4 rtl:group-data-[selected=true]:ml-0 rtl:group-data-[selected=true]:mr-4",
        ],
        endContent: "text-tiny",
        startContent: "text-tiny",
        label: "text-small",
      },
      md: {
        wrapper: "w-12 h-7 mr-2 rtl:ml-2 rtl:mr-[unset]",
        thumb: [
          "size-4 text-small group-data-[selected=true]:size-5",
          "group-data-[selected=true]:ml-5 rtl:group-data-[selected=true]:ml-0 rtl:group-data-[selected=true]:mr-5",
        ],
        endContent: "text-small",
        startContent: "text-small",
        label: "text-medium",
      },
      lg: {
        wrapper: "w-14 h-8 mr-2 rtl:ml-2 rtl:mr-[unset]",
        thumb: [
          "size-5 text-medium group-data-[selected=true]:size-6",
          "group-data-[selected=true]:ml-6 rtl:group-data-[selected=true]:ml-0 rtl:group-data-[selected=true]:mr-6",
        ],
        endContent: "text-medium",
        startContent: "text-medium",
        label: "text-large",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    disableAnimation: {
      true: {
        wrapper: "transition-none",
        thumb: "transition-none",
      },
      false: {
        wrapper: "transition-background",
        thumb: "transition-all",
        startContent: [
          "opacity-0",
          "scale-50",
          "transition-transform-opacity",
          "group-data-[selected=true]:scale-100",
          "group-data-[selected=true]:opacity-100",
        ],
        endContent: [
          "opacity-100",
          "transition-transform-opacity",
          "group-data-[selected=true]:translate-x-3",
          "group-data-[selected=true]:opacity-0",
        ],
      },
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
  compoundVariants: [
    {
      disableAnimation: false,
      size: "sm",
      class: {
        thumb: ["group-data-[pressed=true]:w-5", "group-data-[selected]:group-data-[pressed]:ml-3"],
      },
    },
    {
      disableAnimation: false,
      size: "md",
      class: {
        thumb: ["group-data-[pressed=true]:w-6", "group-data-[selected]:group-data-[pressed]:ml-4"],
      },
    },
    {
      disableAnimation: false,
      size: "lg",
      class: {
        thumb: ["group-data-[pressed=true]:w-7", "group-data-[selected]:group-data-[pressed]:ml-5"],
      },
    },
  ],
});

export type ToggleVariantProps = VariantProps<typeof toggle>;
export type ToggleSlots = keyof ReturnType<typeof toggle>;

export {toggle};
