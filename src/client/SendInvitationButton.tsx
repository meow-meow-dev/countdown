import type { JSX } from "react";

import { i18n } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { FiMail } from "react-icons/fi";

import type { FormData } from "./InviteForm.jsx";
import type { UrlParams } from "./useUrlParams.js";

import { Button } from "./Button.jsx";
import { InviteForm } from "./InviteForm.jsx";
import { sendInvitation } from "./sendInvitation.js";

type SendInvitationButtonProps = {
  url: string;
  urlParams: undefined | UrlParams;
};

export function SendInvitationButton({
  url,
  urlParams,
}: SendInvitationButtonProps): JSX.Element {
  const { t } = useLingui();

  async function onSendInvitation(formData: FormData): Promise<void> {
    if (!urlParams) return;

    await sendInvitation({
      ...formData,
      countdown: { label: urlParams.label, url },
      locale: i18n.locale,
    });

    notifications.show({
      autoClose: 2000,
      message: t`Le compte à rebours a été envoyé`,
      position: "top-center",
    });

    close();
  }

  const handleDisplayInvitationForm = (): void => {
    const modalId = "send_invitation";

    const handleCancel = (): void => {
      modals.close(modalId);
    };

    const handleSubmit = async (formData: FormData): Promise<void> => {
      await onSendInvitation(formData);
      modals.close(modalId);
    };

    modals.open({
      centered: true,
      children: <InviteForm onCancel={handleCancel} onSubmit={handleSubmit} />,
      classNames: { content: "w-[95%] md:w-120" },
      modalId,
      size: "auto",
      withCloseButton: false,
    });
  };

  return (
    <Button Icon={FiMail} onClick={handleDisplayInvitationForm}>
      {t`Partager par email`}
    </Button>
  );
}
