import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

/**
 * Slider wrapper **Tailwind Variants** component
 *
 * @example
 *
 * const slots = slider()
 *
 * <div className={slots.base()}>
 *  <div className={slots.labelWrapper()}>
 *    <label className={slots.label()}>Label</label>
 *    <output className={slots.value()} />
 *  </div>
 *  <div className={slots.trackWrapper()}>
 *      <div className={slots.startContent()}>Start Content</div>
 *      <div className={slots.track()}>
 *         <div className={slots.filler()} />
 *         <div className={slots.step()} />
 *         <div className={slots.thumb()} />
 *         <div className={slots.mark()}>Mark</div>
 *      </div>
 *     <div className={slots.endContent()}>End Content</div>
 *   </div>
 * </div>
 */
const slider = tv({
  slots: {
    base: "flex flex-col w-full gap-1",
    labelWrapper: "w-full flex justify-between items-center",
    label: "",
    value: "",
    step: [
      "h-1.5",
      "w-1.5",
      "absolute",
      "rounded-full",
      "bg-primary",
      "data-[in-range=true]:bg-primary",
    ],
    mark: [
      "absolute",
      "text-small",
      "cursor-default",
      "opacity-50",
      "data-[in-range=true]:opacity-100",
    ],
    trackWrapper: "relative flex gap-2",
    track: ["flex", "w-full", "relative", "rounded-full", "bg-secondary-container"],
    filler: "h-full absolute bg-primary",
    thumb: [
      "flex",
      "justify-center",
      "items-center",
      "bg-primary",
      "before:absolute",
      "before:w-11",
      "before:h-11",
      "before:rounded-full",
      "after:shadow-1",
      "after:shadow-1",
      "after:bg-background",
      "data-[focused=true]:z-10",
      dataFocusVisibleClasses,
    ],
    startContent: [],
    endContent: [],
  },
  variants: {
    size: {
      sm: {
        label: "text-small",
        value: "text-small",
        thumb: "w-5 h-5 after:w-4 after:h-4",
      },
      md: {
        thumb: "w-6 h-6 after:w-5 after:h-5",
        label: "text-small",
        value: "text-small",
      },
      lg: {
        thumb: "h-7 w-7 after:w-5 after:h-5",
        step: "w-2 h-2",
        label: "text-medium",
        value: "text-medium",
        mark: "mt-2",
      },
    },
    radius: {
      none: {
        thumb: "rounded-none after:rounded-none",
      },
      sm: {
        thumb:
          "rounded-[calc(theme(borderRadius.small)/2)] after:rounded-[calc(theme(borderRadius.small)/3)]",
      },
      md: {
        thumb:
          "rounded-[calc(theme(borderRadius.medium)/2)] after:rounded-[calc(theme(borderRadius.medium)/3)]",
      },
      lg: {
        thumb:
          "rounded-[calc(theme(borderRadius.large)/1.5)] after:rounded-[calc(theme(borderRadius.large)/2)]",
      },
      full: {
        thumb: "rounded-full after:rounded-full",
      },
    },
    isVertical: {
      true: {
        base: "w-auto h-full flex-col-reverse items-center",
        trackWrapper: "flex-col h-full justify-center items-center",
        filler: "w-full h-auto",
        thumb: "left-1/2",
        track: "h-full border-y-transparent",
        labelWrapper: "flex-col justify-center items-center",
        step: ["left-1/2", "-translate-x-1/2", "translate-y-1/2"],
        mark: ["left-1/2", "ml-1", "translate-x-1/2", "-translate-y-1/2"],
      },
      false: {
        thumb: "top-1/2",
        trackWrapper: "items-center",
        track: "border-x-transparent",
        step: ["top-1/2", "-translate-x-1/2", "-translate-y-1/2"],
        mark: ["top-1/2", "mt-1", "-translate-x-1/2", "translate-y-1/2"],
      },
    },
    isDisabled: {
      false: {
        thumb: ["cursor-pointer"],
      },
      true: {
        base: "opacity-disabled",
        thumb: "cursor-default",
      },
    },
    hasMarks: {
      true: {
        base: "mb-5",
      },
      false: {},
    },
    showOutline: {
      true: {
        thumb: "ring-2 ring-background",
      },
      false: {
        thumb: "ring-transparent border-0",
      },
    },
    hideValue: {
      true: {
        value: "sr-only",
      },
    },
    hideThumb: {
      true: {
        thumb: "sr-only",
        track: "overflow-hidden cursor-pointer",
      },
    },
    hasSingleThumb: {
      true: {},
      false: {},
    },
    disableAnimation: {
      true: {
        thumb: "data-[dragging=true]:after:scale-100",
      },
      false: {
        thumb: "after:transition-all motion-reduce:after:transition-none",
        mark: "transition-opacity motion-reduce:transition-none",
      },
    },
    disableThumbScale: {
      true: {},
      false: {
        thumb: "data-[dragging=true]:after:scale-80",
      },
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      showOutline: false,
      class: {
        thumb: "shadow-1",
      },
    },
    // size && !isVertical
    {
      size: "sm",
      isVertical: false,
      class: {
        track:
          "h-1 my-[calc((theme(spacing.5)-theme(spacing.1))/2)] data-[thumb-hidden=false]:border-x-[calc(theme(spacing.5)/2)]",
      },
    },
    {
      size: "md",
      isVertical: false,
      class: {
        track:
          "h-3 my-[calc((theme(spacing.6)-theme(spacing.3))/2)] data-[thumb-hidden=false]:border-x-[calc(theme(spacing.6)/2)]",
      },
    },
    {
      size: "lg",
      isVertical: false,
      class: {
        track:
          "h-7 my-[calc((theme(spacing.7)-theme(spacing.5))/2)] data-[thumb-hidden=false]:border-x-[calc(theme(spacing.7)/2)]",
      },
    },
    // size && isVertical
    {
      size: "sm",
      isVertical: true,
      class: {
        track:
          "w-1 mx-[calc((theme(spacing.5)-theme(spacing.1))/2)] data-[thumb-hidden=false]:border-y-[calc(theme(spacing.5)/2)]",
      },
    },
    {
      size: "md",
      isVertical: true,
      class: {
        track:
          "w-3 mx-[calc((theme(spacing.6)-theme(spacing.3))/2)] data-[thumb-hidden=false]:border-y-[calc(theme(spacing.6)/2)]",
      },
    },
    {
      size: "lg",
      isVertical: true,
      class: {
        track:
          "w-7 mx-[calc((theme(spacing.7)-theme(spacing.5))/2)] data-[thumb-hidden=false]:border-y-[calc(theme(spacing.7)/2)]",
      },
    },
    // color && !isVertical && hasSingleThumb
    {
      isVertical: false,
      hasSingleThumb: true,
      class: {
        track: "border-s-primary",
      },
    },
    {
      isVertical: true,
      hasSingleThumb: true,
      class: {
        track: "border-b-primary",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    radius: "full",
    hideValue: false,
    hideThumb: false,
    isDisabled: false,
    disableThumbScale: false,
    disableAnimation: false,
    showOutline: false,
  },
});

export type SliderVariantProps = VariantProps<typeof slider>;
export type SliderSlots = keyof ReturnType<typeof slider>;

export {slider};
