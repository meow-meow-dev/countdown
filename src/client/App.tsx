import type { JSX } from "react";

import { Center, Stack } from "@mantine/core";

import { ButtonsBar } from "./ButtonsBar.jsx";
import { Countdown } from "./Countdown.jsx";
import { Editor } from "./Editor.jsx";
import { updateSearchParamsFromEditorFormData as handleSubmit } from "./updateSearchParamsFromEditorFormData.js";
import { urlParamsToEditorFormData } from "./urlParamsToEditorFormData.js";
import { useUrlParams } from "./useUrlParams.js";

export function App(): JSX.Element {
  const url = window.location.href;
  const urlParams = useUrlParams(url);

  return (
    <Stack className="h-full">
      <Center className="grow">
        {urlParams ? (
          <Countdown
            className="m-auto"
            label={urlParams.label}
            to={urlParams.to}
          />
        ) : (
          <Editor
            className="border border-blue-600 p-5"
            defaultValues={urlParamsToEditorFormData(urlParams)}
            onSubmit={handleSubmit}
          />
        )}
      </Center>
      <ButtonsBar url={url} urlParams={urlParams} />
    </Stack>
  );
}
