import { Children, ReactNode } from 'react'
import { Overlay } from '@react-aria/overlays'
import { AnimatePresence } from 'framer-motion'

import { UseFloatingPopoverProps, useFloatingPopover } from './use-popover'
import { PopoverProvider } from './popover-context'
import { forwardRef } from '@nextui-org/system'

export interface FloatingPopoverProps extends UseFloatingPopoverProps {
  /**
   * The content of the popover. It is usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children: ReactNode[] | ReactNode
}

const FloatingPopover = forwardRef<'div', FloatingPopoverProps>(
  (props, ref) => {
    const { children, ...otherProps } = props
    const context = useFloatingPopover({ ...otherProps, ref })
    const childs = Children.toArray(children)

    const overlay = (
      <Overlay portalContainer={context.portalContainer}>
        {childs.length == 1 ? childs[0] : childs[1]}
      </Overlay>
    )

    return (
      <PopoverProvider value={context}>
        {childs.length == 2 && childs[0]}
        {context.disableAnimation && context.isOpen ? (
          overlay
        ) : (
          <AnimatePresence>{context.isOpen ? overlay : null}</AnimatePresence>
        )}
      </PopoverProvider>
    )
  },
)

FloatingPopover.displayName = 'FloatingPopover'

export default FloatingPopover
