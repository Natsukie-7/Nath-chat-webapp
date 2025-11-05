import { createEffectOn } from "@tools/createEffectOn";
import {
  createUniqueId,
  Match,
  mergeProps,
  onMount,
  Show,
  splitProps,
  Switch,
  untrack,
  type Accessor,
  type Component,
  type ComponentProps,
  type JSX,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { InputWrapper, Label, StyledInput } from "./DefaultInput.styled";

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
  standalone?: boolean;
}

const DefaultInput: Component<DefaultInputProps> = (props) => {
  const defaultProps: DefaultInputProps = {
    id: `input-identifier-${createUniqueId()}`,
    handleChange: () => {},
    value: () => "",
    standalone: false,
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
    "children",
    "standalone",
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

  const InputElement = () =>
    Dynamic({
      ...inputProps,
      component: StyledInput,
      onInput,
      ref: inputMounted,
      get value() {
        switch (typeof inputProps.value) {
          case "function": {
            return inputProps.value();
            break;
          }

          case "string": {
            return inputProps.value;
            break;
          }

          default: {
            return undefined;
          }
        }
      },
    });

  return (
    <Switch>
      <Match when={!local.standalone}>
        <InputWrapper>
          <Show when={local.label}>
            <Label for={inputProps.id}>{local.label}</Label>
          </Show>

          <InputElement />
        </InputWrapper>
      </Match>

      <Match when={local.standalone}>
        <InputElement />
      </Match>
    </Switch>
  );
};

export default DefaultInput;

const fakeEvent = new InputEvent("input", { bubbles: true });
