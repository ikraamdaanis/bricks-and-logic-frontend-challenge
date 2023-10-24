import { useEffect, useState } from "react";

/**
 * Debounces a value to reduce the frequency of updates. Debouncing is a technique that
 * delays the execution of a function until after a certain period of time has passed
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
