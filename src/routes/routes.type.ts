import type { RouteDefinition } from "@solidjs/router";

export interface AppRouteDefinition extends RouteDefinition {
  title?: string;
  children?: AppRouteDefinition[];
}
