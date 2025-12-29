import { useState, useEffect, useCallback } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debounceHandler = useCallback(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  useEffect(() => {
    return debounceHandler();
  }, [debounceHandler]);

  return debouncedValue;
}

export default useDebounce;
