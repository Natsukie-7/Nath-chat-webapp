import EyeHided from "@components/icons/EyeHided";
import EyeShow from "@components/icons/EyeShow";
import { styled } from "solid-styled-components";
import { StyledInput } from "../default/DefaultInput.styled";

export const InputPasswordWrapper = styled("div")`
  display: flex;

  ${() => StyledInput.class({})} {
    border-radius: 0.25rem 0 0 0.25rem;
  }

  ${() => EncriptedIcon.class({})}, ${() => CleanedIcon.class({})} {
    fill: #000;
    width: 2rem;
    background-color: #fff;
    height: 100%;
    border-radius: 0 0.25rem 0.25rem 0;
    border-left: 1px solid #000;
  }
`;

export const EncriptedIcon = styled(EyeShow)``;
export const CleanedIcon = styled(EyeHided)``;
