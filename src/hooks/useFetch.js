import { useEffect, useRef, useState } from "react";

const useFetch = ({ url, headers = {}, enabled = true }) => {
  const control = useRef();
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const getData = async () => {
    if (control.current) {
      control.current.abort();
    }
    const controller = new AbortController();
    control.current = controller;
    setIsLoading(true);
    fetch(url, { signal: control.current.signal, headers: headers })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          `Unable to fetch page data! ${response.status} ${response.statusText}`
        );
      })
      .then((data) => {
        setData(data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(setError);
  };

  useEffect(() => {
    if (enabled) getData();

    return () => {
      if (control.current) control.current.abort();
    };
  }, []);

  return { getData, isLoading, error, data };
};

export default useFetch;
