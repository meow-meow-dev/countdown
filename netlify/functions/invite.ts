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

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response()
  }
  else if (req.method === "POST") {
    return handleRequest({
      callback: sendInvitation,
      request: req,
      schema: inviteBodySchema,
      rateLimiter: { limit: 10, token: "send_invitation" },
    })
  }
  else {
    return new Response("Not Found", { status: 404 })
  }
}
