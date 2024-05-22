import { useState, useEffect } from 'react';
import axios from 'axios';

// Creamos una función que devuelve una instancia de Axios configurada
const createAxiosInstance = () => {
  const apiUrl = 'http://localhost:8000/api/'

  return axios.create({
    baseURL: apiUrl, // URL base para todas las solicitudes
    timeout: 5000, // Tiempo de espera para las solicitudes (en milisegundos)
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true, // Aseguramos que las credenciales se envíen
  });
};

// Creamos un hook personalizado para manejar las solicitudes con Axios
const useGetRequest = (initialUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = 'http://localhost:8000/api/'

  console.log("URL Inicial:", initialUrl, "\n", "URL Base:", apiUrl);
  useEffect(() => {
    if (!initialUrl) {
      throw new Error("La URL inicial no puede estar vacía");
    }

    const axiosInstance = createAxiosInstance();
    let source = axios.CancelToken.source(); // Crear fuente para cancelar la solicitud
    const authToken = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(initialUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Agregar el token al encabezado
          },
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

  console.log("data:", data)
  return { data, loading, error };
};

export default useGetRequest;
