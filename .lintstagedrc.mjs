export default {
  "**/*.{js, jsx, ts, tsx, json}": [
    "prettier --write .",
    "eslint . --fix",
    "prettier --check .",
    "eslint .",
  ],
};
