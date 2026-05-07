import { useState, useEffect, useCallback, useRef } from 'react';

// ═══════════════════════════════════════════════════════
// useLocalStorage – Typed persistent state manager
// ═══════════════════════════════════════════════════════

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// ═══════════════════════════════════════════════════════
// useDebounce – Search and input optimization
// ═══════════════════════════════════════════════════════

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ═══════════════════════════════════════════════════════
// useAnalytics – User interaction tracking
// ═══════════════════════════════════════════════════════

import { trackGAEvent, trackGAPageView, ANALYTICS_EVENTS, type AnalyticsEventName } from '@/utils/analytics';

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEventName, properties?: Record<string, any>) => {
    trackGAEvent(event, properties);
  }, []);

  const trackPageView = useCallback((path: string) => {
    trackGAPageView(path);
  }, []);

  return { trackEvent, trackPageView, EVENTS: ANALYTICS_EVENTS };
}

// ═══════════════════════════════════════════════════════
// useFetch – Generic async wrapper with retry & loading
// ═══════════════════════════════════════════════════════

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(fetchFn: () => Promise<T>, options = { autoRun: true, retry: 2 }) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: options.autoRun,
    error: null,
  });

  const retryCount = useRef(0);

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await fetchFn();
      setState({ data: result, loading: false, error: null });
      retryCount.current = 0;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      
      if (retryCount.current < options.retry) {
        retryCount.current++;
        setTimeout(execute, 1000 * retryCount.current);
      } else {
        setState({ data: null, loading: false, error });
      }
    }
  }, [fetchFn, options.retry]);

  useEffect(() => {
    if (options.autoRun) {
      execute();
    }
  }, [execute, options.autoRun]);

  return { ...state, retry: execute };
}
