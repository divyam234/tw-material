export const baseStyles = (prefix: string) => ({
  color: `hsl(var(--${prefix}-on-background))`,
  backgroundColor: `hsl(var(--${prefix}-background))`,
});

export const dataFocusVisibleClasses = [
  "data-[focus-visible=true]:z-10",
  "data-[focus-visible=true]:outline-[3px]",
  "data-[focus-visible=true]:outline-secondary",
  "data-[focus-visible=true]:outline-offset-2",
  "data-[focus-visible=true]:shadow-1",
];

export const groupDataFocusVisibleClasses = [
  "outline-none",
  "group-data-[focus-visible=true]:z-10",
  "group-data-[focus-visible=true]:ring-2",
  "group-data-[focus-visible=true]:ring-focus",
  "group-data-[focus-visible=true]:ring-offset-2",
  "group-data-[focus-visible=true]:ring-offset-background",
];

export const ringClasses = [
  "outline-none",
  "ring-2",
  "ring-focus",
  "ring-offset-2",
  "ring-offset-background",
];

export const translateCenterClasses = [
  "absolute",
  "top-1/2",
  "left-1/2",
  "-translate-x-1/2",
  "-translate-y-1/2",
];

export const absoluteFullClasses = ["absolute", "inset-0"];

export const scrollbarClasses = [
  "[&::-webkit-scrollbar]:w-2",
  "[&::-webkit-scrollbar-thumb]:bg-secondary",
  "[&::-webkit-scrollbar-thumb]:rounded-md]",
];
