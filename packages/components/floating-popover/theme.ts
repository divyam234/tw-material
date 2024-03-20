import type { VariantProps } from 'tailwind-variants'
import { dataFocusVisibleClasses, tv } from '../utils'


const popover = tv({
  slots: {
    base: [
      'z-0',
      'relative',
      'bg-transparent',
      // ...dataFocusVisibleClasses,
    ],
    content: [
      'z-10',
      'px-2.5',
      'py-1',
      'w-full',
      'inline-flex',
      'flex-col',
      'items-center',
      'justify-center',
      'box-border',
      'subpixel-antialiased',
      'outline-none',
      'box-border',
      'bg-surface-container-low',
      'text-on-secondary-container',
    ],
    trigger: ['z-10'],
    backdrop: ['hidden'],
    arrow: [],
  },
  variants: {
    size: {
      sm: { content: 'text-tiny' },
      md: { content: 'text-small' },
      lg: { content: 'text-medium' },
    },
    radius: {
      none: { content: 'rounded-none' },
      sm: { content: 'rounded-small' },
      md: { content: 'rounded-medium' },
      lg: { content: 'rounded-large' },
      full: { content: 'rounded-full' },
    },
    shadow: {
      sm: {
        content: 'shadow-small',
      },
      md: {
        content: 'shadow-medium',
      },
      lg: {
        content: 'shadow-large',
      },
    },
    backdrop: {
      transparent: {},
      opaque: {
        backdrop: 'bg-black/50 backdrop-opacity-disabled',
      },
      blur: {
        backdrop: 'backdrop-blur-sm backdrop-saturate-150 bg-black/30',
      },
    },
    disableAnimation: {
      true: {
        base: 'animate-none',
      },
    },
  },
  defaultVariants: {
    radius: 'lg',
    size: 'md',
    shadow: 'md',
    backdrop: 'transparent',
    disableAnimation: false,
    triggerScaleOnOpen: true,
  },
  compoundVariants: [
    // backdrop (opaque/blur)
    {
      backdrop: ['opaque', 'blur'],
      class: {
        backdrop: 'block w-full h-full fixed inset-0 -z-30',
      },
    },
  ],
})

export type PopoverVariantProps = VariantProps<typeof popover>
export type PopoverSlots = keyof ReturnType<typeof popover>

export { popover }
