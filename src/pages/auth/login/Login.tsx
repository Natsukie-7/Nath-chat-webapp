import { type Component } from "solid-js";
import { Content, SubmitButton, Title, Wrapper } from "./Login.styled";

interface LoginProps {}

const Login: Component<LoginProps> = (props) => {
  return (
    <Wrapper>
      <Content>
        <Title>Login</Title>

        <input />
        <input />
        <SubmitButton variant="form-action">Acessar</SubmitButton>
      </Content>
    </Wrapper>
  );
};

export default Login;
