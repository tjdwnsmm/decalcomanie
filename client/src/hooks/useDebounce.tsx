import { useEffect, useState } from 'react';

export default function useDebounce(keyword: string) {
  // hooks
  const [debouncedValue, setDebouncedValue] = useState(keyword);
  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(keyword);
    }, 100);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]); // 키워드가 변경되면 api를 호출

  return debouncedValue;
}
