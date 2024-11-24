import { env } from "node:process"
import ejs from "ejs"
import { sendEmail } from "./sendEmail"

const templates = {
  body: `<html>
            <body>
              <p>Bonjour <%= to.name %>,</p>
              <p><%= from.name %> a partagé avec vous le compte à rebours <a href="<%= countdown.url %>"><%= countdown.label %></a></p>
              <p style="color: #acaba9">Envoyé depuis <a href="<%= website.url %>"><%= website.name %></a></p>
            </body>
          </html>`,
  subject: "Compte à rebours: <%= countdown.label %>",
}

type SendEmailProps = {
  from: {
    name: string
  }
  to: {
    email: string
    name: string
  }
}

export async function sendInvitation(params: SendEmailProps): Promise<void> {
  const { NETLIFY_SEND_INVITATION_FROM, NETLIFY_WEBSITE_NAME, NETLIFY_WEBSITE_URL } = env
  if (NETLIFY_SEND_INVITATION_FROM === undefined || NETLIFY_WEBSITE_NAME === undefined || NETLIFY_WEBSITE_URL === undefined)
    return

  const body = ejs.render(templates.body, { ...params, website: { name: NETLIFY_WEBSITE_NAME, url: NETLIFY_WEBSITE_URL } })
  const subject = ejs.render(templates.subject, params)

  await sendEmail({ body, from: NETLIFY_SEND_INVITATION_FROM, subject, to: params.to.email })
}
