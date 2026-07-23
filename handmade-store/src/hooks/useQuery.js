import { useCallback, useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export function useQuery(urlPath, initialValue = null) {
    const [data, setData] = useState(initialValue);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const refresh = useCallback(() => {
        setRefreshTrigger((prev) => !prev);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchData() {
            setLoading(true);
            setError(null);
            setData(initialValue);

            // Simulate a delay for demonstration purposes (optional)
            // await new Promise((resolve) => setTimeout(resolve, 3000));

            try {
                const response = await fetch(`${BASE_URL}${urlPath}`, { signal: abortController.signal });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();

                if (!abortController.signal.aborted) {
                    setData(result);
                    setError(null);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError(error.message);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [urlPath, refreshTrigger]);

    return { data, loading, error, refresh };
}
