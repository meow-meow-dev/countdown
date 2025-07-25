import type { Plugin, UserConfig } from "vite";

import build from "@hono/vite-build/cloudflare-workers";
import devServer from "@hono/vite-dev-server";
import cloudflareAdapter from "@hono/vite-dev-server/cloudflare";
import { lingui } from "@lingui/vite-plugin";
import { defineConfig } from "vite";

import { buildEnv } from "./buildEnv.js";

export default defineConfig(({ mode }): UserConfig => {
  const entry = "src/server/index.ts";

  const isDev = mode === "development";
  let devServerPlugin: Plugin | undefined;
  if (isDev) {
    devServerPlugin = devServer({
      adapter: cloudflareAdapter,
      entry,
      env: buildEnv(),
    });
  }

  return {
    cacheDir: ".vite/server",
    plugins: [
      build({
        entry,
      }),
      devServerPlugin,
      lingui(),
    ],
    // Cf https://github.com/facebook/react/issues/31827
    resolve: {
      alias: [
        { find: "react-dom/server", replacement: "react-dom/server.edge" },
      ],
    },
    server: {
      port: 3000,
    },
  } satisfies UserConfig;
});
