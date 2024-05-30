import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (initialConfig) => {
  const [config, setConfig] = useState(initialConfig);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const BASE_URL = "https://coldparts.online/api"; // URL base por defecto

  const fetchData = async (overrideConfig = {}) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios({
        ...config,
        ...overrideConfig,
        url: `${BASE_URL}${overrideConfig.url || config.url}`, // Concatenar la URL base con la URL de la configuración
        headers: {
          ...config.headers,
          ...overrideConfig.headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true,
        data: overrideConfig.data || config.data, // Asegúrate de que estás pasando los datos aquí
        maxContentLength: 50 * 1024 * 1024, // 50MB
        maxBodyLength: 50 * 1024 * 1024, // 50MB
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.message || 'ocurrio un error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (config.url && config.method) {
      fetchData({});
    }
  }, [config]);

  return { response, error, loading, setConfig, fetchData };
};

export default useAxios;
