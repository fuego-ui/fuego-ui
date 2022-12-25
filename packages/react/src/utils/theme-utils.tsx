export const themeOrDefault = (
  fieldThemeOverride: any,
  fieldThemeDefault: any
) => {
  return fieldThemeOverride || fieldThemeDefault;
};

export interface ThemeConfig {
  base: string;
  colorPrimary: string;
  colorSecondary: string;
  background: string;
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  shape: {
    roundness: number;
  };
}
