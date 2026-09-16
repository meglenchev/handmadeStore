import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from './apiClient';

// ---------------------------------------------------------------------------
// Mock factory helpers
// ---------------------------------------------------------------------------

/** Resolves with a successful JSON response. */
function mockFetchSuccess(data) {
    return vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: vi.fn().mockResolvedValue(data),
    });
}

/** Resolves with an HTTP-error response (ok: false) whose body carries a message. */
function mockFetchHttpError(status, statusText, body = null) {
    return vi.fn().mockResolvedValue({
        ok: false,
        status,
        statusText,
        json: vi.fn().mockResolvedValue(body),
    });
}

describe('apiClient', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    // -----------------------------------------------------------------------
    // Request construction
    // -----------------------------------------------------------------------
    describe('request construction', () => {
        it('apiGet calls fetch with the full URL, GET method and default headers', async () => {
            const fetchMock = mockFetchSuccess({ name: 'Test' });
            vi.stubGlobal('fetch', fetchMock);

            await apiGet('/api/products');

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/products', {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            });
        });

        it('apiPost sends the method, JSON-stringified body and default headers', async () => {
            const fetchMock = mockFetchSuccess({ _id: '1' });
            vi.stubGlobal('fetch', fetchMock);

            await apiPost('/api/products', { title: 'Vase' });

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/products', {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({ title: 'Vase' }),
            });
        });

        it('apiPut sends the method and JSON-stringified body', async () => {
            const fetchMock = mockFetchSuccess({ _id: '1' });
            vi.stubGlobal('fetch', fetchMock);

            await apiPut('/api/products/1', { title: 'Updated Vase' });

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/products/1', {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify({ title: 'Updated Vase' }),
            });
        });

        it('apiPatch sends the method and JSON-stringified body', async () => {
            const fetchMock = mockFetchSuccess({ _id: '1' });
            vi.stubGlobal('fetch', fetchMock);

            await apiPatch('/api/products/1', { title: 'Patched Vase' });

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/products/1', {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'PATCH',
                body: JSON.stringify({ title: 'Patched Vase' }),
            });
        });

        it('apiDelete sends the method without a body when none is given', async () => {
            const fetchMock = mockFetchSuccess(null);
            vi.stubGlobal('fetch', fetchMock);

            await apiDelete('/api/products/1');

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/products/1', {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'DELETE',
            });
        });

        it('apiDelete includes a JSON-stringified body when one is given', async () => {
            const fetchMock = mockFetchSuccess(null);
            vi.stubGlobal('fetch', fetchMock);

            await apiDelete('/api/cart/items', { productId: '1' });

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/cart/items', {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'DELETE',
                body: JSON.stringify({ productId: '1' }),
            });
        });

        it('merges custom headers on top of the default Content-Type', async () => {
            const fetchMock = mockFetchSuccess([]);
            vi.stubGlobal('fetch', fetchMock);

            await apiGet('/api/products', { headers: { Authorization: 'Bearer token' } });

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/products', {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer token' },
                method: 'GET',
            });
        });

        it('lets a custom header override the default Content-Type', async () => {
            const fetchMock = mockFetchSuccess([]);
            vi.stubGlobal('fetch', fetchMock);

            await apiGet('/api/products', { headers: { 'Content-Type': 'text/plain' } });

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/products', {
                credentials: 'include',
                headers: { 'Content-Type': 'text/plain' },
                method: 'GET',
            });
        });

        it('lets extra options (e.g. signal) pass through to fetch', async () => {
            const fetchMock = mockFetchSuccess([]);
            vi.stubGlobal('fetch', fetchMock);
            const controller = new AbortController();

            await apiGet('/api/products', { signal: controller.signal });

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/products', {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
                signal: controller.signal,
            });
        });

        it('lets options override the default credentials value', async () => {
            const fetchMock = mockFetchSuccess([]);
            vi.stubGlobal('fetch', fetchMock);

            await apiGet('/api/products', { credentials: 'omit' });

            expect(fetchMock).toHaveBeenCalledWith(
                'http://localhost:5000/api/products',
                expect.objectContaining({ credentials: 'omit' }),
            );
        });
    });

    // -----------------------------------------------------------------------
    // Successful responses
    // -----------------------------------------------------------------------
    describe('successful responses', () => {
        it('resolves with the parsed JSON body for apiGet', async () => {
            const products = [{ _id: '1', title: 'Ceramic Vase' }];
            vi.stubGlobal('fetch', mockFetchSuccess(products));

            await expect(apiGet('/api/products')).resolves.toEqual(products);
        });

        it('resolves with the parsed JSON body for apiPost', async () => {
            const created = { _id: '1', title: 'Vase' };
            vi.stubGlobal('fetch', mockFetchSuccess(created));

            await expect(apiPost('/api/products', { title: 'Vase' })).resolves.toEqual(created);
        });
    });

    // -----------------------------------------------------------------------
    // HTTP errors (ok: false)
    // -----------------------------------------------------------------------
    describe('HTTP errors (non-ok response)', () => {
        it('rejects with the server-provided message when the error body has one', async () => {
            vi.stubGlobal('fetch', mockFetchHttpError(400, 'Bad Request', { message: 'Title is required' }));

            await expect(apiPost('/api/products', {})).rejects.toThrow('Title is required');
        });

        it('falls back to "Error {status}: {statusText}" when the error body has no message', async () => {
            vi.stubGlobal('fetch', mockFetchHttpError(404, 'Not Found', null));

            await expect(apiGet('/api/products/missing')).rejects.toThrow('Error 404: Not Found');
        });

        it('falls back to "Error {status}: {statusText}" when the error body cannot be parsed as JSON', async () => {
            const fetchMock = vi.fn().mockResolvedValue({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: vi.fn().mockRejectedValue(new SyntaxError('Unexpected end of JSON input')),
            });
            vi.stubGlobal('fetch', fetchMock);

            await expect(apiGet('/api/products')).rejects.toThrow('Error 500: Internal Server Error');
        });

        it('attaches the response status as statusCode on the thrown error', async () => {
            vi.stubGlobal('fetch', mockFetchHttpError(422, 'Unprocessable Entity', null));

            try {
                await apiPost('/api/products', {});
                throw new Error('apiPost should have rejected');
            } catch (err) {
                expect(err.statusCode).toBe(422);
            }
        });
    });

    // -----------------------------------------------------------------------
    // Network errors
    // -----------------------------------------------------------------------
    describe('network errors', () => {
        it('propagates a rejection when fetch itself throws', async () => {
            vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Failed to fetch')));

            await expect(apiGet('/api/products')).rejects.toThrow('Failed to fetch');
        });
    });
});
