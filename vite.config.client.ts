import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig(async () => {
  return {
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
