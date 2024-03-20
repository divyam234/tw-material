import type { AriaDialogProps } from '@react-aria/dialog'
import type { HTMLMotionProps } from 'framer-motion'

import { DOMAttributes, ReactNode, useMemo, useRef } from 'react'
import { DismissButton } from '@react-aria/overlays'
import { TRANSITION_VARIANTS } from '@nextui-org/framer-transitions'
import { motion } from 'framer-motion'
import { useDialog } from '@react-aria/dialog'
import { mergeProps } from '@react-aria/utils'
import { RemoveScroll } from 'react-remove-scroll'

import { usePopoverContext } from './popover-context'
import { HTMLNextUIProps as HTMLProps, forwardRef } from '@nextui-org/system'

export interface PopoverContentProps
  extends AriaDialogProps,
    Omit<HTMLProps, 'children' | 'role'> {
  children: ReactNode | ((titleProps: DOMAttributes<HTMLElement>) => ReactNode)
}

const FloatingPopoverContent = forwardRef<'div', PopoverContentProps>(
  (props, _) => {
    const { as, children, className, ...otherProps } = props

    const {
      Component: OverlayComponent,
      isOpen,
      backdrop,
      disableAnimation,
      shouldBlockScroll,
      getPopoverProps,
      getDialogProps,
      getBackdropProps,
      getContentProps,
      onClose,
    } = usePopoverContext()

    const Component = as || OverlayComponent || 'div'

    const dialogRef = useRef(null)
    const { dialogProps, titleProps } = useDialog({}, dialogRef)

    // Not needed in the popover context, the popover role comes from getPopoverProps
    delete dialogProps.role

    const content = (
      <>
        <Component
          {...getDialogProps(mergeProps(dialogProps, otherProps))}
          ref={dialogRef}
        >
          <div {...getContentProps({ className })}>
            {typeof children === 'function' ? children(titleProps) : children}
          </div>
          <DismissButton onDismiss={onClose} />
        </Component>
      </>
    )

    const backdropContent = useMemo(() => {
      if (backdrop === 'transparent') {
        return null
      }

      if (disableAnimation) {
        return <div {...getBackdropProps()} />
      }

      return (
        <motion.div
          animate="enter"
          exit="exit"
          initial="exit"
          variants={TRANSITION_VARIANTS.fade}
          {...(getBackdropProps() as HTMLMotionProps<'div'>)}
        />
      )
    }, [backdrop, disableAnimation, getBackdropProps])

    return (
      <div {...getPopoverProps()}>
        {backdropContent}
        <RemoveScroll
          forwardProps
          enabled={shouldBlockScroll && isOpen}
          removeScrollBar={false}
        >
          {disableAnimation ? (
            content
          ) : (
            <motion.div
              animate="enter"
              exit="exit"
              initial="initial"
              variants={TRANSITION_VARIANTS.scaleSpringOpacity}
            >
              {content}
            </motion.div>
          )}
        </RemoveScroll>
      </div>
    )
  },
)

FloatingPopoverContent.displayName = 'FloatingPopoverContent'

export default FloatingPopoverContent
