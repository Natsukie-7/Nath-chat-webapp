import path from "path";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid(), mkcert()],
  server: {
    host: "nath.chat.local",
    port: 7000,
  },
  resolve: {
    alias: {
      "@tools": path.resolve(__dirname, "src/tools"),
      "@templates": path.resolve(__dirname, "src/templates"),
    },
  },
});
