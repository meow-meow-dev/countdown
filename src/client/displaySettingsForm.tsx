import { i18n } from "@lingui/core";
import { modals } from "@mantine/modals";

import { loadMessages } from "./loadMessages.js";
import { type Settings, SettingsForm } from "./SettingsForm.jsx";

export function displaySettingsForm(): void {
  const modalId = "display_settings";

  const handleCancel = (): void => {
    modals.close(modalId);
  };

  const handleSubmit = async (settings: Settings): Promise<void> => {
    await loadMessages(settings.locale);
    localStorage.setItem("lang", settings.locale);
    modals.close(modalId);
  };

  modals.open({
    children: (
      <SettingsForm
        className="max-w-full"
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        settings={{ locale: i18n.locale }}
      />
    ),
    modalId,
    size: "auto",
    withCloseButton: false,
  });
}
