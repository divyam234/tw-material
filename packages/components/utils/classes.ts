export const baseStyles = (prefix: string) => ({
    color: `hsl(var(--${prefix}-on-background))`,
    backgroundColor: `hsl(var(--${prefix}-background))`,
  });

  export const focusVisibleClasses = [
    "focus-visible:z-10",
    "focus-visible:outline-2",
    "focus-visible:outline-focus",
    "focus-visible:outline-offset-2",
  ];
  
  export const dataFocusVisibleClasses = [
    "outline-none",
    "data-[focus-visible=true]:z-10",
    "data-[focus-visible=true]:outline-2",
    "data-[focus-visible=true]:outline-focus",
    "data-[focus-visible=true]:outline-offset-2",
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
  
  export const collapseAdjacentVariantBorders = {
    default: ["[&+.border-medium.border-default]:ms-[calc(theme(borderWidth.medium)*-1)]"],
    primary: ["[&+.border-medium.border-primary]:ms-[calc(theme(borderWidth.medium)*-1)]"],
    secondary: ["[&+.border-medium.border-secondary]:ms-[calc(theme(borderWidth.medium)*-1)]"],
    success: ["[&+.border-medium.border-success]:ms-[calc(theme(borderWidth.medium)*-1)]"],
    warning: ["[&+.border-medium.border-warning]:ms-[calc(theme(borderWidth.medium)*-1)]"],
    danger: ["[&+.border-medium.border-danger]:ms-[calc(theme(borderWidth.medium)*-1)]"],
  };