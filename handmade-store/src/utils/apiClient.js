const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const NETWORK_ERROR_MESSAGE = 'Няма връзка със сървъра. Опитайте отново по-късно.';
const SERVER_ERROR_MESSAGE = 'Грешка в сървъра. Опитайте отново по-късно.';
const GENERIC_ERROR_MESSAGE = 'Възникна грешка. Опитайте отново.';

async function request(urlPath, options = {}) {
    let response;

    try {
        response = await fetch(`${BASE_URL}${urlPath}`, {
            credentials: 'include',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
    } catch (err) {
        if (err.name === 'AbortError') throw err;

        const networkError = new Error(NETWORK_ERROR_MESSAGE, { cause: err });
        networkError.statusCode = 0;
        throw networkError;
    }

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        if (import.meta.env.DEV && response.status >= 500) {
            console.error('API error:', response.status, errorBody);
        }

        const message =
            response.status >= 500
                ? SERVER_ERROR_MESSAGE
                : errorBody?.message || GENERIC_ERROR_MESSAGE;

        const err = new Error(message);
        err.statusCode = response.status;
        throw err;
    }

    if (response.status === 204) return null;

    return response.json();
}

export const apiGet = (urlPath, options) => request(urlPath, { method: 'GET', ...options });
export const apiPost = (urlPath, body, options) =>
    request(urlPath, { method: 'POST', body: JSON.stringify(body), ...options });
export const apiPut = (urlPath, body, options) =>
    request(urlPath, { method: 'PUT', body: JSON.stringify(body), ...options });
export const apiPatch = (urlPath, body, options) =>
    request(urlPath, { method: 'PATCH', body: JSON.stringify(body), ...options });
export const apiDelete = (urlPath, body, options) =>
    request(urlPath, {
        method: 'DELETE',
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        ...options,
    });
