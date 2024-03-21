import {forwardRef, HTMLTwM3Props as HTMLProps} from "@tw-material/system";
import {useDOMRef} from "@tw-material/react-utils";
import {clsx} from "clsx";

import {useModalContext} from "./modal-context";

export interface ModalFooterProps extends HTMLProps<"footer"> {}

const ModalFooter = forwardRef<"footer", ModalFooterProps>((props, ref) => {
  const {as, children, className, ...otherProps} = props;

  const {slots, classNames} = useModalContext();

  const domRef = useDOMRef(ref);

  const Component = as || "footer";

  return (
    <Component
      ref={domRef}
      className={slots.footer({class: clsx(classNames?.footer, className)})}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

ModalFooter.displayName = "ModalFooter";

export default ModalFooter;
