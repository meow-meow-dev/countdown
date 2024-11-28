import type { Env } from "./Env"
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses"

type SendEmailProps = {
  body: string
  from: string
  subject: string
  to: string
}

export async function sendEmail(
  { body, from, subject, to }: SendEmailProps,
  env: Env,
): Promise<void> {
  const { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } = env

  if (
    AWS_ACCESS_KEY_ID === undefined
    || AWS_SECRET_ACCESS_KEY === undefined
    || AWS_REGION === undefined
  ) {
    return
  }

  const sendEmailParams = {
    Source: from,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: body,
        },
      },
    },
  }

  const ses = new SESClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  })
  const command = new SendEmailCommand(sendEmailParams)
  await ses.send(command)
}
