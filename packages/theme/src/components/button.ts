import type {VariantProps} from "tailwind-variants";
import {dataFocusVisibleClasses, tv} from "../utils";

const button = tv({
  slots: {
    base: [
      "z-0",
      "group",
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "box-border",
      "appearance-none",
      "outline-none",
      "select-none",
      "whitespace-nowrap",
      "min-w-max",
      "subpixel-antialiased",
      "overflow-hidden",
      "tap-highlight-transparent",
      ...dataFocusVisibleClasses,
    ],
    startIcon: "",
    endIcon: "",
  },
  variants: {
    variant: {
      elevated: {
        base: "bg-surface-container-low",
      },
      filled: {
        base: "bg-primary",
      },
      outlined: {
        base: "bg-transparent",
      },
      text: {
        base: "bg-transparent",
      },
      filledTonal: {
        base: "bg-secondary-container",
      },
    },
    size: {
      sm: {
        base: "pr-6 pl-6 data-[start-icon=true]:pl-4 data-[end-icon=true]:pr-4 px-3 min-w-16 h-8 text-label-medium gap-2 rounded-full",
        startIcon: "size-4 [&>svg]:size-4",
        endIcon: "size-4 [&>svg]:size-4",
      },
      md: {
        base: "pr-6 pl-6 data-[start-icon=true]:pl-4 data-[end-icon=true]:pr-4 min-w-20 h-10 text-label-large gap-2 rounded-full",
        startIcon: "size-[18px] [&>svg]:size-[18px]",
        endIcon: "size-[18px]  [&>svg]:size-[18px]",
      },
      lg: {
        base: "pr-6 pl-6 data-[start-icon=true]:pl-4 data-[end-icon=true]:pr-4 px-8 min-w-24 h-12 text-label-large gap-2 rounded-full",
        startIcon: "size-5  [&>svg]:size-5",
        endIcon: "size-5  [&>svg]:size-5",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-small",
      },
      md: {
        base: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
      },
      full: {
        base: "rounded-full",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isIconOnly: {
      true: {
        base: "px-0 gap-0 [&>svg]:size-6",
      },
      false: {
        base: "[&>svg]:max-w-[theme(spacing.8)]",
      },
    },
    isDisabled: {
      true: {
        base: "pointer-events-none",
      },
    },
    disableAnimation: {
      true: {
        base: "!transition-none",
      },
      false: {
        base: "transition-[background-color,box-shadow,border-color,color] ease-standard motion-reduce:transition-none",
      },
    },
  },
  defaultVariants: {
    variant: "elevated",
    size: "md",
    fullWidth: false,
    isDisabled: false,
    disableAnimation: false,
  },
  compoundVariants: [
    {
      variant: "elevated",
      class: {
        base: "shadow-1 data-[hover=true]:bg-primary/hover data-[hover=true]:shadow-2 text-primary",
      },
    },
    {
      variant: ["filled", "filledTonal"],
      class: {
        base: "shadow-0 data-[hover=true]:shadow-1",
      },
    },
    {
      variant: ["filled"],
      class: {
        base: "data-[hover=true]:bg-primary/[0.92] text-on-primary",
      },
    },
    {
      variant: ["filledTonal"],
      class: {
        base: "data-[hover=true]:bg-secondary-container/[0.92] text-on-secondary-container",
      },
    },
    {
      variant: ["outlined", "text"],
      class: {
        base: "shadow-0 text-primary data-[hover=true]:bg-primary/hover",
      },
    },
    {
      variant: ["outlined"],
      class: {
        base: "border border-outline",
      },
    },
    {
      isDisabled: true,
      variant: ["elevated", "filled", "filledTonal"],
      class: {
        base: "bg-on-surface/focus text-on-surface/[0.38] shadow-0",
      },
    },
    {
      isDisabled: true,
      variant: ["outlined", "text"],
      class: {
        base: "bg-transparent text-on-surface/[0.38] shadow-0",
      },
    },
    {
      isIconOnly: true,
      size: "sm",
      class: {
        base: "min-w-8 size-8 [&>svg]:size-4",
      },
    },
    {
      isIconOnly: true,
      size: "md",
      class: {
        base: "min-w-10 size-10",
      },
    },
    {
      isIconOnly: true,
      size: "lg",
      class: {
        base: "min-w-12 size-8",
      },
    },
  ],
});

export type ButtonVariantProps = VariantProps<typeof button>;

export type ButtonSlots = keyof ReturnType<typeof button>;

export {button};
