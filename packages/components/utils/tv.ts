import { tv as tvBase, TV } from 'tailwind-variants'

const COMMON_UNITS = ['small', 'medium', 'large']

const opacityScaleKeys = [
  'disabled',
  'hover',
  'focus',
  'pressed',
  'dragged',
  '1',
  '2',
  '3',
  '4',
  '5',
]

export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? true,
    twMergeConfig: {
      ...config?.twMergeConfig,
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
        'bg-opacity': [{ 'bg-opacity': opacityScaleKeys }],
        'text-opacity': [{ 'text-opacity': opacityScaleKeys }],
        'border-radius': [
          {
            radius: [
              ...COMMON_UNITS,
              'full',
              'none',
              'extra-small',
              'extra-large',
            ],
          },
        ],
        shadow: [{ shadow: ['1', '2', '3', '4', '5'] }],
        'font-size': [
          {
            text: ['label', 'display', 'headline', 'body', 'title']
              .map((key) => COMMON_UNITS.map((unit) => `${key}-${unit}`))
              .flat(),
          },
        ],
      },
    },
  })
