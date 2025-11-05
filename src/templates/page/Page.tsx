import { useNavigate } from "@solidjs/router";
import { I18nContextProvider } from "@tools/i18n/i18n.context";
import { ThemesContextProvider } from "@tools/themes/themes.context";
import { createResource, type ParentComponent } from "solid-js";
import { PageContextProvider } from "./Page.context";
import { PageStyle } from "./Page.styled";
import { fetchUser } from "./page.tools";

const Page: ParentComponent = (props) => {
  const [user] = createResource(fetchUser);

  const navigate = useNavigate();

  return (
    <ThemesContextProvider>
      <I18nContextProvider>
        <PageContextProvider>
          <PageStyle />

          {props.children}
        </PageContextProvider>
      </I18nContextProvider>
    </ThemesContextProvider>
  );
};

export default Page;
