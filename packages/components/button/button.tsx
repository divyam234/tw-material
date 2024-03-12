import { Ripple } from '@nextui-org/ripple'
import { forwardRef } from '@nextui-org/system'
import { UseButtonProps, useButton } from './use-button'

export interface ButtonProps extends UseButtonProps {}

const Button = forwardRef<'button', ButtonProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    startIcon,
    endIcon,
    disableRipple,
    getButtonProps,
    getRippleProps,
    getStartButtonProps,
    getEndButtonProps,
  } = useButton({ ...props, ref })
  return (
    <Component ref={domRef} {...getButtonProps()}>
      {startIcon && <span {...getStartButtonProps()}>{startIcon}</span>}
      {children}
      {endIcon && <span {...getEndButtonProps()}>{endIcon}</span>}
      {!disableRipple && <Ripple {...getRippleProps()} />}
    </Component>
  )
})

Button.displayName = 'Button'

export default Button
