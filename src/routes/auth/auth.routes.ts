import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const authRoutes: RouteDefinition[] = [
  { path: "/login", component: lazy(() => import("@pages/auth/login/Login")) },
  { path: "/register" },
  { path: "/logout" },
];

export default authRoutes;
