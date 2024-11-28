import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import build from "@hono/vite-cloudflare-pages";

import cloudflareAdapter from "@hono/vite-dev-server/cloudflare";

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
