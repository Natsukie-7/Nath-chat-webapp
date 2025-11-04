import { ThemesContextProvider } from "@tools/themes/themes.context";
import { type Component } from "solid-js";
import { Content, Title, Wrapper } from "./Login.styled";

interface LoginProps {}

const Login: Component<LoginProps> = (props) => {
  return (
    <ThemesContextProvider>
      <Wrapper>
        <Content>
          <Title>Login</Title>

          <input />
          <input />
          <button>Acessar</button>
        </Content>
      </Wrapper>
    </ThemesContextProvider>
  );
};

export default Login;
