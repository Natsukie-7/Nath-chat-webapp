import { lazy } from "solid-js";
import type { AppRouteDefinition } from "../routes.type";

const pagesRoutes: AppRouteDefinition[] = [
  { path: "/home" },
  {
    path: "/login",
    component: lazy(() => import("@pages/auth/login/Login")),
    title: "Login",
  },
  {
    path: "/register",
    component: lazy(() => import("@pages/auth/register/Register")),
    title: "Login",
  },
  { path: "/logout" },
];

export default pagesRoutes;
