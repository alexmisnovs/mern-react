import { useCallback, useState, useEffect, useRef } from "react";

export const useHttpFetchClient = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const activeHttpRequest = useRef([]); // store data accross re-render cycles

  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);
    // cancel request stuff for fetch
    const httpAbortController = new AbortController();
    activeHttpRequest.current.push(httpAbortController);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortController.signal, // cancel request stuff for fetch
      });
      const responseData = await response.json();

      // clearing old requests for fetch... God I miss Axios
      activeHttpRequest.current = activeHttpRequest.current.filter(
        reqController => reqController !== httpAbortController
      );

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };
  useEffect(() => {
    // cleanup
    return () => {
      activeHttpRequest.current.forEach(httpAbortController => httpAbortController.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
