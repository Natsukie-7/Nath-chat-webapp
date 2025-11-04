import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const viewRoutes: RouteDefinition[] = [
  {
    path: "",
    component: lazy(() => import("@templates/page/Page")),
    children: [
      { path: "/home", component: lazy(() => import("@pages/home/Home")) },
    ],
  },
];

export default viewRoutes;
