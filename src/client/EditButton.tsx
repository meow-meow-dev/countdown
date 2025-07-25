import type { JSX } from "react";

import { useLingui } from "@lingui/react/macro";
import { modals } from "@mantine/modals";
import { FiEdit, FiPlusSquare } from "react-icons/fi";

import type { EditorFormData } from "./Editor.jsx";
import type { UrlParams } from "./useUrlParams.js";

import { Button } from "./Button.jsx";
import { Editor } from "./Editor.jsx";
import { updateSearchParamsFromEditorFormData } from "./updateSearchParamsFromEditorFormData.js";
import { urlParamsToEditorFormData } from "./urlParamsToEditorFormData.js";

type EditButtonProps = {
  mode: "create" | "edit";
  urlParams: undefined | UrlParams;
};

export function EditButton({ mode, urlParams }: EditButtonProps): JSX.Element {
  const { t } = useLingui();

  const handleDisplayEditor = (): void => {
    const modalId = "editor";

    const handleCancel = (): void => {
      modals.close(modalId);
    };

    const handleSubmit = (formData: EditorFormData): void => {
      updateSearchParamsFromEditorFormData(formData);
      modals.close(modalId);
    };

    modals.open({
      centered: true,
      children: (
        <Editor
          className="max-w-full"
          defaultValues={
            mode === "edit" ? urlParamsToEditorFormData(urlParams) : undefined
          }
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      ),
      classNames: { content: "w-[95%] md:w-120" },
      modalId,
      size: "auto",
      withCloseButton: false,
    });
  };

  return (
    <Button
      Icon={mode === "edit" ? FiEdit : FiPlusSquare}
      onClick={handleDisplayEditor}
    >
      {mode === "edit" ? t`Éditer` : t`Créer`}
    </Button>
  );
}
