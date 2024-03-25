import React, {Children, cloneElement, useMemo} from "react";
import {useButton as useAriaButton} from "@react-aria/button";
import {mergeProps} from "@react-aria/utils";
import {forwardRef} from "@tw-material/system";
import {pickChildren} from "@tw-material/react-utils";
import {Button} from "@tw-material/button";

import {usePopoverContext} from "./popover-context";

export interface PopoverTriggerProps {
  children?: React.ReactNode;
}

const PopoverTrigger = forwardRef<"button", PopoverTriggerProps>((props, _) => {
  const {triggerRef, getTriggerProps} = usePopoverContext();

  const {children, ...otherProps} = props;

  // force a single child
  const child = useMemo<any>(() => {
    if (typeof children === "string") return <p>{children}</p>;

    return Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };
  }, [children]);

  const {onPress, ...rest} = useMemo(() => {
    return getTriggerProps(mergeProps(otherProps, child.props), child.ref);
  }, [getTriggerProps, child.props, otherProps, child.ref]);

  const [, triggerChildren] = pickChildren(children, Button);

  const {buttonProps} = useAriaButton({onPress}, triggerRef);

  const hasButton = useMemo<boolean>(() => {
    return triggerChildren?.[0] !== undefined;
  }, [triggerChildren]);

  return cloneElement(child, mergeProps(rest, hasButton ? {onPress} : buttonProps));
});

PopoverTrigger.displayName = "PopoverTrigger";

export default PopoverTrigger;
