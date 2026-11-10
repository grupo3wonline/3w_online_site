import { useEffect, useState } from "react";

export function useLocalHistory<T>(key: string, limit = 20) {
  const [items, setItems] = useState<T[]>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {
      // ignore write errors (private mode, etc.)
    }
  }, [items, key]);

  const add = (item: T) =>
    setItems((prev) => [item, ...prev].slice(0, Math.max(1, limit)));

  const clear = () => setItems([]);

  return { items, add, clear };
}
