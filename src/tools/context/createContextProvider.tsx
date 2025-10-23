import {
  createContext,
  createMemo,
  splitProps,
  useContext,
  type Component,
  type JSX,
} from "solid-js";

export default function createContextProvider<ContextValue, Props = unknown>(
  callback: (props: Props) => ContextValue
): [Component<{ children: JSX.Element } & Props>, () => ContextValue] {
  const Context = createContext<ContextValue>();

  const Provider: Component<{ children: JSX.Element } & Props> = (rawProps) => {
    const [local, props] = splitProps(rawProps, ["children"]);

    const contextValue = createMemo(() => callback(props as Props));

    return (
      <Context.Provider value={contextValue()}>
        {local.children}
      </Context.Provider>
    );
  };

  const useContextValue = () => {
    const context = useContext(Context);

    if (!context) {
      throw new Error("useContextValue must be used within its Provider");
    }

    return context;
  };

  return [Provider, useContextValue];
}
