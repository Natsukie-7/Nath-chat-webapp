import { Router } from "@solidjs/router";
import { ThemesContextProvider } from "@tools/themes/themes.context";
import { type Component } from "solid-js";
import routes from "../routes/routes";

interface WebApplicationProps {}

const WebApplication: Component<WebApplicationProps> = () => {
  return (
    <ThemesContextProvider>
      <Router>{routes}</Router>
    </ThemesContextProvider>
  );
};

export default WebApplication;
