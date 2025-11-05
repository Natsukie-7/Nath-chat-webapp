import { createEffectOn } from "@tools/createEffectOn";
import {
  createComponent,
  createUniqueId,
  Match,
  mergeProps,
  onMount,
  Show,
  splitProps,
  Switch,
  untrack,
  type Component,
  type ComponentProps,
  type JSX,
} from "solid-js";
import { InputWrapper, Label, StyledInput } from "./DefaultInput.styled";

export type InputChangeEvent = (
  value: string,
  event: InputEvent & { currentTarget: HTMLInputElement }
) => void | Promise<void>;

export interface DefaultInputProps extends ComponentProps<"input"> {
  handleChange?: InputChangeEvent;
  label?: string;
  initialValue?: string;
  standalone?: boolean;
}

const DefaultInput: Component<DefaultInputProps> = (props) => {
  const defaultProps: DefaultInputProps = {
    id: `input-identifier-${createUniqueId()}`,
    handleChange: () => {},
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

    if (inputProps.value) {
      createEffectOn(
        () => inputProps.value,
        () => {
          ref.dispatchEvent(fakeEvent);
        }
      );
    }

    onMount(() => {
      if (!local.initialValue) {
        return;
      }

      ref.value = local.initialValue;
      ref.dispatchEvent(fakeEvent);
    });
  };

  const InputElement = () =>
    createComponent(
      StyledInput,
      mergeProps(
        {
          onInput,
          ref: inputMounted,
        } as any,
        inputProps
      )
    );

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
