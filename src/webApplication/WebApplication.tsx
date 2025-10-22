import { Router } from "@solidjs/router";
import { type Component } from "solid-js";
import routes from "../routes/routes";

interface WebApplicationProps {}

const WebApplication: Component<WebApplicationProps> = () => {
  return <Router>{routes}</Router>;
};

export default WebApplication;
