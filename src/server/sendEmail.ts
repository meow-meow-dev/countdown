import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

import type { Configuration } from "./Configuration.js";

type SendEmailProps = {
  body: string;
  from: string;
  subject: string;
  to: string;
};

export async function sendEmail(
  { body, from, subject, to }: SendEmailProps,
  configuration: Configuration
): Promise<void> {
  const { awsAccessKeyId, awsRegion, awsSecretAccessKey } = configuration;

  const sendEmailParams = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: from,
  };

  const ses = new SESClient({
    credentials: {
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccessKey,
    },
    region: awsRegion,
  });
  const command = new SendEmailCommand(sendEmailParams);
  await ses.send(command);
}
