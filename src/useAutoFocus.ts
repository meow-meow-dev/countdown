import { useTimeout } from "@mantine/hooks";
import { type RefObject, useRef } from "react";

export function useAutoFocus<
  ELEMENT extends HTMLInputElement,
>(): RefObject<ELEMENT | null> {
  const ref = useRef<ELEMENT>(null);
  useTimeout(
    () => {
      if (ref.current) ref.current.focus();
    },
    10,
    { autoInvoke: true },
  );

  return ref;
}
