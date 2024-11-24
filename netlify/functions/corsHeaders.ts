import { env } from "node:process"

const { NETLIFY_WEBSITE_URL } = env

export const corsHeaders = {
  "access-control-allow-origin": NETLIFY_WEBSITE_URL ?? "*",
}
