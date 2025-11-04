interface User {
  name: string;
}

interface SystemThemeTemplate {
  pageColor: string;
  textColor: string;

  menuColor: string;
  menuHoverColor: string;
  menuBorderColor: string;

  actionButtonBackgroundColor: string;
  actionButtonTextColor: string;
}

type SystemKeysThemes = keyof SystemThemeTemplate;

type EventHandler<Target, Event extends event> = Event & {
  currentTarget: Target;
  target: DOMElement;
};
