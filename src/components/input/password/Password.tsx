import { createUniqueId, mergeProps, Show, type Component } from "solid-js";
import type { DefaultInputProps } from "../default/DefaultInput";
import DefaultInput from "../default/DefaultInput";
import { InputWrapper, Label } from "../default/DefaultInput.styled";

interface PasswordProps extends DefaultInputProps {}

const Password: Component<PasswordProps> = (props) => {
  const defaultProps: DefaultInputProps = {
    id: `input-identifier-${createUniqueId()}`,
  };

  const passwordProps = mergeProps(defaultProps, props);

  return (
    <InputWrapper>
      <Show when={passwordProps.label}>
        <Label for={passwordProps.id}>{passwordProps.label}</Label>
      </Show>

      <DefaultInput standalone {...passwordProps} />
    </InputWrapper>
  );
};

export default Password;
