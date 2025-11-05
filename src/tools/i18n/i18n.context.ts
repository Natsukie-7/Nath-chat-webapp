import * as i18n from "@solid-primitives/i18n";
import createContextProvider from "@tools/context/createContextProvider";
import { createMemo, createSignal } from "solid-js";
import {
  type LangDictionaryTemplate,
  type SystemLang,
  SystemLangValues,
} from "./i18.lang";

const factory = () => {
  const [lang, setLanguage] = createSignal<SystemLang>(getInitialLang());

  const generateDict = <Dict extends i18n.BaseDict>(
    dict: LangDictionaryTemplate<Dict>
  ) =>
    createMemo(() =>
      i18n.flatten(dict[lang()])
    ) as unknown as () => i18n.Flatten<Dict>;

  const setLang = (language: SystemLang) => {
    setLanguage(language);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("lang", language);
    }

    const root = document.documentElement;
    root.lang = language;
  };

  const Api = {
    setLang,
    generateDict,
  };

  return [lang, Api] as const;
};

export const [I18nContextProvider, useI18nContext] =
  createContextProvider(factory);

const getInitialLang = (): SystemLang => {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("lang") as SystemLang | null;
    if (stored && SystemLangValues.includes(stored)) {
      return stored;
    }
  }

  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.toLowerCase() as SystemLang;
    if (SystemLangValues.includes(browserLang)) {
      return browserLang;
    }

    const shortLang = browserLang.split("-")[0] as SystemLang;
    if (SystemLangValues.includes(shortLang)) {
      return shortLang;
    }
  }

  return "pt-br";
};
