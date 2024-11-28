import { env } from "hono/adapter"
import { createFactory } from "hono/factory"
import { parse } from "valibot"
import { type Env, envSchema, envSchemaFields } from "./Env"

type Bindings = {
  ASSETS: Fetcher | undefined
}

export const factory = createFactory<{ Bindings: Bindings, Variables: Env }>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const allEnvironmentVariables = env(c)

      // Use c.set to add env variables to the context for seamless accessibility
      for (const key of Object.keys(envSchemaFields)) {
        const value = allEnvironmentVariables[key]
        if (typeof value === "string")
          c.set(key as keyof Env, value)
      }

      parse(envSchema, c.var)

      await next()
    })
  },
})
