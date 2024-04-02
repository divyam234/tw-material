type CustomColor = {
  value: string;
  name: string;
  blend: boolean;
};

export type Options = {
  sourceColor: string;
  customColors: CustomColor[];
  defaultTheme?: "light" | "dark";
};
