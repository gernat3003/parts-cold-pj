import { useState, useEffect } from 'react';
import axios from 'axios';

// Creamos una función que devuelve una instancia de Axios configurada
const createAxiosInstance = () => {
  const apiUrl = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;

  return axios.create({
    baseURL: apiUrl, // URL base para todas las solicitudes
    timeout: 5000, // Tiempo de espera para las solicitudes (en milisegundos)
    headers: {
      'Content-Type': 'application/json', // Tipo de contenido para las solicitudes
    },
  });
};

// Creamos un hook personalizado para manejar las solicitudes con Axios
const useGetRequest = (initialUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialUrl) {
      throw new Error("La URL inicial no puede estar vacía");
    }

    const axiosInstance = createAxiosInstance();
    let source = axios.CancelToken.source(); // Crear fuente para cancelar la solicitud

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(initialUrl, {
          cancelToken: source.token // Pasar el token de cancelación
        });
        setData(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) { // Evitar establecer error si se cancela la solicitud
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Limpieza: Cancelar la petición si el componente se desmonta
    return () => {
      source.cancel("Solicitud cancelada por limpieza");
    };
  }, [initialUrl]);

  return { data, loading, error };
};

export default useGetRequest;
