import createContextProvider from "@tools/createContextProvider";

interface PageProps {
  user: User;
}

const factory = (props: PageProps) => {
  return [props.user] as const;
};

export const [PageContextProvider, usePageContext] =
  createContextProvider(factory);
