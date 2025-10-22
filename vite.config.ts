import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [
    solid(),
    mkcert()
  ],
  server: {
    host: "nath.chat.local",
    port: 7000,
  }
})
