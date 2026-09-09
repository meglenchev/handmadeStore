import { useCallback, useEffect, useState, useRef } from 'react';
import { apiGet } from '@/utils/apiClient.js';

export function useQuery(urlPath, initialValue = null, { enabled = true } = {}) {
    const [data, setData] = useState(initialValue);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const hasFetchedRef = useRef(false); // Ref to track if the data has been fetched at least once

    const refresh = useCallback(() => {
        hasFetchedRef.current = false; // Reset the ref to allow re-fetching
        setRefreshTrigger((prev) => !prev);
    }, []);

    useEffect(() => {
        hasFetchedRef.current = false; // Reset the ref when the URL path changes
    }, [urlPath]);

    useEffect(() => {
        const abortController = new AbortController();
        if (!enabled || hasFetchedRef.current) {
            return; // Skip fetching if not enabled or already fetched
        }

        hasFetchedRef.current = true; // Mark that the data has been fetched at least once

        async function fetchData() {
            setLoading(true);
            setError(null);
            // setData(initialValue);

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
    }, [urlPath, refreshTrigger, enabled]);

    return { data, loading, error, refresh };
}
