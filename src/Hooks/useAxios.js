import { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    fetchDataRef.current = async (overrideConfig = {}) => {
      setLoading(true);
      setError('');
      console.log(overrideConfig)
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
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    if (config.url && config.method) {
      fetchDataRef.current({});
    }
  }, [config]);

  return { response, error, loading, setConfig, fetchData: fetchDataRef.current };
};

export default useAxios;
