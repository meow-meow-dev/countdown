/// <reference types="vite/client" />

/* eslint-disable @typescript-eslint/consistent-type-definitions */

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly CF_PAGES_URL?: string;
}

/* eslint-enable @typescript-eslint/consistent-type-definitions */
