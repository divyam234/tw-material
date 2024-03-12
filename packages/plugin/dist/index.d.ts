import * as tailwindcss_types_config from 'tailwindcss/types/config';

interface CustomColor {
    value: string;
    name: string;
    blend: boolean;
}
type Options = {
    sourceColor: string;
    customColors: CustomColor[];
    defaultTheme?: 'light' | 'dark';
};
declare const material3: ({ sourceColor, customColors, defaultTheme, }: Options) => {
    handler: tailwindcss_types_config.PluginCreator;
    config?: Partial<tailwindcss_types_config.Config> | undefined;
};

export { type Options, material3 };
