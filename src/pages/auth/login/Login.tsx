import Input from "@components/input";
import { A } from "@solidjs/router";
import { type Component } from "solid-js";
import { Content, Footer, SubmitButton, Title, Wrapper } from "./Login.styled";

interface LoginProps {}

const Login: Component<LoginProps> = (props) => {
  return (
    <Wrapper>
      <Content>
        <Title>Login</Title>

        <Input.Email label="E-mail" placeholder="exemplo@gmail.com" />
        <Input label="Senha" placeholder="*******" />

        <Footer>
          <A href="/register">Realizar registro</A>
          <SubmitButton variant="form-action">Acessar</SubmitButton>
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default Login;
