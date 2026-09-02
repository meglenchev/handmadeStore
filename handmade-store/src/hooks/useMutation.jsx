import { useCallback, useState } from 'react';
import { apiPost, apiPut, apiPatch, apiDelete } from '@/utils/apiClient.js';

const mutationMethods = {
    POST: apiPost,
    PUT: apiPut,
    PATCH: apiPatch,
    DELETE: apiDelete,
};

export function useMutation(urlPath, method = 'POST') {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutate = useCallback(
        async (bodyData) => {
            const apiMethod = mutationMethods[method];

            if (!apiMethod) {
                throw new Error(`Unsupported HTTP method: ${method}`);
            }

            setLoading(true);
            setError(null);

            try {
                const result = await apiMethod(urlPath, bodyData);

                setData(result);
                return result;
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [urlPath, method]
    );

    return { data, loading, error, mutate };
}
