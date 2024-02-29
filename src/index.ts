import plugin from 'tailwindcss/plugin'
import { borderColor, borderRadius } from './border'
import { colors } from './color'
import { createTheme } from './createTheme'
import { opacity } from './opacity'
import { boxShadow, boxShadowColor } from './shadow'
import { transitionDuration, transitionTimingFunction } from './transition'
import { typography } from './typography'
import { zIndex } from './z-index'
import { resolveTwcConfig } from 'tw-colors'

interface CustomColor {
  value: string;
  name: string;
  blend: boolean;
}

export type Options = {
  sourceColor: string
  customColors: CustomColor[]
}

export const material3 = ({ sourceColor, customColors }: Options) => {

  const m3Theme = createTheme({ sourceColor, customColors })
  
  const resolved = resolveTwcConfig(colors(m3Theme), {
    produceCssVariable: (colorName) => `--m3-${colorName}`,
  })

  return plugin(
    ({ addUtilities, addVariant }) => {
      addUtilities(resolved.utilities)
      resolved.variants.forEach(({ name, definition }) =>
        addVariant(name, definition),
      )
    },
    {
      theme: {
        borderRadius: borderRadius,
        borderColor: borderColor,
        boxShadow: boxShadow,
        boxShadowColor: boxShadowColor,
        fontSize: typography,
        transitionDuration: transitionDuration,
        transitionTimingFunction: transitionTimingFunction,
        zIndex: zIndex,
        extend: {
          opacity: opacity,
          // @ts-ignore tailwind types are broken
          colors: resolved.colors,
        },
      },
    },
  )
}
