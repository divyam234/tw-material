import { hexFromArgb, TonalPalette } from '@material/material-color-utilities'
import { Theme } from './createTheme'
import { kebab } from './kebabCase'

const schemeColors = (scheme: Record<string, number>) => {
  const result: Record<string, string> = {}

  for (const key in scheme) {
    result[`${kebab(key)}`] = hexFromArgb(scheme[key])
  }

  return result
}

const tones = [0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100]

const paletteColors = (palette: Record<string, TonalPalette>) => {
  const result: Record<string, string> = {}

  for (const key in palette) {
    tones.forEach((tone) => {
      result[`${key}-${tone}`] = hexFromArgb(palette[key].tone(tone))
    })
  }

  return result
}

export const colors = (m3Theme: Theme) => {
  const tones=paletteColors(m3Theme.palettes)
  return {
    light: {
      ...schemeColors(m3Theme.schemes.light),
      ...tones
    },
    dark: {
      ...schemeColors(m3Theme.schemes.dark),
      ...tones
    },
  }
}
