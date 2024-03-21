import {Node} from "@react-types/shared";
import {TreeState} from "@react-stately/tree";
import {useMenuSection} from "@react-aria/menu";
import {useMemo, Key} from "react";
import {forwardRef} from "@tw-material/system";
import {mergeProps} from "@react-aria/utils";
import {clsx} from "clsx";
import {menuSection} from "@tw-material/theme";

import MenuItem, {MenuItemProps} from "./menu-item";
import {MenuSectionBaseProps} from "./base/menu-section-base";

export interface MenuSectionProps<T extends object = object> extends MenuSectionBaseProps {
  item: Node<T>;
  state: TreeState<T>;
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
   * Callback fired when the menu item is selected.
   */
  onAction?: (key: Key) => void;
}

/**
 * @internal
 */
const MenuSection = forwardRef<"li", MenuSectionProps>(
  (
    {
      item,
      state,
      as,
      disableAnimation,
      onAction,
      closeOnSelect,
      className,
      classNames,
      hideSelectedIcon,
      itemClasses,
      // removed title from props to avoid browsers showing a tooltip on hover
      // the title props is already inside the rendered prop
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      title,
      ...otherProps
    },
    _,
  ) => {
    const Component = as || "li";

    const slots = useMemo(() => menuSection(), []);

    const baseStyles = clsx(classNames?.base, className);

    const {itemProps, headingProps, groupProps} = useMenuSection({
      heading: item.rendered,
      "aria-label": item["aria-label"],
    });

    return (
      <Component
        data-slot="base"
        {...mergeProps(itemProps, otherProps)}
        className={slots.base({class: baseStyles})}
      >
        {item.rendered && (
          <span
            {...headingProps}
            className={slots.heading({class: classNames?.heading})}
            data-slot="heading"
          >
            {item.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          className={slots.group({class: classNames?.group})}
          data-has-title={!!item.rendered}
          data-slot="group"
        >
          {[...item.childNodes].map((node) => {
            const {key: nodeKey, props: nodeProps} = node;

            let menuItem = (
              <MenuItem
                key={nodeKey}
                classNames={itemClasses}
                closeOnSelect={closeOnSelect}
                disableAnimation={disableAnimation}
                hideSelectedIcon={hideSelectedIcon}
                item={node}
                state={state}
                onAction={onAction}
                {...nodeProps}
              />
            );

            if (node.wrapper) {
              menuItem = node.wrapper(menuItem);
            }

            return menuItem;
          })}
        </ul>
      </Component>
    );
  },
);

MenuSection.displayName = "MenuSection";

export default MenuSection;
