import classNames from "@tools/classNames";
import {
  type Accessor,
  type Component,
  type ComponentProps,
  createSignal,
  type JSX,
  mergeProps,
  splitProps,
} from "solid-js";
import { StyledButton } from "./Button.styled";

export type ButtonVariant = "custom" | "form-action";

export type HandleClickEvent = (
  utils: { finish: () => void; loading: () => void },
  event: MouseEvent,
  settings: { isLoading: Accessor<boolean> }
) => void | Promise<void>;

interface ButtonProps extends ComponentProps<"button"> {
  handleClick?: HandleClickEvent;
  variant?: ButtonVariant;
}

const defaultProps: Partial<ButtonProps> = {
  handleClick: () => {},
  variant: "custom",
};

const Button: Component<ButtonProps> = (rawProps) => {
  const [localProps, buttonProps] = splitProps(
    mergeProps(defaultProps, rawProps),
    ["handleClick", "variant", "children"]
  );

  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const loading = () => setIsLoading(true);
  const finish = () => setIsLoading(false);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async (
    event
  ) => {
    if (typeof localProps.handleClick != "function") {
      return;
    }

    if (isLoading()) {
      return;
    }

    await localProps.handleClick({ loading, finish }, event, { isLoading });
  };

  return (
    <StyledButton
      {...buttonProps}
      class={classNames(buttonProps.class, `button--${localProps.variant}`)}
      classList={{
        ...buttonProps.classList,
        "button--loading": isLoading(),
      }}
      onClick={handleClick}
      disabled={buttonProps.disabled || isLoading()}
    >
      {localProps.children}
    </StyledButton>
  );
};

export default Button;
