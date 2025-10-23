import { DarkTheme } from "@tools/themes/dark";
import { DefaultTheme } from "@tools/themes/light";

export const SystemThemes = {
  light: DefaultTheme,
  dark: DarkTheme,
};

export type SystemThemesOptions = keyof typeof SystemThemes;
