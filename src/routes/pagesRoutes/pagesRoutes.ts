import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const pagesRoutes: RouteDefinition[] = [
  { path: "/home" },
  {
    path: "/login",
    component: lazy(() => import("@pages/auth/login/Login")),
    title: "teste02",
  },
  {
    path: "/register",
    component: lazy(() => import("@pages/auth/register/Register")),
  },
  { path: "/logout" },
];

export default pagesRoutes;
