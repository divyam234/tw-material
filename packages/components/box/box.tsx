import {
  type HTMLNextUIProps as HTMLProps,
  type PropGetter,
} from '@nextui-org/system'
import { useCallback } from 'react'
import { mergeProps } from '@react-aria/utils'
import { useDOMRef, filterDOMProps } from '@nextui-org/react-utils'

import { useHover, usePress, type PressProps } from '@react-aria/interactions'
import { ReactRef } from '@nextui-org/react-utils'
import { dataAttr } from '@nextui-org/shared-utils'

interface Props extends HTMLProps<'div'> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>
}

export type BoxProps = Props & PressProps

export function Box(props: BoxProps) {
  const { ref, as, children, onPress, className, ...otherProps } = props

  const Component = as || 'div'

  const shouldFilterDOMProps = typeof Component === 'string'

  const domRef = useDOMRef(ref)

  const { pressProps, isPressed } = usePress({
    onPress: onPress,
  })

  const { isHovered, hoverProps } = useHover({})

  const getBoxProps: PropGetter = useCallback(
    (props = {}) => ({
      'data-pressed': dataAttr(isPressed),
      'data-hover': dataAttr(isHovered),
      className,
      ...mergeProps(
        pressProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        filterDOMProps(props),
      ),
    }),
    [
      isPressed,
      shouldFilterDOMProps,
      isHovered,
      pressProps,
      hoverProps,
      otherProps,
    ],
  )

  return (
    <Component ref={domRef} {...getBoxProps()}>
      {children}
    </Component>
  )
}
