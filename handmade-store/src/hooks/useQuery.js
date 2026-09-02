import { useCallback, useEffect, useState } from 'react';
import { apiGet } from '@/utils/apiClient.js';

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
                const result = await apiGet(urlPath, { signal: abortController.signal });

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
