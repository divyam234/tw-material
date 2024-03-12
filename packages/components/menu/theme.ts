import type { VariantProps } from 'tailwind-variants'
import { dataFocusVisibleClasses, tv } from '../utils'

const menu = tv({
  slots: {
    base: 'w-full relative flex flex-col gap-1 p-1 bg-surface-container dark:bg-surface-container-low text-on-surface',
    list: 'w-full flex flex-col gap-0.5 outline-none',
    emptyContent: [
      'h-10',
      'px-2',
      'py-1.5',
      'w-full',
      'h-full',
      'text-on-background',
      'text-start',
    ],
  },
})

const menuItem = tv({
  slots: {
    base: [
      'flex',
      'group',
      'gap-2',
      'items-center',
      'justify-between',
      'relative',
      'px-2',
      'py-1.5',
      'w-full',
      'h-full',
      'box-border',
      'rounded-small',
      'subpixel-antialiased',
      'outline-none',
      'cursor-pointer',
      'tap-highlight-transparent',
      'data-[hover=true]:bg-on-surface/hover',
      'data-[hover=true]:text-on-surface',
      'data-[selectable=true]:focus:bg-default',
      'data-[selectable=true]:focus:text-default-foreground',
      ...dataFocusVisibleClasses,
      'data-[focus-visible=true]:dark:ring-offset-background-content1',
    ],
    wrapper: 'w-full flex flex-col items-start justify-center',
    title: 'flex-1 truncate',
    description: [
      'w-full',
      'text-sm',
      'text-outline',
      'group-hover:text-current',
    ],
    selectedIcon: ['text-inherit', 'w-3', 'h-3', 'flex-shrink-0'],
    shortcut: [
      'px-1',
      'py-0.5',
      'rounded',
      'font-sans',
      'text-outline',
      'text-tiny',
      'border-small',
      'border-default-300',
      'group-hover:border-current',
    ],
  },
  variants: {
    showDivider: {
      true: {
        base: [
          'mb-1.5',
          "after:content-['']",
          'after:absolute',
          'after:-bottom-1',
          'after:left-0',
          'after:right-0',
          'after:h-divider',
          'after:bg-divider',
        ],
      },
      false: {},
    },
    isDisabled: {
      true: {
        base: 'opacity-disabled pointer-events-none',
      },
    },
    disableAnimation: {
      true: {},
      false: {
        base: 'data-[hover=true]:transition-colors',
      },
    },
  },
  defaultVariants: {
    disableAnimation: false,
    showDivider: false,
  },
})

const menuSection = tv({
  slots: {
    base: 'relative mb-2',
    heading: 'pl-1 text-tiny text-outline',
    group: 'data-[has-title=true]:pt-1',
    divider: 'mt-2',
  },
})

export type MenuVariantProps = VariantProps<typeof menu>
export type MenuSlots = keyof ReturnType<typeof menu>
export type MenuSectionVariantProps = VariantProps<typeof menuSection>
export type MenuSectionSlots = keyof ReturnType<typeof menuSection>
export type MenuItemVariantProps = VariantProps<typeof menuItem>
export type MenuItemSlots = keyof ReturnType<typeof menuItem>

export { menu, menuItem, menuSection }
