import limiteFactory from "lambda-rate-limiter"
import { type BaseIssue, type BaseSchema, type InferOutput, safeParse } from "valibot"
import { corsHeaders } from "./corsHeaders"

const limiter = limiteFactory({
  interval: 60000, // rate limit interval in ms, starts on first request
  uniqueTokenPerInterval: 500, // excess causes earliest seen to drop, per instantiation
})

type HandleRequestProps<TCallbackOutput, TInput, TOutput, TIssue extends BaseIssue<unknown>, TSchema extends BaseSchema<TInput, TOutput, TIssue>> = {
  rateLimiter: {
    limit: number
    token: string
  }
  request: Request
  schema: TSchema
  callback: (params: InferOutput<TSchema>) => Promise<TCallbackOutput>
}

export async function handleRequest<TCallbackOutput, TInput, TOutput, TIssue extends BaseIssue<unknown>, TSchema extends BaseSchema<TInput, TOutput, TIssue>>({ callback, rateLimiter: { limit, token }, request, schema }: HandleRequestProps<TCallbackOutput, TInput, TOutput, TIssue, TSchema>): Promise<Response> {
  try {
    await limiter
      .check(limit, token) // define maximum of 10 requests per interval
  }
  catch (_) {
    return new Response("Rate Limit Exceeded", { status: 429 })
  }

  const bodyContent = await request.json()
  const parseOutput = safeParse(schema, bodyContent)

  if (parseOutput.success === false)
    return new Response("Bad Request", { headers: corsHeaders, status: 400 })

  try {
    const output = await callback(parseOutput.output)

    return Response.json(output ?? {}, { headers: corsHeaders })
  }
  catch (e) {
    console.error(e)
    return new Response("Internal Server Error", { headers: corsHeaders, status: 500 })
  }
}
