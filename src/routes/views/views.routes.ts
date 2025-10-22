import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const viewRoutes: RouteDefinition[] = [
  {
    path: "",
    component: lazy(() => import("@templates/page/Page")),
  },
];

export default viewRoutes;
