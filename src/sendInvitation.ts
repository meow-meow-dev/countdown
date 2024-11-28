import type { FormData } from "./InviteForm";
import type { AppType } from "./server";
import { hc } from "hono/client";

const client = hc<AppType>(import.meta.env.VITE_API_URL);

type SendInvitationProps = FormData & {
  countdown: {
    label: string;
    url: string;
  };
};

export async function sendInvitation(
  props: SendInvitationProps,
): Promise<void> {
  await client.api.v1.invite.$post({ json: props });
}
