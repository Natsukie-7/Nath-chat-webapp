import { useNavigate } from "@solidjs/router";
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
      <PageContextProvider>
        <PageStyle />

        {props.children}
      </PageContextProvider>
    </ThemesContextProvider>
  );
};

export default Page;
