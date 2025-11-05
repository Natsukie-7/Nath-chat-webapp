import Input, { PasswordContextProvider } from "@components/input";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { type Component } from "solid-js";
import getRegisterPageTranslator from "./Register.lang";
import {
  Content,
  Footer,
  Title as PageTitle,
  SubmitButton,
  Wrapper,
} from "./Register.styled";

interface RegisterProps {}

const Register: Component<RegisterProps> = (props) => {
  const t = getRegisterPageTranslator();

  return (
    <Wrapper>
      <Title>Registro</Title>

      <Content>
        <PageTitle>{t("title")}</PageTitle>

        <Input label="Nome" />

        <Input.Email label={t("email")} placeholder="exemplo@gmail.com" />

        <PasswordContextProvider>
          <Input.Password label="Senha" placeholder="*******" />
          <Input.Password label="Confirmar senha" placeholder="*******" />
        </PasswordContextProvider>

        <Footer>
          <A href="/login">Fazer login</A>
          <SubmitButton variant="form-action">Cadastrar</SubmitButton>
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default Register;
