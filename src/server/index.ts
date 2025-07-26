import { i18n } from "@lingui/core";
import { sValidator } from "@meow-meow-dev/server-utilities/validation";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { languageDetector } from "hono/language";
import { email, minLength, pipe, strictObject, string, url } from "valibot";

import { buildHono } from "./buildHono.js";
import { buildConfiguration } from "./Configuration.js";
import { messages as en } from "./locales/en/messages.js";
import { messages as fr } from "./locales/fr/messages.js";
import { sendInvitation } from "./sendInvitation.js";

i18n.load({
  en,
  fr,
});

const inviteBodySchema = strictObject({
  countdown: strictObject({ label: string(), url: pipe(string(), url()) }),
  from: strictObject({
    name: pipe(string(), minLength(1)),
  }),
  to: strictObject({
    email: pipe(string(), email()),
    name: pipe(string(), minLength(1)),
  }),
});

const inviteRoute = buildHono().post(
  "/",
  sValidator("json", inviteBodySchema),
  async (c) => {
    const configuration = buildConfiguration(c);
    const websiteUrl = configuration.websiteUrl ?? new URL(c.req.url).origin;

    await sendInvitation(
      { ...c.req.valid("json"), locale: c.var.language },
      configuration,
      websiteUrl
    );
    return c.text("OK");
  }
);

const developmentUrl = ["http://localhost:5173", "http://localhost:8788"];

const api = buildHono()
  .use("*", (c, next) => {
    const { websiteUrl } = buildConfiguration(c);

    return cors({
      credentials: true,
      origin: websiteUrl ?? developmentUrl,
    })(c, next);
  })
  .use("*", (c, next) => {
    const { websiteUrl } = buildConfiguration(c);

    return csrf({
      origin: websiteUrl ?? developmentUrl,
    })(c, next);
  })
  .route("/invite", inviteRoute);

const app = buildHono()
  .use(
    languageDetector({
      caches: false,
      convertDetectedLanguage: (lang) => lang.split("-")[0],
      fallbackLanguage: "en",
      order: ["header"], // TODO caches:false doesn't seem to work
      supportedLanguages: ["en", "fr"],
    })
  )
  // useful when debugging
  // // .use(logger())
  // Required to prevent a crash in development mode
  .get("*", (c) => {
    return c.env.ASSETS
      ? c.env.ASSETS.fetch(c.req.raw)
      : new Response("Not Found", { status: 404 });
  })
  .route("/api/v1", api);

export type AppType = typeof app;

export default app;
