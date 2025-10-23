interface User {
  name: string;
}

interface SystemThemeTemplate {
  pageColor: string;
  textColor: string;

  menuColor: string;
  menuHoverColor: string;
  menuBorderColor: string;
}

type SystemKeysThemes = keyof SystemThemeTemplate;
