const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request(urlPath, options = {}) {
    const response = await fetch(`${BASE_URL}${urlPath}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || `Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

export const apiGet = (urlPath, options) => request(urlPath, { method: 'GET', ...options });
export const apiPost = (urlPath, body, options) => request(urlPath, { method: 'POST', body: JSON.stringify(body), ...options });
export const apiPut = (urlPath, body, options) => request(urlPath, { method: 'PUT', body: JSON.stringify(body), ...options });
export const apiPatch = (urlPath, body, options) => request(urlPath, { method: 'PATCH', body: JSON.stringify(body), ...options });
export const apiDelete = (urlPath, options) => request(urlPath, { method: 'DELETE', ...options });
