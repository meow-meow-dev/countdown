import type { JSX } from "react";

import { useLingui } from "@lingui/react/macro";
import { FiSettings } from "react-icons/fi";

import { Button } from "./Button.jsx";
import { displaySettingsForm as handleDisplaySettingsForm } from "./displaySettingsForm.js";

type EditSettingsButtonProps = { className?: string };

export function EditSettingsButton({
  className,
}: EditSettingsButtonProps): JSX.Element {
  const { t } = useLingui();

  return (
    <Button
      className={className}
      Icon={FiSettings}
      onClick={handleDisplaySettingsForm}
    >{t`Configuration`}</Button>
  );
}
