import Button from "@components/button";
import { styled } from "solid-styled-components";

export const Wrapper = styled("div")`
  width: 100%;
  height: 100%;
  align-content: center;
  justify-items: center;

  padding: 3rem;
`;

export const Content = styled("section")``;

export const Title = styled("h1")`
  font-size: 2.5rem;
`;

export const SubmitButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
  width: 6rem;
  height: 2.5rem;
`;
