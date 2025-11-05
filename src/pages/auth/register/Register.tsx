import Input, { PasswordContextProvider } from "@components/input";
import { A } from "@solidjs/router";
import { type Component } from "solid-js";
import getRegsiterPageTranslator from "./Register.lang";
import {
  Content,
  Footer,
  SubmitButton,
  Title,
  Wrapper,
} from "./Register.styled";

interface RegsiterProps {}

const Regsiter: Component<RegsiterProps> = (props) => {
  const t = getRegsiterPageTranslator();

  return (
    <Wrapper>
      <Content>
        <Title>{t("title")}</Title>

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

export default Regsiter;
