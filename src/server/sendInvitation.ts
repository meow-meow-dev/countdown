import type { Env } from "./Env";
import { sendEmail } from "./sendEmail";

type TemplateParams = SendEmailProps & {
  website: { name: string; url: string };
};
function generateBody({
  countdown,
  from,
  to,
  website,
}: TemplateParams): string {
  return `<html>
            <body>
              <p>Bonjour ${to.name},</p>
              <p>${from.name} a partagé avec vous le compte à rebours <a href="${countdown.url}">${countdown.label}</a></p>
              <p style="color: #acaba9">Envoyé depuis <a href="${website.url}">${website.name}</a></p>
            </body>
          </html>`;
}

function generateSubject({ countdown }: TemplateParams): string {
  return `Compte à rebours: ${countdown.label}`;
}

type SendEmailProps = {
  countdown: { label: string; url: string };
  from: {
    name: string;
  };
  to: {
    email: string;
    name: string;
  };
};

export async function sendInvitation(
  params: SendEmailProps,
  env: Env,
): Promise<void> {
  const { SEND_INVITATION_FROM, WEBSITE_NAME, WEBSITE_URL } = env;
  if (
    SEND_INVITATION_FROM === undefined ||
    WEBSITE_NAME === undefined ||
    WEBSITE_URL === undefined
  ) {
    return;
  }

  const templateParams = {
    ...params,
    website: { name: WEBSITE_NAME, url: WEBSITE_URL },
  };
  const body = generateBody(templateParams);
  const subject = generateSubject(templateParams);

  await sendEmail(
    { body, from: SEND_INVITATION_FROM, subject, to: params.to.email },
    env,
  );
}
