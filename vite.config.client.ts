import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  cacheDir: ".vite/client",
  plugins: [
    tailwindcss(),
    viteReact({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
    lingui(),
  ],
  server: {
    cors: true,
    host: true,
    port: 5173,
    proxy: {
      "/api/": {
        changeOrigin: true,
        secure: false,
        target: "http://localhost:3000",
      },
    },
    strictPort: true,
  },
  test: {
    css: true,
    environment: "jsdom",
    globals: true,
    include: ["./src/client/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    setupFiles: ["./src/client/test/setup/index.ts"],
  },
});
