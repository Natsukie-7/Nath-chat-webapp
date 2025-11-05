import { lazy } from "solid-js";
import pagesRoutes from "./pagesRoutes/pagesRoutes";
import type { AppRouteDefinition } from "./routes.type";

const routes: AppRouteDefinition[] = [
  {
    path: "",
    component: lazy(() => import("@templates/page/Page")),
    children: pagesRoutes,
  },
];

export default routes;
