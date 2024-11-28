import type { Env } from "./Env";

export function getCorsHeaders(env: Env): Record<string, string> {
  const { WEBSITE_URL } = env;
  return {
    "access-control-allow-origin": WEBSITE_URL ?? "*",
  };
}
