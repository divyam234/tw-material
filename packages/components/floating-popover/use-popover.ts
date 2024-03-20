import { useFocusRing } from '@react-aria/focus'
import {
  HTMLNextUIProps as HTMLProps,
  mapPropsVariants,
  PropGetter,
} from '@nextui-org/system'
import { mergeRefs, ReactRef, useDOMRef } from '@nextui-org/react-utils'
import { dataAttr } from '@nextui-org/shared-utils'
import { PopoverSlots, PopoverVariantProps, popover } from './theme'
import { mergeProps } from '@react-aria/utils'
import { useMemo, useCallback, useState, useRef, RefObject, Ref } from 'react'
import { clsx } from '@nextui-org/shared-utils'
import { SlotsToClasses } from '../utils/types'
import {
  autoUpdate,
  flip,
  Middleware,
  offset,
  OffsetOptions,
  Placement,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import { useSafeLayoutEffect } from '@nextui-org/use-safe-layout-effect'
import { OverlayTriggerProps } from '@react-stately/overlays'
import { AriaOverlayProps, useOverlay } from '@react-aria/overlays'

export interface Props extends HTMLProps<'div'> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>

  keepMounted?: boolean

  middleware?: Middleware[]

  offset?: OffsetOptions

  /**
   * The ref for the element which the overlay positions itself with respect to.
   */
  triggerRef?: RefObject<HTMLElement>

  /**
   * The container element in which the overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element

  /**
   * Whether the scroll event should be blocked when the overlay is open.
   * @default true
   */
  shouldBlockScroll?: boolean

   /**
   * The placement of the element with respect to its anchor element.
   * @default 'top'
   */
   placement?: Placement;

  strategy?: 'absolute' | 'fixed'

  triggerReference?: 'triggerEl' | 'virtualEl'

  triggerPosition?: { left: number; top: number }

  classNames?: SlotsToClasses<PopoverSlots>
  /** Whether the overlay is open by default (controlled). */
  isOpen: boolean
  /** Handler that is called when the overlay's open state changes. */
  /**
   *  Callback fired when the popover is closed.
   */
  onClose: () => void
}

export type UseFloatingPopoverProps = Props &
  PopoverVariantProps &
  OverlayTriggerProps &
  AriaOverlayProps

export function useFloatingPopover(originalProps: UseFloatingPopoverProps) {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    popover.variantKeys,
  )

  const {
    as,
    children,
    ref,
    keepMounted = false,
    middleware,
    offset: offsetProp = 0,
    strategy = 'absolute',
    className,
    classNames,
    portalContainer = document.body,
    shouldBlockScroll,
    isOpen: isOpenProp,
    isDismissable = true,
    shouldCloseOnBlur,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    defaultOpen = false,
    onClose: onCloseProp,
    triggerRef: triggerRefProp,
    triggerReference="triggerEl",
    triggerPosition,
    placement="top",
    ...otherProps
  } = props

  const Component = as || 'div'

  const domRef = useDOMRef(ref)

  const domTriggerRef = useRef<HTMLElement>(null)

  const triggerRef = triggerRefProp || domTriggerRef

  const [open, setOpen] = useState(defaultOpen)

  const isOpen =  triggerReference ==="triggerEl" ?  open : isOpenProp

  const onClose = useMemo(()=>{
    return ()=>{
      if(triggerReference ==="triggerEl"){
        setOpen(false)
      }
      onCloseProp?.()
    }
  },[onCloseProp, setOpen,triggerReference])

  const { overlayProps: popoverProps, underlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur,
      isDismissable,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
    },
    domRef,
  )

  const { refs, elements, floatingStyles, update } = useFloating({
    open: isOpen,
    placement: triggerReference ==="triggerEl" ? placement : 'right-start',
    middleware: [offset(offsetProp ?? 0), flip(), shift()],
    strategy,
    elements: {
      floating: domRef.current,
      reference: triggerRef.current,
    },
    transform: false,
    whileElementsMounted: !keepMounted ? autoUpdate : undefined,
  })
  console.log(floatingStyles)

  useSafeLayoutEffect(() => {
    if (keepMounted && isOpen && elements.reference && elements.floating) {
      const cleanup = autoUpdate(elements.reference, elements.floating, update)
      return cleanup
    }
    return undefined
  }, [keepMounted, isOpen, elements, update])

  useSafeLayoutEffect(() => {
    if (triggerReference==="virtualEl") {
      const x = triggerPosition?.left ?? 0
      const y = triggerPosition?.top ?? 0
      refs.setReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x,
            y,
            top: y,
            left: x,
            right: x,
            bottom: y,
          }
        },
      })
    }
  }, [triggerReference,triggerPosition])

  const disableAnimation = originalProps.disableAnimation ?? false

  const { isFocusVisible, isFocused, focusProps } = useFocusRing()

  const slots = useMemo(
    () =>
      popover({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  )

  const baseStyles = clsx(classNames?.base, className)

  const getPopoverProps: PropGetter = (props = {}) => ({
    ref: domRef,
    ...mergeProps(popoverProps, otherProps, props),
    style: mergeProps(floatingStyles),
  })

  const getDialogProps: PropGetter = (props = {}) => ({
    'data-slot': 'base',
    'data-open': dataAttr(isOpen),
    'data-focus': dataAttr(isFocused),
    'data-focus-visible': dataAttr(isFocusVisible),
    ...mergeProps(focusProps, props),
    className: slots.base({ class: clsx(baseStyles) }),
    style: {
      outline: 'none',
    },
  })

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      'data-slot': 'content',
      'data-open': dataAttr(isOpen),
      className: slots.content({
        class: clsx(classNames?.content, props.className),
      }),
    }),
    [slots, isOpen, classNames],
  )

  const getBackdropProps = useCallback<PropGetter>(
    (props = {}) => ({
      'data-slot': 'backdrop',
      className: slots.backdrop({ class: classNames?.backdrop }),
      onClick: () => setOpen(false),
      ...underlayProps,
      ...props,
    }),
    [slots, isOpen, classNames, underlayProps],
  )

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => {
      return {
        'data-slot': 'trigger',
        'aria-haspopup': 'dialog',
        ...props,
        onPress:()=>setOpen(true),
        className: slots.trigger({
          class: clsx(classNames?.trigger, props.className),
        }),
        ref: mergeRefs(_ref, triggerRef),
      }
    },
    [triggerRef,isOpen],
  )

  return {
    Component,
    children,
    classNames,
    portalContainer,
    popoverRef: domRef,
    triggerRef,
    isOpen,
    onClose,
    disableAnimation,
    shouldBlockScroll,
    backdrop: originalProps.backdrop ?? 'transparent',
    getBackdropProps,
    getPopoverProps,
    getDialogProps,
    getContentProps,
    getTriggerProps
  }
}

export type UseFloatingPopoverReturn = ReturnType<typeof useFloatingPopover>
