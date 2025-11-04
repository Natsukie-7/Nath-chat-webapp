import { styled } from "solid-styled-components";

export const StyledButton = styled("button")`
  cursor: pointer;
  color: var(--text-color);

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }

  &.button--loading {
    cursor: progress;
  }

  &.button--custom {
    background-color: inherit;
    border: inherit;
  }

  &.button--form-action {
    background-color: var(--action-button-background-color);
    color: var(--action-button-text-color);

    transition: filter 0.25s cubic-bezier(0, 0, 0.2, 1);

    &:hover {
      filter: brightness(75%);
    }
  }
`;
