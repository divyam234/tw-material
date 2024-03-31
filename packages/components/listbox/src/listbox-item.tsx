import {useMemo, ReactNode} from "react";
import {forwardRef} from "@tw-material/system";

import {UseListboxItemProps, useListboxItem} from "./use-listbox-item";
import {ListboxSelectedIcon} from "./listbox-selected-icon";

export interface ListboxItemProps<T extends object = object> extends UseListboxItemProps<T> {}

/**
 * @internal
 */
const ListboxItem = forwardRef<"li", ListboxItemProps>((props, _) => {
  const {
    Component,
    rendered,
    slots,
    classNames,
    description,
    isSelectable,
    isSelected,
    isDisabled,
    selectedIcon,
    startIcon,
    endIcon,
    hideSelectedIcon,
    disableAnimation,
    getItemProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getSelectedIconProps,
  } = useListboxItem(props);

  const selectedContent = useMemo<ReactNode | null>(() => {
    const defaultIcon = (
      <ListboxSelectedIcon disableAnimation={disableAnimation} isSelected={isSelected} />
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
        <div {...getWrapperProps()}>
          <span {...getLabelProps()}>{rendered}</span>
          <span {...getDescriptionProps()}>{description}</span>
        </div>
      ) : (
        <span {...getLabelProps()}>{rendered}</span>
      )}
      {isSelectable && !hideSelectedIcon && (
        <span {...getSelectedIconProps()}>{selectedContent}</span>
      )}
      {endIcon && !isSelected && (
        <span className={slots.endIcon({class: classNames?.endIcon})}>{endIcon}</span>
      )}
    </Component>
  );
});

ListboxItem.displayName = "ListboxItem";

export default ListboxItem;
