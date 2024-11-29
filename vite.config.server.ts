import build from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import cloudflareAdapter from "@hono/vite-dev-server/cloudflare";

import { defineConfig } from "vite";

export default defineConfig(async ({ mode }) => {
  const isDev = mode === "development";
  let devServerPlugin;
  if (isDev) {
    devServerPlugin = devServer({
      entry: "src/server/index.ts",
      adapter: cloudflareAdapter,
    });
  }

  return {
    cacheDir: ".vite/server",
    plugins: [
      build({
        entry: ["src/server/index.ts"],
      }),
      devServerPlugin,
    ],
    server: {
      port: 3000,
    },
  };
});
