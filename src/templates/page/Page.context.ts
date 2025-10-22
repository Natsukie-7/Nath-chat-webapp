import createContextProvider from "@tools/createContextProvider";
import { createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";

const factory = () => {
  const [state, set] = createStore({
    name: 0,
  });

  const Api = {
    set,
  };

  createEffect(
    on(
      () => state.name,
      (newName) => {
        console.log(newName);
      }
    )
  );

  return [state, Api] as const;
};

export const [PageContextProvider, usePageContext] =
  createContextProvider(factory);
