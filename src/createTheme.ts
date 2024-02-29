import {
  CorePalette,
  TonalPalette,
  argbFromHex,
  themeFromSourceColor,
} from '@material/material-color-utilities'
import { Options } from '.'

export interface Theme {
  schemes: {
    light: Record<string, number>
    dark: Record<string, number>
  }
  palettes: Record<string, TonalPalette>
}

export function createTheme({ sourceColor, customColors }: Options): Theme {
  const theme = themeFromSourceColor(
    argbFromHex(sourceColor),
    customColors.map((c) => ({
      value: argbFromHex(c.value),
      name: c.name,
      blend: c.blend,
    })),
  )
  
  const schemeLight: Record<string, number> = theme.schemes.light.toJSON()
  const schemeDark: Record<string, number> = theme.schemes.dark.toJSON()

  const palettes: Record<string, TonalPalette> = theme.palettes

  theme.customColors.forEach((c) => {
    schemeLight[c.color.name] = c.light.color
    schemeLight[`on-${c.color.name}`] = c.light.onColor
    schemeLight[`${c.color.name}-container`] = c.light.colorContainer
    schemeLight[`on-${c.color.name}-container`] = c.light.onColorContainer

    schemeDark[c.color.name] = c.dark.color
    schemeDark[`on-${c.color.name}`] = c.dark.onColor
    schemeDark[`${c.color.name}-container`] = c.dark.colorContainer
    schemeDark[`on-${c.color.name}-container`] = c.dark.onColorContainer

    palettes[c.color.name] = CorePalette.of(c.value).a1
  })

  return {
    schemes: {
      light: schemeLight,
      dark: schemeDark,
    },
    palettes,
  }
}
