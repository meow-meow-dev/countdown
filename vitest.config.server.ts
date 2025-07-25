import { defineWorkersProject } from "@cloudflare/vitest-pool-workers/config";

import { buildEnv } from "./buildEnv.ts";

export default defineWorkersProject(async () => {
  return {
    test: {
      coverage: {
        include: ["./src/server/**/*.ts"],
        provider: "istanbul",
      },
      include: ["./src/server/**/*.test.ts"],
      poolOptions: {
        workers: {
          main: "./src/server/index.ts",
          miniflare: {
            bindings: {
              ...buildEnv(),
            },
          },
          singleWorker: true,
          wrangler: {
            configPath: "./wrangler.jsonc",
          },
        },
      },
    },
  };
});
