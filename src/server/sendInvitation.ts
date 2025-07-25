import { i18n } from "@lingui/core";

import type { Configuration } from "./Configuration.js";

import { sendEmail } from "./sendEmail.js";

type SendEmailProps = {
  countdown: { label: string; url: string };
  from: {
    name: string;
  };
  locale: string;
  to: {
    email: string;
    name: string;
  };
};

type TemplateParams = SendEmailProps & {
  website: { name: string; url: string };
};

export async function sendInvitation(
  params: SendEmailProps,
  configuration: Configuration
): Promise<void> {
  const templateParams = {
    ...params,
    website: { name: configuration.websiteName, url: configuration.websiteUrl },
  };
  const { body, subject } = await generateEmail(templateParams);

  await sendEmail(
    {
      body,
      from: configuration.sendInvitationFrom,
      subject,
      to: params.to.email,
    },
    configuration
  );
}

async function generateEmail({
  countdown,
  from,
  locale,
  to,
  website,
}: TemplateParams): Promise<{ body: string; subject: string }> {
  i18n.activate(locale);

  const { name: toName } = to;
  const { name: fromName } = from;
  const { name: websiteName, url: websiteUrl } = website;
  const { label: countdownLabel, url: countdownUrl } = countdown;

  const body = `
    <html>
      <body>
      <p>
        ${i18n._("Bonjour {toName},", { toName })}
      </p>
      <p>
        ${i18n._(
          '{fromName} a partagé avec vous le compte à rebours <a href="{countdownUrl}">{countdownLabel}</a>',
          { countdownLabel, countdownUrl, fromName }
        )}
      </p>
      <p style="color: #acaba9">
        ${i18n._('Envoyé depuis <a href="{websiteUrl}">{websiteName}</a>', { websiteName, websiteUrl })}
      </p>
      </body>
    </html>`;

  const subject = i18n._("Compte à rebours : {countdownLabel}", {
    countdownLabel,
  });

  return { body, subject };
}
