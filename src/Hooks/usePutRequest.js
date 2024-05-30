import { useState } from 'react';
import axios from 'axios';

// Creamos una función que devuelve una instancia de Axios configurada
const createAxiosInstance = () => {
  const apiUrl = "https://coldparts.online/api"

  return axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

const usePutRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (url, data, token) => {
    setLoading(true);
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.put(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { putData, loading, error };
};

export default usePutRequest;
