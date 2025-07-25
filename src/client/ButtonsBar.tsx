import type { JSX } from "react";

import type { UrlParams } from "./useUrlParams.js";

import { CopyUrlButton } from "./CopyUrlButton.jsx";
import { EditButton } from "./EditButton.js";
import { EditSettingsButton } from "./EditSettingsButton.jsx";
import { SendInvitationButton } from "./SendInvitationButton.jsx";

type ButtonsBarProps = {
  url: string;
  urlParams: undefined | UrlParams;
};

export function ButtonsBar({ url, urlParams }: ButtonsBarProps): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-3 md:flex md:flex-row md:justify-end">
      {urlParams ? (
        <>
          <EditButton mode="create" urlParams={urlParams} />

          <EditButton mode="edit" urlParams={urlParams} />

          <CopyUrlButton url={url} />

          <SendInvitationButton url={url} urlParams={urlParams} />
        </>
      ) : undefined}

      <EditSettingsButton className={urlParams ? undefined : "col-start-2"} />
    </div>
  );
}
