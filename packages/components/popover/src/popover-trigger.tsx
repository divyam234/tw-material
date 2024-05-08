import React, {Children, cloneElement, useMemo} from "react";
import {useAriaButton} from "@nextui-org/use-aria-button";
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

  const child = useMemo<any>(() => {
    if (typeof children === "string") return <p>{children}</p>;

    return Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };
  }, [children]);

  const {onPress, isDisabled, ...restProps} = useMemo(() => {
    return getTriggerProps(mergeProps(otherProps, child.props), child.ref);
  }, [getTriggerProps, child.props, otherProps, child.ref]);

  const [, triggerChildren] = pickChildren(children, Button);

  const {buttonProps} = useAriaButton({onPress, isDisabled}, triggerRef);

  const hasNextUIButton = useMemo<boolean>(() => {
    return triggerChildren?.[0] !== undefined;
  }, [triggerChildren]);

  return cloneElement(
    child,
    mergeProps(restProps, hasNextUIButton ? {onPress, isDisabled} : buttonProps),
  );
});

PopoverTrigger.displayName = "TwMaterial.PopoverTrigger";

export default PopoverTrigger;
