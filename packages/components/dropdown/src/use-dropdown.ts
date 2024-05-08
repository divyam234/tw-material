import type {HTMLTwM3Props, PropGetter} from "@tw-material/system";
import type {PopoverProps} from "@tw-material/popover";
import type {MenuTriggerType} from "@react-types/menu";
import type {Ref} from "react";
import type {MenuProps} from "@tw-material/menu";

import {useMenuTriggerState} from "@react-stately/menu";
import {useMenuTrigger} from "@react-aria/menu";
import {clsx} from "clsx";
import {ReactRef, mergeRefs} from "@tw-material/react-utils";
import {useMemo, useRef} from "react";
import {mergeProps} from "@react-aria/utils";
import {dropdown} from "@tw-material/theme";

interface Props extends HTMLTwM3Props<"div"> {
  /**
   * Type of overlay that is opened by the trigger.
   */
  type?: "menu";
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * How the menu is triggered.
   * @default 'press'
   */
  trigger?: MenuTriggerType;
  /**
   * Whether menu trigger is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the Menu closes when a selection is made.
   * @default true
   */
  closeOnSelect?: boolean;
}

export type UseDropdownProps = Props & Omit<PopoverProps, "children" | "color" | "variant">;

export function useDropdown(props: UseDropdownProps) {
  const {
    as,
    triggerRef: triggerRefProp,
    isOpen,
    defaultOpen,
    onOpenChange,
    type = "menu",
    trigger = "press",
    placement = "bottom",
    isDisabled = false,
    closeOnSelect = true,
    shouldBlockScroll = true,
    classNames: classNamesProp,
    disableAnimation = false,
    onClose,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const triggerRef = useRef<HTMLElement>(null);
  const menuTriggerRef = triggerRefProp || triggerRef;
  const menuRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const state = useMenuTriggerState({
    trigger,
    isOpen,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
  });

  const {menuTriggerProps, menuProps} = useMenuTrigger<object>(
    {type, trigger, isDisabled},
    state,
    menuTriggerRef,
  );

  const classNames = useMemo(
    () =>
      dropdown({
        className,
      }),
    [className],
  );

  const onMenuAction = (menuCloseOnSelect?: boolean) => {
    if (menuCloseOnSelect !== undefined && !menuCloseOnSelect) {
      return;
    }
    if (closeOnSelect) {
      state.close();
    }
  };

  const getPopoverProps: PropGetter = (props = {}) => ({
    state,
    placement,
    ref: popoverRef,
    disableAnimation,
    shouldBlockScroll,
    scrollRef: menuRef,
    triggerRef: menuTriggerRef,
    ...mergeProps(otherProps, props),
    classNames: {
      ...classNamesProp,
      ...props.classNames,
      content: clsx(classNames, classNamesProp?.content, props.className),
    },
  });

  const getMenuTriggerProps: PropGetter = (
    originalProps = {},
    _ref: Ref<any> | null | undefined = null,
  ) => {
    // These props are not needed for the menu trigger since it is handled by the popover trigger.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {onKeyDown, onPress, onPressStart, ...otherMenuTriggerProps} = menuTriggerProps;

    return {
      ...mergeProps(otherMenuTriggerProps, {isDisabled}, originalProps),
      ref: mergeRefs(_ref, triggerRef),
    };
  };

  const getMenuProps = <T>(
    props?: Partial<MenuProps<T>>,
    _ref: Ref<any> | null | undefined = null,
  ) => {
    return {
      ref: mergeRefs(_ref, menuRef),
      menuProps,
      closeOnSelect,
      ...mergeProps(props, {
        onAction: () => onMenuAction(props?.closeOnSelect),
        onClose: state.close,
      }),
    } as MenuProps;
  };

  return {
    Component,
    menuRef,
    menuProps,
    classNames,
    closeOnSelect,
    onClose: state.close,
    autoFocus: state.focusStrategy || true,
    disableAnimation,
    getPopoverProps,
    getMenuProps,
    getMenuTriggerProps,
  };
}
export type UseDropdownReturn = ReturnType<typeof useDropdown>;
