import type {ReactNode} from "react";
import type {RippleProps} from "@tw-material/ripple";
import type {SlotsToClasses} from "@tw-material/theme";
import type {SpinnerProps} from "@tw-material/spinner";

import {
  mapPropsVariants,
  type HTMLTwM3Props as HTMLProps,
  type PropGetter,
} from "@tw-material/system";
import {MouseEventHandler, useCallback} from "react";
import {useFocusRing} from "@react-aria/focus";
import {chain, mergeProps} from "@react-aria/utils";
import {useDOMRef, filterDOMProps} from "@tw-material/react-utils";
import {dataAttr} from "@tw-material/shared-utils";
import {clsx} from "clsx";
import {isValidElement, cloneElement, useMemo} from "react";
import {useHover} from "@react-aria/interactions";
import {useRipple} from "@tw-material/ripple";
import {ButtonSlots, ButtonVariantProps, button} from "@tw-material/theme";
import {useAriaButton, type AriaButtonProps} from "@tw-material/use-button";
import {ReactRef} from "@tw-material/react-utils";

interface Props extends HTMLProps<"button"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * The button start content.
   */
  startIcon?: ReactNode;
  /**
   * The button end content.
   */
  endIcon?: ReactNode;
  /**
   * Spinner to display when loading.
   */
  spinner?: ReactNode;
  /**
   * The spinner placement.
   * @default "start"
   */
  spinnerPlacement?: "start" | "end";
  /**
   * Whether the button should display a loading spinner.
   * @default false
   */
  isLoading?: boolean;

  /**
   * The native button click event handler.
   * use `onPress` instead.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   */

  classNames?: SlotsToClasses<ButtonSlots>;
}

export type UseButtonProps = Props &
  Omit<AriaButtonProps, keyof ButtonVariantProps> &
  ButtonVariantProps;

export function useButton(originalProps: UseButtonProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, button.variantKeys);
  const {
    ref,
    as,
    children,
    startIcon: startIconProp,
    endIcon: endIconProp,
    autoFocus,
    className,
    classNames,
    disableRipple = false,
    isLoading = false,
    spinnerPlacement = "start",
    spinner,
    onPress,
    onClick,
    ...otherProps
  } = props;

  const Component = as || "button";

  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
  });

  const slots = useMemo(
    () =>
      button({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const {onClick: onRippleClickHandler, onClear: onClearRipple, ripples} = useRipple();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disableRipple || originalProps.isDisabled || originalProps.disableAnimation) return;
      domRef.current && onRippleClickHandler(e);
    },
    [
      disableRipple,
      originalProps.isDisabled,
      originalProps.disableAnimation,
      domRef,
      onRippleClickHandler,
    ],
  );

  const {buttonProps: ariaButtonProps, isPressed} = useAriaButton(
    {
      elementType: as,
      isDisabled: originalProps.isDisabled,
      onPress,
      onClick: chain(onClick, handleClick),
      ...otherProps,
    } as UseButtonProps,
    domRef,
  );

  const {isHovered, hoverProps} = useHover({
    isDisabled: originalProps.isDisabled,
  });

  const getButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      "data-disabled": dataAttr(originalProps.isDisabled),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(isPressed),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-loading": dataAttr(isLoading),
      "data-start-icon": dataAttr(startIconProp !== undefined),
      "data-end-icon": dataAttr(endIconProp !== undefined),
      className: slots.base({class: clsx(classNames?.base, className)}),
      ...mergeProps(
        ariaButtonProps,
        focusProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        filterDOMProps(props),
      ),
    }),
    [
      originalProps.isDisabled,
      isFocused,
      isPressed,
      shouldFilterDOMProps,
      isFocusVisible,
      isHovered,
      ariaButtonProps,
      focusProps,
      hoverProps,
      otherProps,
    ],
  );

  const getStartButtonProps: PropGetter = () => {
    return {
      className: slots.startIcon({class: classNames?.startIcon}),
    };
  };

  const getEndButtonProps: PropGetter = () => {
    return {
      className: slots.endIcon({class: classNames?.endIcon}),
    };
  };

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
          // @ts-ignore
          "aria-hidden": true,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const startIcon = getIconClone(startIconProp);

  const endIcon = getIconClone(endIconProp);

  const size = originalProps.size ?? "md";

  const spinnerSize = useMemo(() => {
    const buttonSpinnerSizeMap: Record<string, SpinnerProps["size"]> = {
      sm: "sm",
      md: "sm",
      lg: "md",
    };

    return buttonSpinnerSizeMap[size];
  }, [size]);

  const getRippleProps = useCallback<() => RippleProps>(
    () => ({ripples, onClear: onClearRipple}),
    [ripples, onClearRipple],
  );

  return {
    Component,
    children,
    domRef,
    slots,
    startIcon,
    endIcon,
    isLoading,
    spinner,
    spinnerPlacement,
    spinnerSize,
    isIconOnly: originalProps.isIconOnly,
    disableRipple,
    getButtonProps,
    getRippleProps,
    getStartButtonProps,
    getEndButtonProps,
  };
}

export type UseButtonReturn = ReturnType<typeof useButton>;
