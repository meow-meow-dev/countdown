import { Hono } from "hono";

export type HonoEnv = {
  Bindings: Cloudflare.Env &
    Record<EnvironmentSecretKey, string | undefined> & {
      ADDITIONAL_WEBSITE_URL: string | undefined;
      ASSETS?: Fetcher;
      CF_PAGES?: "1" | undefined;
      CF_PAGES_URL: string | undefined;
    };
};

type EnvironmentSecretKey = "AWS_SECRET_ACCESS_KEY";

export function buildHono(): Hono<HonoEnv> {
  return new Hono<HonoEnv>();
}
