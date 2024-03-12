import type { ThemeConfig } from 'tailwindcss/types/config'

export const borderRadius = {
  none: '0',
  'extra-small': '4px',
  small: '8px',
  medium: '12px',
  large: '16px',
  'extra-large': '28px',
  full: '9999px',
}

export const borderColor: ThemeConfig['borderColor'] = ({ theme }) => ({
  ...theme('colors'),
  DEFAULT: theme('colors.light.outline'),

  light: {
    ...theme('colors.light'),
    DEFAULT: theme('colors.light.outline'),
  },
  dark: {
    ...theme('colors.dark'),
    DEFAULT: theme('colors.dark.outline'),
  },
})
