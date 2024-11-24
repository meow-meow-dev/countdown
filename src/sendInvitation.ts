import type { FormData } from "./InviteForm"

type SendInvitationProps = FormData & {
  countdown: {
    label: string
    url: string
  }
}

export async function sendInvitation(props: SendInvitationProps): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/.netlify/functions/invite`, { body: JSON.stringify(props), method: "POST" })
}
