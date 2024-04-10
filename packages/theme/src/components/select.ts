import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

const select = tv({
  slots: {
    base: ["group inline-flex flex-col relative w-full"],
    label: [
      "block",
      "absolute",
      "z-10",
      "origin-top-left",
      "subpixel-antialiased",
      "text-small",
      "text-on-surface-variant",
      "pointer-events-none",
    ],
    mainWrapper: "w-full flex flex-col",
    trigger:
      "relative px-3 gap-3 w-full inline-flex flex-row items-center shadow-sm outline-none tap-highlight-transparent",
    innerWrapper:
      "inline-flex h-full w-[calc(100%_-_theme(spacing.6))] min-h-4 items-center gap-1.5 box-border",
    selectorIcon: "absolute right-3 size-4",
    spinner: "absolute right-3",
    value: ["text-on-surface", "font-normal", "w-full", "text-left"],
    listboxWrapper: "scroll-py-6 max-h-64 w-full",
    listbox: "",
    popoverContent: [
      "w-full overflow-hidden",
      "p-0 shadow-none",
      "bg-transparent border-0",
      "text-inherit rounded-none",
    ],
    helperWrapper: "p-1 flex relative flex-col gap-1.5",
    description: "text-tiny  text-on-surface-400",
    errorMessage: "text-tiny text-error",
  },
  variants: {
    variant: {
      flat: {
        trigger: [
          "bg-surface-container-highest",
          "data-[hover=true]:bg-on-surface/hover",
          "group-data-[focus=true]:bg-surface-container-highest",
        ],
      },
      bordered: {
        trigger: [
          "border-medium",
          "border-outline-variant",
          "data-[hover=true]:border-outline",
          "data-[open=true]:border-on-surface",
          "data-[focus=true]:border-on-surface",
        ],
        label: "text-on-surface-variant",
      },
      underlined: {
        trigger: [
          "!px-1",
          "!pb-0",
          "!gap-0",
          "relative",
          "box-border",
          "bg-surface-container-highest",
          "border-b-medium",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-on-surface-variant",
          "!rounded-none",
          "hover:border-on-surface",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-primary",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "data-[open=true]:after:w-full",
          "data-[focus=true]:after:w-full",
        ],
        label: "text-on-surface-variant",
      },
    },
    size: {
      sm: {
        label: "text-tiny",
        trigger: "h-8 min-h-8 px-2 rounded-small",
        value: "text-small",
      },
      md: {
        trigger: "h-10 min-h-10 rounded-medium",
        value: "text-small",
      },
      lg: {
        trigger: "h-12 min-h-12 rounded-large",
        value: "text-medium",
      },
    },
    radius: {
      none: {
        trigger: "rounded-none",
      },
      sm: {
        trigger: "rounded-small",
      },
      md: {
        trigger: "rounded-medium",
      },
      lg: {
        trigger: "rounded-large",
      },
      full: {
        trigger: "rounded-full",
      },
    },
    labelPlacement: {
      outside: {
        base: "flex flex-col",
      },
      "outside-left": {
        base: "flex-row items-center flex-nowrap items-start",
        label: "relative pr-2 text-on-surface",
      },
      inside: {
        label: "text-tiny cursor-pointer",
        trigger: "flex-col items-start justify-center gap-0",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
        trigger: "pointer-events-none",
      },
    },
    isInvalid: {
      true: {
        label: "!text-error",
        value: "!text-error",
        selectorIcon: "text-error",
      },
    },
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-error after:ml-0.5",
      },
    },
    isMultiline: {
      true: {
        label: "relative",
        trigger: "!h-auto",
      },
      false: {
        value: "truncate",
      },
    },
    disableAnimation: {
      true: {
        trigger: "after:transition-none",
        base: "transition-none",
        label: "transition-none",
        selectorIcon: "transition-none",
      },
      false: {
        base: "transition-background motion-reduce:transition-none !duration-150",
        label: [
          "will-change-auto",
          "origin-top-left",
          "!duration-200",
          "!ease-out",
          "transition-[transform,color,left,opacity]",
          "motion-reduce:transition-none",
        ],
        selectorIcon: "transition-transform duration-150 ease motion-reduce:transition-none",
      },
    },
    disableSelectorIconRotation: {
      true: {},
      false: {
        selectorIcon: "data-[open=true]:rotate-180",
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    size: "md",
    labelPlacement: "inside",
    fullWidth: true,
    isDisabled: false,
    isMultiline: false,
    disableAnimation: false,
    disableSelectorIconRotation: false,
  },
  compoundVariants: [
    // labelPlacement=outside & default
    {
      labelPlacement: "inside",
      class: {
        label: "group-data-[filled=true]:text-on-surface",
      },
    },
    // labelPlacement=outside & default
    {
      labelPlacement: "outside",
      class: {
        label: "group-data-[filled=true]:text-on-surface",
      },
    },
    // radius-full & size
    {
      radius: "full",
      size: ["sm"],
      class: {
        trigger: "px-3",
      },
    },
    {
      radius: "full",
      size: "md",
      class: {
        trigger: "px-4",
      },
    },
    {
      radius: "full",
      size: "lg",
      class: {
        trigger: "px-5",
      },
    },
    // !disableAnimation & variant
    {
      disableAnimation: false,
      variant: "bordered",
      class: {
        trigger: "transition-colors motion-reduce:transition-none",
      },
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        trigger: "after:transition-width motion-reduce:after:transition-none",
      },
    },
    // flat & faded
    {
      variant: "flat",
      class: {
        trigger: [
          // focus ring
          ...dataFocusVisibleClasses,
        ],
      },
    },
    // isInvalid & variant
    {
      isInvalid: true,
      variant: "flat",
      class: {
        trigger: [
          "bg-error-container",
          "data-[hover=true]:bg-error/hover",
          "group-data-[focus=true]:bg-error-container/80",
        ],
      },
    },
    {
      isInvalid: true,
      variant: "bordered",
      class: {
        trigger: "!border-error group-data-[focus=true]:!border-error",
      },
    },
    {
      isInvalid: true,
      variant: "underlined",
      class: {
        trigger: "after:bg-error",
      },
    },
    // size & labelPlacement
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        trigger: "h-12 min-h-12 py-1.5 px-3",
      },
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        trigger: "h-14 min-h-14 py-2",
      },
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: "text-small",
        trigger: "h-16 min-h-16 py-2.5 gap-0",
      },
    },
    //  labelPlacement=[inside, outside]
    {
      labelPlacement: ["inside", "outside"],
      class: {
        label: ["group-data-[filled=true]:pointer-events-auto"],
      },
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      class: {
        base: "group relative justify-end",
        label: ["pb-0", "z-20", "top-1/2", "-translate-y-1/2", "group-data-[filled=true]:left-0"],
      },
    },
    // labelPlacement=[inside]
    {
      labelPlacement: ["inside"],
      class: {
        label: "group-data-[filled=true]:scale-85",
      },
    },
    // inside & size
    {
      labelPlacement: "inside",
      size: ["sm", "md"],
      class: {
        label: "text-small",
      },
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "sm",
      class: {
        label: ["group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_8px)]"],
        innerWrapper: "group-data-[has-label=true]:pt-4",
      },
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)]",
        ],
        innerWrapper: "group-data-[has-label=true]:pt-4",
      },
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_8px)]",
        ],
        innerWrapper: "group-data-[has-label=true]:pt-5",
      },
    },
    // inside & size & [faded, bordered]
    {
      labelPlacement: "inside",
      variant: "bordered",
      isMultiline: false,
      size: "sm",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_8px_-_theme(borderWidth.medium))]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: "bordered",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: "bordered",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_8px_-_theme(borderWidth.medium))]",
        ],
      },
    },
    // inside & size & underlined
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "sm",
      class: {
        label: ["group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_5px)]"],
      },
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_3.5px)]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_4px)]",
        ],
      },
    },
    // outside & size
    {
      labelPlacement: "outside",
      size: "sm",
      isMultiline: false,
      class: {
        label: [
          "left-2",
          "text-tiny",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.tiny)/2_+_16px)]",
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_8px)]",
      },
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "left-3",
          "text-small",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)]",
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)]",
      },
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "left-3",
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_24px)]",
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_12px)]",
      },
    },
    // isMultiline & labelPlacement="outside"
    {
      labelPlacement: "outside",
      isMultiline: true,
      class: {
        label: "pb-1.5",
      },
    },
    // text truncate labelPlacement=[inside,outside]
    {
      labelPlacement: ["inside", "outside"],
      class: {
        label: ["pe-2", "max-w-full", "text-ellipsis", "overflow-hidden"],
      },
    },
  ],
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectSlots = keyof ReturnType<typeof select>;

export {select};
