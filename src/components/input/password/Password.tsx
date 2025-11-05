import Button from "@components/button";
import type { ButtonClickEvent } from "@components/button/default/Button";
import { createUniqueId, mergeProps, Show, type Component } from "solid-js";
import type { DefaultInputProps } from "../default/DefaultInput";
import DefaultInput from "../default/DefaultInput";
import { InputWrapper, Label } from "../default/DefaultInput.styled";
import { usePasswordContext } from "./Password.context";
import { InputPasswordWrapper } from "./Password.styled";

interface PasswordProps extends DefaultInputProps {}

type LocalState = DefaultInputProps;

const Password: Component<PasswordProps> = (props) => {
  const defaultProps: LocalState = {
    id: `input-identifier-${createUniqueId()}`,
  };
  const [state, { set }, { inputType, CurrentSwitchIcon }] =
    usePasswordContext();
  const passwordProps = mergeProps(defaultProps, props);

  const handleEncriptChange: ButtonClickEvent = () => {
    set("encriptaded", (encriptaded) => !encriptaded);
  };

  return (
    <InputWrapper>
      <Show when={passwordProps.label}>
        <Label for={passwordProps.id}>{passwordProps.label}</Label>
      </Show>

      <InputPasswordWrapper>
        <DefaultInput standalone {...passwordProps} type={inputType()} />
        <Show when={state.togglerEnabled}>
          <Button handleClick={handleEncriptChange}>
            <CurrentSwitchIcon />
          </Button>
        </Show>
      </InputPasswordWrapper>
    </InputWrapper>
  );
};

export default Password;
