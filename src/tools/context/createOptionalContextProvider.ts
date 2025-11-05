import {
  createComponent,
  createContext,
  createMemo,
  splitProps,
  useContext,
  type Component,
  type JSX,
} from "solid-js";

/**
 * Cria um Provider e hook opcional.
 * Se o Provider não existir, o hook cria um novo valor usando o callback.
 */
export default function createOptionalContextProvider<
  ContextValue,
  Props = unknown
>(
  callback: (props: Props) => ContextValue
): [
  Component<{ children: JSX.Element } & Props>,
  (props?: Props) => ContextValue
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

  const useContextValue = (props?: Props) => {
    const context = useContext(Context);

    if (context) {
      return context;
    }

    const anonimosState = createMemo(() => callback(props as Props));

    return anonimosState();
  };

  return [Provider, useContextValue];
}
