import Input from "@components/input";
import { PasswordContextProvider } from "@components/input/password/Password.context";
import { A } from "@solidjs/router";
import { type Component } from "solid-js";
import { Content, Footer, SubmitButton, Title, Wrapper } from "./Login.styled";
import getLoginPageTranslator from "./login.lang";

interface LoginProps {}

const Login: Component<LoginProps> = (props) => {
  const t = getLoginPageTranslator();

  return (
    <Wrapper>
      <Content>
        <Title>{t("title")}</Title>

        <Input.Email label={t("email")} placeholder="exemplo@gmail.com" />
        <PasswordContextProvider>
          <Input.Password label="Senha" placeholder="*******" />
          <Input.Password label="Confirmar senha" placeholder="*******" />
        </PasswordContextProvider>

        <Footer>
          <A href="/register">Realizar registro</A>
          <SubmitButton variant="form-action">Acessar</SubmitButton>
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default Login;
