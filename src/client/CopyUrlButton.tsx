import type { JSX } from "react";

import { useLingui } from "@lingui/react/macro";
import { notifications } from "@mantine/notifications";
import { FiLink } from "react-icons/fi";

import { Button } from "./Button.jsx";

type CopyUrlButtonProps = {
  url: string;
};

export function CopyUrlButton({ url }: CopyUrlButtonProps): JSX.Element {
  const { t } = useLingui();

  function handleCopyUrl(): void {
    navigator.clipboard.writeText(url);

    notifications.show({
      autoClose: 2000,
      message: t`L'adresse a été copiée dans le presse-papier`,
      position: "top-center",
    });
  }

  return (
    <Button Icon={FiLink} onClick={handleCopyUrl}>
      {t`Copier l'URL`}
    </Button>
  );
}
