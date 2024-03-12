import { defineConfig, presetAttributify, presetIcons, presetUno,presetWind} from 'unocss'
import presetTheme from 'unocss-preset-theme'

import type { Theme } from 'unocss/preset-uno'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetAttributify(),
    presetIcons(),
    presetWind(),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: {
            'primary': '#1668dc',
            'primary-border': '#1668dc',
            'border': '#424242',
            'container': '#141414',
            'text': 'rgba(255, 255, 255, 0.85)',
          },
        },
        compact: {
          spacing: {
            xss: '2px',
            xs: '4px',
            sm: '6px',
            base: '8px',
            lg: '12px',
            xl: '16px',
          },
        },
      },
    }),
  ],
})