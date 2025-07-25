import type { EditorFormData } from "./Editor.jsx";
import type { UrlParams } from "./useUrlParams.js";

export function urlParamsToEditorFormData(
  urlParams: undefined | UrlParams
): EditorFormData | undefined {
  return urlParams
    ? { label: urlParams.label, to: urlParams.to.toISODate() }
    : undefined;
}
