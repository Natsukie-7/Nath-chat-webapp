import createOptionalContextProvider from "@tools/context/createOptionalContextProvider";
import { createMemo, mergeProps, type ComponentProps } from "solid-js";
import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web";
import { CleanedIcon, EncriptedIcon } from "./Password.styled";
interface PasswordContextState {
  togglerEnabled: boolean;
  encriptaded: boolean;
}
const DefaultPasswordState = {
  togglerEnabled: false,
  encriptaded: true,
};

export const PasswordContextFactory = () => {
  const [state, set] = createStore<PasswordContextState>(DefaultPasswordState);

  const Api = { set };

  const config = {
    inputType: createMemo(() =>
      state.encriptaded ? ("password" as const) : ("text" as const)
    ),
    CurrentSwitchIcon: (props: ComponentProps<"svg">) =>
      Dynamic(
        mergeProps(
          {
            get component() {
              return state.encriptaded ? EncriptedIcon : CleanedIcon;
            },
          },
          props
        )
      ),
  };

  return [state, Api, config] as const;
};

export const [PasswordContextProvider, usePasswordContext] =
  createOptionalContextProvider(PasswordContextFactory);
