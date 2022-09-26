import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const request = useCallback(async (url) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
};

export default useFetch;
