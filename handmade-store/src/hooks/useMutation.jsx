import { useCallback, useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export function useMutation(urlPath, method = 'POST') {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutate = useCallback(
        async (bodyData) => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}${urlPath}`, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: bodyData ? JSON.stringify(bodyData) : undefined,
                });

                const result = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(result.message || `Error ${response.status}: ${response.statusText}`);
                }

                setData(result);
                return result;
            } catch (error) {
                setError(error.message);
                throw error;
            } finally {
                setLoading(false);
            }
        },
        [urlPath, method]
    );

    return { data, loading, error, mutate };
}
