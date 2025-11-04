import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const pagesRoutes: RouteDefinition[] = [
  { path: "/home" },
  { path: "/login", component: lazy(() => import("@pages/auth/login/Login")) },
  { path: "/register" },
  { path: "/logout" },
];

export default pagesRoutes;
