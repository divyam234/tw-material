import {CloseFilledIcon} from "@nextui-org/shared-icons";
import {forwardRef} from "@tw-material/system";
import {useMemo} from "react";

import {UseChipProps, useChip} from "./use-chip";

export interface ChipProps extends Omit<UseChipProps, "isOneChar" | "isCloseButtonFocusVisible"> {}

const Chip = forwardRef<"div", ChipProps>((props, ref) => {
  const {
    Component,
    children,
    slots,
    classNames,
    isCloseable,
    startContent,
    endContent,
    getCloseButtonProps,
    getChipProps,
  } = useChip({
    ...props,
    ref,
  });

  const end = useMemo(() => {
    if (isCloseable) {
      return <span {...getCloseButtonProps()}>{endContent || <CloseFilledIcon />}</span>;
    }

    return endContent;
  }, [endContent, isCloseable, getCloseButtonProps]);

  return (
    <Component {...getChipProps()}>
      {startContent}
      <span className={slots.content({class: classNames?.content})}>{children}</span>
      {end}
    </Component>
  );
});

Chip.displayName = "TwMaterial.Chip";

export default Chip;
