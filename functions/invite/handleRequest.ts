import type { Request } from "@cloudflare/workers-types"
import type { Env } from "./Env"
import { type BaseIssue, type BaseSchema, type InferOutput, safeParse } from "valibot"
import { getCorsHeaders } from "./corsHeaders"

type HandleRequestProps<TCallbackOutput, TInput, TOutput, TIssue extends BaseIssue<unknown>, TSchema extends BaseSchema<TInput, TOutput, TIssue>> = {
  env: Env
  rateLimiterToken?: string
  request: Request
  schema: TSchema
  callback: (params: InferOutput<TSchema>, env: Env) => Promise<TCallbackOutput>
}

export async function handleRequest<TCallbackOutput, TInput, TOutput, TIssue extends BaseIssue<unknown>, TSchema extends BaseSchema<TInput, TOutput, TIssue>>({ callback, env, rateLimiterToken, request, schema }: HandleRequestProps<TCallbackOutput, TInput, TOutput, TIssue, TSchema>): Promise<Response> {
  const { pathname } = new URL(request.url)
  const { success } = await env.MY_RATE_LIMITER.limit({ key: rateLimiterToken ?? pathname })
  if (!success) {
    return new Response("Rate Limit Exceeded", { status: 429 })
  }

  const bodyContent = await request.json()
  const parseOutput = safeParse(schema, bodyContent)

  if (parseOutput.success === false)
    return new Response("Bad Request", { headers: getCorsHeaders(env), status: 400 })

  try {
    const output = await callback(parseOutput.output, env)

    return Response.json(output ?? {}, { headers: getCorsHeaders(env) })
  }
  catch (e) {
    console.error(e)
    return new Response("Internal Server Error", { headers: getCorsHeaders(env), status: 500 })
  }
}
