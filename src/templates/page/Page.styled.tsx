import { createGlobalStyles, styled } from "@tools/themes/themes.tools";

export const Wrapper = styled("div")`
  color: red;
`;

export const PageGlobalStyle = createGlobalStyles`
  --page-color: ${(props: any) => props.theme.colors.test || "#000"}
`;
