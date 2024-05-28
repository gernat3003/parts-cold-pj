import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (initialConfig) => {
    const [config, setConfig] = useState(initialConfig);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const BASE_URL = process.env.REACT_APP_API_URL; // URL base por defecto

    const fetchData = async (overrideConfig) => {
        setLoading(true);
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
            });
            setResponse(res.data);
        } catch (err) {
            setError(err);
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
