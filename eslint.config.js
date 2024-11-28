import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: false,

  typescript: true,

  rules: {
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "unused-imports/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
});
