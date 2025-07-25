import { defineConfig } from "@lingui/cli";

export default defineConfig({
  catalogs: [
    {
      exclude: "<rootDir>/src/client/_generated/**",
      include: ["<rootDir>/src/client"],
      path: "<rootDir>/src/client/locales/{locale}/messages",
    },
    {
      exclude: "<rootDir>/src/server/_generated/**",
      include: ["<rootDir>/src/server"],
      path: "<rootDir>/src/server/locales/{locale}/messages",
    },
  ],
  locales: ["fr", "en"],
  sourceLocale: "fr",
});
