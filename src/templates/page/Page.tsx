import { type Component } from "solid-js";
import { PageContextProvider, usePageContext } from "./Page.context";

interface PageProps {}

const Page: Component<PageProps> = (props) => {
  return (
    <PageContextProvider>
      <Other />
    </PageContextProvider>
  );
};

const Other = () => {
  const [state, { set }] = usePageContext();

  return (
    <>
      {state.name}

      <button
        onClick={() => {
          set("name", (prev) => prev + 1);
        }}
      >
        Click
      </button>
    </>
  );
};

export default Page;
