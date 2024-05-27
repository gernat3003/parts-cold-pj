import { useState, useEffect } from 'react';
import axios from 'axios';
const useAxios = ({ url, method, body = null, responseType = 'json' }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const authToken = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    console.log(url)
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios({
                method: method,
                url: `http://localhost:8000/api/${url}`,
                data: body,
                responseType: responseType,
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                withCredentials: true,
                cancelToken: source.token
            });
            setResponse(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!['get', 'post', 'put', 'delete'].includes(method.toLowerCase())) {
            console.error('Invalid HTTP method');
            return;
        }
        fetchData();

        return () => {
            source.cancel('Request canceled by cleanup');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [method, url, body, responseType]);
    return { response, error, loading };
};

export default useAxios;
