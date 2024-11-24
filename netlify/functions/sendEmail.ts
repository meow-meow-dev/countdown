import { env } from "node:process"
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses"

type SendEmailProps = {
  body: string
  from: string
  subject: string
  to: string
}

export async function sendEmail({ body, from, subject, to }: SendEmailProps): Promise<void> {
  const { NETLIFY_AWS_ACCESS_KEY_ID, NETLIFY_AWS_REGION, NETLIFY_AWS_SECRET_ACCESS_KEY } = env
  if (NETLIFY_AWS_ACCESS_KEY_ID === undefined || NETLIFY_AWS_SECRET_ACCESS_KEY === undefined || NETLIFY_AWS_REGION === undefined)
    return

  const sendEmailParams = {
    Source: from,
    Destination: {
      ToAddresses: [
        to,
      ],
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

  const ses = new SESClient({ region: NETLIFY_AWS_REGION, credentials: { accessKeyId: NETLIFY_AWS_ACCESS_KEY_ID, secretAccessKey: NETLIFY_AWS_SECRET_ACCESS_KEY } })
  const command = new SendEmailCommand(sendEmailParams)
  await ses.send(command)
}
