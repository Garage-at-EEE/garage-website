import { useEffect, useRef, useState, useMemo } from "react";

const useFetch = ({ url, headers = {}, enabled = true, useCache = true }) => {
  const control = useRef();
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Memoize headers to prevent unnecessary re-renders
  const memoizedHeaders = useMemo(() => headers, [JSON.stringify(headers)]);

  const getData = async () => {
    // Abort any previous request
    if (control.current) {
      control.current.abort();
    }
    const controller = new AbortController();
    control.current = controller;

    // Reset state
    setIsLoading(true);
    setError(null);

    // Check for cached data
    const cachedData = localStorage.getItem(url);
    const cacheTimestamp = localStorage.getItem(`${url}_timestamp`);
    const cacheExpiry = 1000 * 60 * 5; // Cache expires after 5 minutes
    if (cachedData && useCache && Date.now() - cacheTimestamp < cacheExpiry) {
      setData(JSON.parse(cachedData));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: memoizedHeaders,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();

      // Only update state if data is different
      setData((prev) =>
        JSON.stringify(prev) !== JSON.stringify(responseData) ? responseData : prev
      );

      // Cache data
      if (useCache) {
        localStorage.setItem(url, JSON.stringify(responseData));
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      getData();
    }

    return () => {
      if (control.current) {
        control.current.abort();
      }
    };
  }, [url, memoizedHeaders, enabled, useCache]); // Updated dependencies

  return { data, isLoading, error };
};

export default useFetch;
