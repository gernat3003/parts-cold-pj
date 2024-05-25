import { useState, useEffect } from 'react';
import axios from 'axios';

const createAxiosInstance = () => {
  const apiUrl = 'http://localhost:8000/api/'

  return axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });
};

const useGetRequest = (initialUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!initialUrl) {
      throw new Error("La URL inicial no puede estar vacía");
    }

    const axiosInstance = createAxiosInstance();
    let source = axios.CancelToken.source();
    const authToken = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(initialUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          cancelToken: source.token
        });
        setData(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel("Solicitud cancelada por limpieza");
    };
  }, [initialUrl]);

  return { data, loading, error };
};

export default useGetRequest;
