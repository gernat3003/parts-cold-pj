import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const useAxios = (initialConfig) => {
  const [config, setConfig] = useState(initialConfig);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const BASE_URL = "https://coldparts.online/api/";

  const fetchDataRef = useRef(null);

  const fetchData = useCallback(async (overrideConfig = {}) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios({
        ...config,
        ...overrideConfig,
        url: `${BASE_URL}${overrideConfig.url || config.url}`,
        headers: {
          ...config.headers,
          ...overrideConfig.headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true,
        data: overrideConfig.data || config.data,
        maxContentLength: 50 * 1024 * 1024,
        maxBodyLength: 50 * 1024 * 1024,
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.message || 'ocurrio un error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  useEffect(() => {
    if (config.url && config.method) {
      fetchData({});
    }
  }, [config, fetchData]);

  return { response, error, loading, setConfig, fetchData };
};

export default useAxios;
