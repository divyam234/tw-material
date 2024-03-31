import {useMemo, ReactNode} from "react";
import {forwardRef} from "@tw-material/system";

import {UseMenuItemProps, useMenuItem} from "./use-menu-item";
import {MenuSelectedIcon} from "./menu-selected-icon";

export interface MenuItemProps<T extends object = object> extends UseMenuItemProps<T> {}

/**
 * @internal
 */
const MenuItem = forwardRef<"li", MenuItemProps>((props, _) => {
  const {
    Component,
    slots,
    classNames,
    rendered,
    shortcut,
    description,
    isSelectable,
    isSelected,
    isDisabled,
    selectedIcon,
    startIcon,
    endIcon,
    disableAnimation,
    hideSelectedIcon,
    getItemProps,
    getLabelProps,
    getDescriptionProps,
    getKeyboardShortcutProps,
    getSelectedIconProps,
  } = useMenuItem(props);

  const selectedContent = useMemo<ReactNode | null>(() => {
    const defaultIcon = (
      <MenuSelectedIcon disableAnimation={disableAnimation} isSelected={isSelected} />
    );

    if (typeof selectedIcon === "function") {
      return selectedIcon({icon: defaultIcon, isSelected, isDisabled});
    }

    if (selectedIcon) return selectedIcon;

    return defaultIcon;
  }, [selectedIcon, isSelected, isDisabled, disableAnimation]);

  return (
    <Component {...getItemProps()}>
      {startIcon && (
        <span className={slots.startIcon({class: classNames?.startIcon})}>{startIcon}</span>
      )}
      {description ? (
        <div className={slots.wrapper({class: classNames?.wrapper})}>
          <span {...getLabelProps()}>{rendered}</span>
          <span {...getDescriptionProps()}>{description}</span>
        </div>
      ) : (
        <span {...getLabelProps()}>{rendered}</span>
      )}
      {shortcut && <kbd {...getKeyboardShortcutProps()}>{shortcut}</kbd>}
      {isSelectable && !hideSelectedIcon && (
        <span {...getSelectedIconProps()}>{selectedContent}</span>
      )}
      {endIcon && !isSelected && (
        <span className={slots.endIcon({class: classNames?.endIcon})}>{endIcon}</span>
      )}
    </Component>
  );
});

MenuItem.displayName = "MenuItem";

export default MenuItem;
