import type { RouteDefinition } from "@solidjs/router";
import authRoutes from "./auth/auth.routes";
import viewRoutes from "./views/views.routes";

const routes: RouteDefinition[] = [...viewRoutes, ...authRoutes];

export default routes;
