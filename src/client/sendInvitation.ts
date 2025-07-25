import type { AppType } from "#server";

import { hc } from "hono/client";

import type { FormData } from "./InviteForm.jsx";

const client = hc<AppType>(
  import.meta.env.CF_PAGES_URL ?? window.location.origin
);

type SendInvitationProps = FormData & {
  countdown: {
    label: string;
    url: string;
  };
  locale: string;
};

export async function sendInvitation({
  locale,
  ...props
}: SendInvitationProps): Promise<void> {
  const response = await client.api.v1.invite.$post(
    { json: props },
    { headers: { "Accept-Language": locale } }
  );
  if (!response.ok) throw new Error("Request failed");
}
