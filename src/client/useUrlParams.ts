import { DateTime } from "luxon";
import { useMemo } from "react";

export type UrlParams = {
  label: string;
  to: DateTime<true>;
};

export function useUrlParams(url: string): undefined | UrlParams {
  return useMemo(() => {
    const { searchParams } = new URL(url);
    const label = searchParams.get("label");
    const to = searchParams.get("to");

    const toDate = to ? DateTime.fromISO(to) : undefined;

    return label && toDate && toDate.isValid
      ? { label, to: toDate }
      : undefined;
  }, [url]);
}
