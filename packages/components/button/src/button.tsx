import {Ripple} from "@tw-material/ripple";
import {forwardRef} from "@tw-material/system";
import {Spinner} from "@tw-material/spinner";

import {UseButtonProps, useButton} from "./use-button";

export interface ButtonProps extends UseButtonProps {}

const Button = forwardRef<"button", ButtonProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    startContent,
    endContent,
    spinnerSize,
    spinner = (
      <Spinner
        classNames={{
          circle1: "border-b-current",
          circle2: "border-b-current",
        }}
        size={spinnerSize}
      />
    ),
    spinnerPlacement,
    disableRipple,
    isLoading,
    isIconOnly,
    getButtonProps,
    getRippleProps,
    getStartButtonProps,
    getEndButtonProps,
  } = useButton({...props, ref});

  return (
    <Component ref={domRef} {...getButtonProps()}>
      {startContent && !isLoading && <span {...getStartButtonProps()}>{startContent}</span>}
      {isLoading && spinnerPlacement === "start" && (
        <span {...getStartButtonProps()}>{spinner}</span>
      )}
      {isLoading && isIconOnly ? null : children}
      {endContent && !isLoading && <span {...getEndButtonProps()}>{endContent}</span>}
      {isLoading && spinnerPlacement === "end" && <span {...getEndButtonProps()}>{spinner}</span>}
      {!disableRipple && <Ripple {...getRippleProps()} />}
    </Component>
  );
});

Button.displayName = "TwMaterial.Button";

export default Button;
