import { MetaProvider } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { I18nContextProvider } from "@tools/i18n/i18n.context";
import { ThemesContextProvider } from "@tools/themes/themes.context";
import { createResource, type ParentComponent } from "solid-js";
import { PageContextProvider } from "./Page.context";
import { PageStyle } from "./Page.styled";
import { fetchUser } from "./page.tools";

interface PageProps {}

const Page: ParentComponent<PageProps> = (props) => {
  const [user] = createResource(fetchUser);

  const navigate = useNavigate();

  return (
    <MetaProvider>
      <ThemesContextProvider>
        <I18nContextProvider>
          <PageContextProvider>
            <PageStyle />

            {props.children}
          </PageContextProvider>
        </I18nContextProvider>
      </ThemesContextProvider>
    </MetaProvider>
  );
};

export default Page;
