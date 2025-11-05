import EyeHided from "@components/icons/EyeHided";
import EyeShow from "@components/icons/EyeShow";
import { styled } from "solid-styled-components";

export const InputPasswordWrapper = styled("div")`
  display: flex;
`;

export const EncriptedIcon = styled(EyeShow)`
  fill: #fff;
  width: 2rem;
`;
export const CleanedIcon = styled(EyeHided)`
  fill: #fff;
  width: 2rem;
`;
