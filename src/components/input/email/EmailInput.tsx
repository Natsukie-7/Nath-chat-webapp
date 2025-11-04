import type { Component, JSX } from "solid-js";
import type { DefaultInputProps } from "../default/DefaultInput";
import DefaultInput from "../default/DefaultInput";

interface EmailInputProps extends DefaultInputProps {}

const EmailInput: Component<EmailInputProps> = (props) => {
  const onInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (
    event
  ) => {
    event.currentTarget.value = event.currentTarget.value.replace(/\s+/g, "");

    if (typeof props.onInput == "function") {
      props.onInput(event);
    }
  };

  return <DefaultInput {...props} onInput={onInput} />;
};

export default EmailInput;
