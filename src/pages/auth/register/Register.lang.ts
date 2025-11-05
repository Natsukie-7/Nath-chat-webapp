import * as i18n from "@solid-primitives/i18n";
import type { LangDictionaryTemplate } from "@tools/i18n/i18.lang";
import { useI18nContext } from "@tools/i18n/i18n.context";

export default function getRegsiterPageTranslator() {
  const [, { generateDict }] = useI18nContext();

  const dict = generateDict(LangDict);

  const t = i18n.translator(dict);

  return t;
}

type RegisterPageDict = {
  title: string;

  email: string;
  emailExample: string;
};

const PortugueseDict: RegisterPageDict = {
  title: "Cadastrar",
  email: "E-mail",
  emailExample: "exemplo@gmail.com",
};
const EnglishDict: RegisterPageDict = {
  title: "Register",
  email: "Email",
  emailExample: "example@gmail.com",
};
const EspanholDict: RegisterPageDict = {
  title: "Login",
  email: "Correo electrónico",
  emailExample: "ejemplo@gmail.com",
};
const JaponiseDict: RegisterPageDict = {
  title: "登録する", // "Tōroku suru"
  email: "電子メール", // "Denshi mēru"
  emailExample: "example@gmail.com", // "example@gmail.com"
};

const LangDict: LangDictionaryTemplate<RegisterPageDict> = {
  "pt-br": PortugueseDict,
  en: EnglishDict,
  es: EspanholDict,
  jp: JaponiseDict,
};
