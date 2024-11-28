import { vValidator } from "@hono/valibot-validator"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { email, minLength, pipe, strictObject, string, url } from "valibot"
import { factory } from "./factory"
import { sendInvitation } from "./sendInvitation"

const inviteBodySchema = strictObject({
  countdown: strictObject({ label: string(), url: pipe(string(), url()) }),
  from: strictObject({
    name: pipe(string(), minLength(1)),
  }),
  to: strictObject({
    email: pipe(string(), email()),
    name: pipe(string(), minLength(1)),
  }),
})

const inviteRoute = factory
  .createApp()
  .post("/", vValidator("json", inviteBodySchema), async (c) => {
    await sendInvitation(c.req.valid("json"), c.var)
    return c.text("OK")
  })

const api = factory.createApp().route("/invite", inviteRoute)

const app = factory
  .createApp()
  .use(cors())
  .use(logger())
  // Required to prevent a crash in development mode
  .get("*", async (c) => {
    return c.env.ASSETS
      ? c.env.ASSETS.fetch(c.req.raw)
      : new Response("Not Found", { status: 404 })
  })
  .route("/api/v1", api)

export type AppType = typeof app

export default app
