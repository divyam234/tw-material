import type {HTMLTwM3Props, PropGetter} from "@tw-material/system";
import type {AriaMenuProps} from "@react-types/menu";
import type {SlotsToClasses} from "@tw-material/theme";

import {AriaMenuOptions, useMenu as useAriaMenu} from "@react-aria/menu";
import {TreeState, useTreeState} from "@react-stately/tree";
import {ReactRef, filterDOMProps, useDOMRef} from "@tw-material/react-utils";
import {ReactNode, useMemo} from "react";
import {clsx} from "@tw-material/shared-utils";
import {menu, MenuVariantProps, MenuSlots} from "@tw-material/theme";

import {MenuItemProps} from "./menu-item";

interface Props<T> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The controlled state of the menu.
   */
  state?: TreeState<T>;
  /**
   * The menu aria props.
   */
  menuProps?: AriaMenuOptions<T>;

  /**
   * Whether to hide the check icon when the items are selected.
   * @default false
   */
  hideSelectedIcon?: boolean;
  /**
   * Provides content to include a component in the top of the table.
   */
  topContent?: ReactNode;
  /**
   * Provides content to include a component in the bottom of the table.
   */
  bottomContent?: ReactNode;
  /**
   * Whether to not display the empty content when there are no items.
   * @default false
   */
  hideEmptyContent?: boolean;
  /**
   *  Provides content to display when there are no items.
   * @default "No items."
   */
  emptyContent?: React.ReactNode;
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Whether the menu should close when the menu item is selected.
   * @default true
   */
  closeOnSelect?: MenuItemProps["closeOnSelect"];
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Listbox classNames={{
   *    base:"base-classes",
   *    emptyContent: "empty-content-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<MenuSlots>;
  /**
   * The menu items classNames.
   */
  itemClasses?: MenuItemProps["classNames"];
}

export type UseMenuProps<T = object> = Props<T> &
  Omit<HTMLTwM3Props<"ul">, keyof AriaMenuProps<T>> &
  AriaMenuProps<T> &
  MenuVariantProps;

export function useMenu<T extends object>(props: UseMenuProps<T>) {
  const {
    as,
    ref,
    children,
    disableAnimation,
    onAction,
    closeOnSelect,
    itemClasses,
    className,
    state: propState,
    topContent,
    bottomContent,
    hideEmptyContent = false,
    hideSelectedIcon = false,
    emptyContent = "No items.",
    menuProps: userMenuProps,
    onClose,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "ul";

  const domRef = useDOMRef(ref);
  const shouldFilterDOMProps = typeof Component === "string";

  const innerState = useTreeState({...otherProps, children});

  const state = propState || innerState;

  const {menuProps} = useAriaMenu(otherProps, state, domRef);

  const slots = useMemo(() => menu({className}), [className]);
  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-slot": "base",
      className: slots.base({class: baseStyles}),
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      ...props,
    };
  };

  const getListProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "list",
      className: slots.list({class: classNames?.list}),
      ...userMenuProps,
      ...menuProps,

      ...props,
    };
  };

  const getEmptyContentProps: PropGetter = (props = {}) => {
    return {
      children: emptyContent,
      className: slots.emptyContent({class: classNames?.emptyContent}),
      ...props,
    };
  };

  return {
    Component,
    state,
    disableAnimation,
    onAction,
    onClose,
    topContent,
    bottomContent,
    closeOnSelect,
    className,
    itemClasses,
    getBaseProps,
    getListProps,
    hideEmptyContent,
    hideSelectedIcon,
    getEmptyContentProps,
  };
}

export type UseMenuReturn = ReturnType<typeof useMenu>;
