import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Creates a new searchParams string by merging the current
 * searchParams with a provided key/value pair.
 */
export const useCreateQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (params.get(name) === value || !value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  return createQueryString;
};
