import { useNavigate } from "@solidjs/router";
import { createEffectOn } from "@tools/createEffectOn";
import { createResource, Show, type ParentComponent } from "solid-js";
import { PageContextProvider } from "./Page.context";
import { fetchUser } from "./page.tools";

const Page: ParentComponent = (props) => {
  const [user] = createResource(fetchUser);

  const navigate = useNavigate();

  createEffectOn(
    () => user(),
    (userData) => {
      if (userData) {
        return;
      }

      navigate("/login", { replace: true });
    },
    { defer: true }
  );

  return (
    <Show when={user()} keyed>
      {(userData) => (
        <PageContextProvider user={userData}>
          {props.children}
        </PageContextProvider>
      )}
    </Show>
  );
};

export default Page;
