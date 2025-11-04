import Input from "@components/input";
import { type Component } from "solid-js";
import { Content, SubmitButton, Title, Wrapper } from "./Login.styled";

interface LoginProps {}

const Login: Component<LoginProps> = (props) => {
  return (
    <Wrapper>
      <Content>
        <Title>Login</Title>

        <Input.Email label="E-mail" placeholder="exemplo@gmail.com" />
        <Input label="Senha" placeholder="*******" />

        <SubmitButton variant="form-action">Acessar</SubmitButton>
      </Content>
    </Wrapper>
  );
};

export default Login;
