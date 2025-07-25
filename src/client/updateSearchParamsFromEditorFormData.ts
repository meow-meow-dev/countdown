import type { EditorFormData } from "./Editor.jsx";

export function updateSearchParamsFromEditorFormData({
  label,
  to,
}: EditorFormData): void {
  window.location.search = new URLSearchParams({
    label,
    to,
  }).toString();
}
