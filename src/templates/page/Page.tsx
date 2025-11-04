import { useNavigate } from "@solidjs/router";
import { createResource, type ParentComponent } from "solid-js";
import { PageContextProvider } from "./Page.context";
import { PageGlobalStyle } from "./Page.styled";
import { fetchUser } from "./page.tools";

const Page: ParentComponent = (props) => {
  const [user] = createResource(fetchUser);

  const navigate = useNavigate();

  /* createEffectOn(
    () => user(),
    (userData) => {
      if (userData) {
        return;
      }

      navigate("/login", { replace: true });
    },
    { defer: true }
  ); */

  return (
    <PageContextProvider>
      <PageGlobalStyle />
      {props.children}
    </PageContextProvider>
  );
};

export default Page;
