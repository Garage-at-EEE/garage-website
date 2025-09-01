import { useEffect, useRef, useState, useMemo } from "react";

const useFetch = ({ url, headers = {}, enabled = true, useCache = true }) => {
  const control = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const memoizedHeaders = useMemo(() => headers, [JSON.stringify(headers)]);

  const getData = async () => {
    console.log("Fetching data from:", url);

    if (control.current) {
      console.log("Aborting previous request");
      control.current.abort();
    }

    const controller = new AbortController();
    control.current = controller;

    setIsLoading(true);
    setError(null);

    const cachedData = localStorage.getItem(url);
    const cacheTimestamp = localStorage.getItem(`${url}_timestamp`);
    const cacheExpiry = 1000 * 60 * 5; // 5 minutes

    // if (cachedData && useCache && Date.now() - cacheTimestamp < cacheExpiry) {
    //   console.log("Using cached data:", JSON.parse(cachedData));
    //   setData(JSON.parse(cachedData));
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: memoizedHeaders,
      });
      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Parsed response data:", responseData);

      setData((prev) =>
        JSON.stringify(prev) !== JSON.stringify(responseData) ? responseData : prev
      );

      if (useCache) {
        localStorage.setItem(url, JSON.stringify(responseData));
        localStorage.setItem(`${url}_timestamp`, Date.now().toString());
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error during fetch:", err);
        setError(err.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("useFetch triggered:", { url, enabled, useCache });
    if (enabled) {
      getData();
    }

    return () => {
      if (control.current) {
        console.log("Cleaning up fetch request");
        control.current.abort();
      }
    };
  }, [url, memoizedHeaders, enabled, useCache]);

  return { data, isLoading, error };
};


export default useFetch;
