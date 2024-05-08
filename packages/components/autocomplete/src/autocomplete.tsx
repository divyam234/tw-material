import {forwardRef} from "@tw-material/system";
import {FreeSoloPopover} from "@tw-material/popover";
import {ScrollShadow} from "@tw-material/scroll-shadow";
import {ChevronDownIcon, CloseIcon} from "@nextui-org/shared-icons";
import {Listbox} from "@tw-material/listbox";
import {Button} from "@tw-material/button";
import {Input} from "@tw-material/input";
import {ForwardedRef, ReactElement, Ref} from "react";
import {AnimatePresence} from "framer-motion";

import {UseAutocompleteProps, useAutocomplete} from "./use-autocomplete";

interface Props<T> extends UseAutocompleteProps<T> {}

function Autocomplete<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLInputElement>) {
  const {
    Component,
    state,
    isOpen,
    disableAnimation,
    selectorIcon = <ChevronDownIcon />,
    clearIcon = <CloseIcon />,
    endContent,
    getBaseProps,
    getSelectorButtonProps,
    getInputProps,
    getListBoxProps,
    getPopoverProps,
    getClearButtonProps,
    getListBoxWrapperProps,
    getEndContentWrapperProps,
  } = useAutocomplete<T>({...props, ref});

  const popoverContent = isOpen ? (
    <FreeSoloPopover
      {...getPopoverProps()}
      // avoid popover closing issue in autocomplete with open modal
      shouldCloseOnInteractOutside={() => false}
      state={state}
    >
      <ScrollShadow {...getListBoxWrapperProps()}>
        <Listbox {...getListBoxProps()} />
      </ScrollShadow>
    </FreeSoloPopover>
  ) : null;

  return (
    <Component {...getBaseProps()}>
      <Input
        {...getInputProps()}
        endContent={
          <div {...getEndContentWrapperProps()}>
            {endContent || <Button {...getClearButtonProps()}>{clearIcon}</Button>}
            <Button {...getSelectorButtonProps()}>{selectorIcon}</Button>
          </div>
        }
      />
      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </Component>
  );
}

export type AutocompleteProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Autocomplete) as <T = object>(
  props: AutocompleteProps<T>,
) => ReactElement;

Autocomplete.displayName = "TwMaterial.Autocomplete";
