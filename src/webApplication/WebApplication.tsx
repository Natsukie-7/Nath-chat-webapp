<<<<<<< Updated upstream
=======
import { Router } from "@solidjs/router";
import { ThemeContextProvider } from "@tools/themes/themes.context";
>>>>>>> Stashed changes
import { type Component } from "solid-js";

interface WebApplicationProps {}

const WebApplication: Component<WebApplicationProps> = () => {
<<<<<<< Updated upstream
  return <div>WebApplication</div>;
=======
  return (
    <ThemeContextProvider>
      <Router>{routes}</Router>
    </ThemeContextProvider>
  );
>>>>>>> Stashed changes
};

export default WebApplication;
