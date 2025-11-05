import Input from "@components/input";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { type Component } from "solid-js";
import {
  Content,
  Footer,
  Title as PageTitle,
  SubmitButton,
  Wrapper,
} from "./Login.styled";
import getLoginPageTranslator from "./login.lang";

interface LoginProps {}

const Login: Component<LoginProps> = (props) => {
  const t = getLoginPageTranslator();

  return (
    <Wrapper>
      <Title>Login</Title>

      <Content>
        <PageTitle>{t("title")}</PageTitle>

        <Input.Email label={t("email")} placeholder="exemplo@gmail.com" />
        <Input.Password label="Senha" placeholder="*******" />

        <Footer>
          <A href="/register">Realizar registro</A>
          <SubmitButton variant="form-action">Acessar</SubmitButton>
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default Login;
