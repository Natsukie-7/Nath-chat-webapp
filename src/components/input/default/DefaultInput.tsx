import { createEffectOn } from "@tools/createEffectOn";
import {
  createUniqueId,
  mergeProps,
  onMount,
  Show,
  splitProps,
  untrack,
  type Accessor,
  type Component,
  type ComponentProps,
  type JSX,
} from "solid-js";
import { Label, StyledInput } from "./DefaultInput.styled";

export type InputChangeEvent = (
  value: string,
  event: InputEvent & { currentTarget: HTMLInputElement }
) => void | Promise<void>;

export interface DefaultInputProps
  extends Omit<ComponentProps<"input">, "value"> {
  handleChange?: InputChangeEvent;
  label?: string;
  value?: Accessor<string>;
  initialValue?: string;
}

const DefaultInput: Component<DefaultInputProps> = (props) => {
  const defaultProps: DefaultInputProps = {
    id: `input-identifier-${createUniqueId()}`,
    handleChange: () => {},
    value: () => "",
  };

  const merged = mergeProps(defaultProps, props, {
    get initialValue() {
      return untrack(() => props.initialValue || "");
    },
  });
  const [local, inputProps] = splitProps(merged, [
    "handleChange",
    "label",
    "initialValue",
  ]);

  const onInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = async (
    event
  ) => {
    if (typeof inputProps.onInput === "function") {
      inputProps.onInput(event);
    }

    await local.handleChange?.(event.currentTarget.value, event);
  };

  const inputMounted = (ref: HTMLInputElement) => {
    if (typeof inputProps.ref == "function") {
      inputProps.ref(ref);
    }

    createEffectOn(inputProps.value as Accessor<string>, () => {
      ref.dispatchEvent(fakeEvent);
    });

    onMount(() => {
      if (!local.initialValue) {
        return;
      }

      ref.value = local.initialValue;
      ref.dispatchEvent(fakeEvent);
    });
  };

  return (
    <>
      <Show when={local.label}>
        <Label for={inputProps.id}>{local.label}</Label>
      </Show>

      <StyledInput
        {...inputProps}
        value={inputProps.value?.()}
        onInput={onInput}
        ref={inputMounted}
      />
    </>
  );
};

export default DefaultInput;

const fakeEvent = new InputEvent("input", { bubbles: true });
