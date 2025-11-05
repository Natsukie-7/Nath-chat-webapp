export const SystemLangValues = ["pt-br", "en", "es", "jp"] as const;

export type SystemLang = (typeof SystemLangValues)[number];

export type LangDictionaryTemplate<Dict> = Record<SystemLang, Dict>;
