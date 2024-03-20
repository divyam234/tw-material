import {createContext} from "@nextui-org/react-utils";

import {UseFloatingPopoverReturn} from "./use-popover";

export const [PopoverProvider, usePopoverContext] = createContext<UseFloatingPopoverReturn>({
  name: "PopoverContext",
  errorMessage:
    "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`",
});
