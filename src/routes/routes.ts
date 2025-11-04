import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import pagesRoutes from "./pagesRoutes/pagesRoutes";

const routes: RouteDefinition[] = [
  {
    path: "",
    component: lazy(() => import("@templates/page/Page")),
    children: pagesRoutes,
  },
];

export default routes;
