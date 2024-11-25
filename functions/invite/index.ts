import type { EventContext } from "@cloudflare/workers-types"
import type { Env } from "./Env"
import { email, minLength, pipe, strictObject, string, url } from "valibot"
import { handleRequest } from "./handleRequest"
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

export function onRequestPost({ env, request }: EventContext<Env, string, never>): Response | Promise<Response> {
  return handleRequest({
    callback: sendInvitation,
    env,
    request,
    schema: inviteBodySchema,
    rateLimiter: { limit: 10, token: "send_invitation" },
  })
}

export function onRequestOptions(): Response | Promise<Response> {
  return new Response()
}
