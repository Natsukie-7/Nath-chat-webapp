import createContextProvider from "@tools/context/createContextProvider";
import { createEffectOn } from "@tools/createEffectOn";
import { SystemThemes, type SystemThemesOptions } from "@tools/themes";
import { createMemo, createSignal } from "solid-js";

const factory = () => {
  const [currentTheme, setCurrentTheme] = createSignal<SystemThemesOptions>(
    getInitialTheme()
  );

  const toggleTheme = (theme?: SystemThemesOptions) =>
    setCurrentTheme((prev) => {
      const keys = Object.keys(SystemThemes) as SystemThemesOptions[];

      const newTheme =
        theme && keys.includes(theme)
          ? theme
          : keys[(keys.indexOf(prev) + 1) % keys.length];

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }

      return newTheme;
    });

  const theme = createMemo(() => SystemThemes[currentTheme()]);

  createEffectOn(currentTheme, (newTheme) => {
    const root = document.documentElement;
    if (!root) return;

    Object.keys(SystemThemes).forEach((key) =>
      root.classList.remove(`theme-${key}`)
    );
    root.classList.add(`theme-${newTheme}`);

    let styleEl = document.getElementById(
      "theme-styles"
    ) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "theme-styles";
      document.head.appendChild(styleEl);
    }

    const sheet = styleEl.sheet!;
    while (sheet.cssRules.length > 0) {
      sheet.deleteRule(0);
    }

    const current = SystemThemes[newTheme];
    const vars = Object.entries(current)
      .map(([key, value]) => `${camelToCssVariable(key)}: ${value};`)
      .join("");

    sheet.insertRule(`:root { ${vars} }`, 0);
  });

  return [currentTheme, { toggleTheme }, theme] as const;
};

export const [ThemesContextProvider, useThemeContext] =
  createContextProvider(factory);

function camelToCssVariable(key: string) {
  return "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
}

const getInitialTheme = (): SystemThemesOptions => {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("theme") as SystemThemesOptions | null;
    if (stored && Object.keys(SystemThemes).includes(stored)) {
      return stored;
    }
  }

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};
