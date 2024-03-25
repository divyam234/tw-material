import type {ReactNode} from "react";

import {avatarGroup} from "@tw-material/theme";
import {HTMLTwM3Props as HTMLProps, PropGetter} from "@tw-material/system";
import {useDOMRef} from "@tw-material/react-utils";
import {compact} from "@tw-material/shared-utils";
import {ReactRef, getValidChildren} from "@tw-material/react-utils";
import {cloneElement, useMemo} from "react";
import clsx from "clsx";

import {AvatarProps} from "./index";

interface Props extends HTMLProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Whether the avatars should be displayed in a grid
   */
  isGrid?: boolean;
  /**
   * The maximum number of visible avatars
   * @default 5
   */
  max?: number;
  /**
   * Control the number of avatar not visible
   */
  total?: number;
  /**
   * This allows you to render a custom count component.
   */
  renderCount?: (count: number) => ReactNode;
}

export type UseAvatarGroupProps = Props &
  Partial<Pick<AvatarProps, "size" | "radius" | "isDisabled" | "isBordered">>;

export type ContextType = {
  size?: AvatarProps["size"];
  radius?: AvatarProps["radius"];
  isGrid?: boolean;
  isBordered?: AvatarProps["isBordered"];
  isDisabled?: AvatarProps["isDisabled"];
};

export function useAvatarGroup(props: UseAvatarGroupProps = {}) {
  const {
    as,
    ref,
    max = 5,
    total,
    size,
    radius,
    children,
    isBordered,
    isDisabled,
    isGrid,
    renderCount,
    className,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const Component = as || "div";

  const context = useMemo<ContextType>(
    () => ({
      size,
      radius,
      isGrid,
      isBordered,
      isDisabled,
    }),
    [size, radius, isGrid, isBordered, isDisabled],
  );
  const classNames = useMemo(() => avatarGroup({className, isGrid}), [className, isGrid]);

  const validChildren = getValidChildren(children);
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;

  const remainingCount = total ? total : max != null ? validChildren.length - max : -1;

  const clones = childrenWithinMax.map((child, index) => {
    const isFirstAvatar = index === 0;
    const isLastAvatar = index === childrenWithinMax.length - 1;

    const childProps = {
      className: clsx(
        isFirstAvatar ? "ms-0" : !isGrid ? "-ms-2" : "",
        isLastAvatar && remainingCount < 1 ? "hover:-translate-x-0" : "",
      ),
    };

    return cloneElement(child, compact(childProps));
  });

  const getAvatarGroupProps: PropGetter = () => {
    return {
      ref: domRef,
      className: classNames,
      role: "group",
      ...otherProps,
    };
  };

  return {
    Component,
    context,
    remainingCount,
    clones,
    renderCount,
    getAvatarGroupProps,
  };
}

export type UseAvatarReturn = ReturnType<typeof useAvatarGroup>;
