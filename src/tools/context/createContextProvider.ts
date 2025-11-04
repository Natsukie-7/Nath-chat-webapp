import {
  createComponent,
  createContext,
  createMemo,
  splitProps,
  useContext,
  type Accessor,
  type Component,
  type JSX,
  type ParentComponent,
} from "solid-js";

export default function createContextProvider<ContextValue, Props = unknown>(
  callback: (props: Props) => ContextValue
): [
  ParentComponent<{ children: JSX.Element } & Props>,
  Accessor<ContextValue>
] {
  const Context = createContext<ContextValue>();

  const Provider: Component<{ children: JSX.Element } & Props> = (rawProps) => {
    const [local, props] = splitProps(rawProps, ["children"]);
    const contextValue = createMemo(() => callback(props as Props));

    return createComponent(Context.Provider, {
      get value() {
        return contextValue();
      },
      get children() {
        return local.children;
      },
    });
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
