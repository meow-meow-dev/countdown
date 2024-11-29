import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(async () => {
  return {
    cacheDir: ".vite/client",
    plugins: [viteReact()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, "/api"),
        },
      },
    },
  };
});
