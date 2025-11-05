import * as i18n from "@solid-primitives/i18n";
import type { LangDictionaryTemplate } from "@tools/i18n/i18.lang";
import { useI18nContext } from "@tools/i18n/i18n.context";

export default function getLoginPageTranslator() {
  const [, { generateDict }] = useI18nContext();

  const dict = generateDict(LangDict);

  const t = i18n.translator(dict);

  return t;
}

type LoginPageDict = {
  title: string;

  email: string;
  emailExample: string;
};

const PortugueseDict: LoginPageDict = {
  title: "Login",
  email: "E-mail",
  emailExample: "exemplo@gmail.com",
};
const EnglishDict: LoginPageDict = {
  title: "Login",
  email: "Email",
  emailExample: "example@gmail.com",
};
const EspanholDict: LoginPageDict = {
  title: "Login",
  email: "Correo electrónico",
  emailExample: "ejemplo@gmail.com",
};
const JaponiseDict: LoginPageDict = {
  title: "ログイン", // "Roguin"
  email: "電子メール", // "Denshi mēru"
  emailExample: "example@gmail.com", // "example@gmail.com"
};

const LangDict: LangDictionaryTemplate<LoginPageDict> = {
  "pt-br": PortugueseDict,
  en: EnglishDict,
  es: EspanholDict,
  jp: JaponiseDict,
};
