import { ThemesContextProvider } from "@tools/themes/themes.context";
import { type Component } from "solid-js";

interface LoginProps {}

const Login: Component<LoginProps> = (props) => {
  return <ThemesContextProvider>Login</ThemesContextProvider>;
};

export default Login;
