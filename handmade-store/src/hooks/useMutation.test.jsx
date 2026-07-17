import { renderHook, act } from '@testing-library/react';
import { useMutation } from './useMutation';

// ---------------------------------------------------------------------------
// Mock factory helpers (mirrors useQuery.test.js conventions)
// ---------------------------------------------------------------------------

function mockFetchSuccess(data, status = 200) {
    return vi.fn().mockResolvedValue({
        ok: true,
        status,
        statusText: 'OK',
        json: vi.fn().mockResolvedValue(data),
    });
}

function mockFetchHttpError(status, statusText, body = {}) {
    return vi.fn().mockResolvedValue({
        ok: false,
        status,
        statusText,
        json: vi.fn().mockResolvedValue(body),
    });
}

function mockFetchNetworkError(message = 'Network error') {
    return vi.fn().mockRejectedValue(new Error(message));
}

// ---------------------------------------------------------------------------

describe('useMutation', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('initial state', () => {
        it('starts with data=null, loading=false and error=null', () => {
            vi.stubGlobal('fetch', vi.fn());
            const { result } = renderHook(() => useMutation('/api/products'));

            expect(result.current.data).toBeNull();
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
        });

        it('exposes a stable mutate reference across re-renders', () => {
            vi.stubGlobal('fetch', vi.fn());
            const { result, rerender } = renderHook(() => useMutation('/api/products'));

            const firstRef = result.current.mutate;
            rerender();

            expect(result.current.mutate).toBe(firstRef);
        });
    });

    describe('request construction', () => {
        it('defaults to a POST request', async () => {
            const fetchMock = mockFetchSuccess({ ok: true });
            vi.stubGlobal('fetch', fetchMock);
            const { result } = renderHook(() => useMutation('/api/orders'));

            await act(async () => {
                await result.current.mutate({ productId: '1' });
            });

            expect(fetchMock).toHaveBeenCalledWith(
                'http://localhost:5000/api/orders',
                expect.objectContaining({ method: 'POST' })
            );
        });

        it('uses a custom method when provided', async () => {
            const fetchMock = mockFetchSuccess({ ok: true });
            vi.stubGlobal('fetch', fetchMock);
            const { result } = renderHook(() => useMutation('/api/orders/1', 'PUT'));

            await act(async () => {
                await result.current.mutate({ status: 'shipped' });
            });

            expect(fetchMock).toHaveBeenCalledWith(
                'http://localhost:5000/api/orders/1',
                expect.objectContaining({ method: 'PUT' })
            );
        });

        it('sends the JSON-stringified body with the correct headers and credentials', async () => {
            const fetchMock = mockFetchSuccess({ ok: true });
            vi.stubGlobal('fetch', fetchMock);
            const { result } = renderHook(() => useMutation('/api/orders'));

            await act(async () => {
                await result.current.mutate({ productId: '1' });
            });

            expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: '1' }),
            });
        });

        it('sends an undefined body when mutate is called without arguments', async () => {
            const fetchMock = mockFetchSuccess({ ok: true });
            vi.stubGlobal('fetch', fetchMock);
            const { result } = renderHook(() => useMutation('/api/orders'));

            await act(async () => {
                await result.current.mutate();
            });

            expect(fetchMock).toHaveBeenCalledWith(
                'http://localhost:5000/api/orders',
                expect.objectContaining({ body: undefined })
            );
        });
    });

    describe('loading state', () => {
        it('is true while the request is in flight and false afterwards', async () => {
            let resolveFetch;
            vi.stubGlobal(
                'fetch',
                vi.fn().mockReturnValue(
                    new Promise((res) => {
                        resolveFetch = res;
                    })
                )
            );

            const { result } = renderHook(() => useMutation('/api/orders'));

            let mutatePromise;
            act(() => {
                mutatePromise = result.current.mutate({});
            });

            expect(result.current.loading).toBe(true);

            await act(async () => {
                resolveFetch({ ok: true, json: vi.fn().mockResolvedValue({}) });
                await mutatePromise;
            });

            expect(result.current.loading).toBe(false);
        });
    });

    describe('successful mutation', () => {
        it('sets data and returns the parsed result', async () => {
            const responseBody = { _id: '1', status: 'created' };
            vi.stubGlobal('fetch', mockFetchSuccess(responseBody));

            const { result } = renderHook(() => useMutation('/api/orders'));

            let returned;
            await act(async () => {
                returned = await result.current.mutate({});
            });

            expect(result.current.data).toEqual(responseBody);
            expect(returned).toEqual(responseBody);
            expect(result.current.error).toBeNull();
        });
    });

    describe('HTTP errors', () => {
        it('sets error to the server message when the response body has one', async () => {
            vi.stubGlobal('fetch', mockFetchHttpError(400, 'Bad Request', { message: 'Invalid product id' }));
            const { result } = renderHook(() => useMutation('/api/orders'));

            await act(async () => {
                await expect(result.current.mutate({})).rejects.toThrow('Invalid product id');
            });

            expect(result.current.error).toBe('Invalid product id');
        });

        it('falls back to a generic status message when the response body has no message', async () => {
            vi.stubGlobal('fetch', mockFetchHttpError(500, 'Internal Server Error', {}));
            const { result } = renderHook(() => useMutation('/api/orders'));

            await act(async () => {
                await expect(result.current.mutate({})).rejects.toThrow('Error 500: Internal Server Error');
            });

            expect(result.current.error).toBe('Error 500: Internal Server Error');
        });

        it('treats an unparsable JSON error body as an empty object', async () => {
            const fetchMock = vi.fn().mockResolvedValue({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: vi.fn().mockRejectedValue(new Error('invalid json')),
            });
            vi.stubGlobal('fetch', fetchMock);

            const { result } = renderHook(() => useMutation('/api/orders'));

            await act(async () => {
                await expect(result.current.mutate({})).rejects.toThrow('Error 500: Internal Server Error');
            });
        });
    });

    describe('network errors', () => {
        it('sets error and rethrows when fetch rejects', async () => {
            vi.stubGlobal('fetch', mockFetchNetworkError('Failed to fetch'));
            const { result } = renderHook(() => useMutation('/api/orders'));

            await act(async () => {
                await expect(result.current.mutate({})).rejects.toThrow('Failed to fetch');
            });

            expect(result.current.error).toBe('Failed to fetch');
        });

        it('clears a previous error on the next successful mutate call', async () => {
            const fetchMock = vi
                .fn()
                .mockRejectedValueOnce(new Error('Network down'))
                .mockResolvedValueOnce({ ok: true, json: vi.fn().mockResolvedValue({ ok: true }) });

            vi.stubGlobal('fetch', fetchMock);
            const { result } = renderHook(() => useMutation('/api/orders'));

            await act(async () => {
                await expect(result.current.mutate({})).rejects.toThrow('Network down');
            });
            expect(result.current.error).toBe('Network down');

            await act(async () => {
                await result.current.mutate({});
            });

            expect(result.current.error).toBeNull();
        });
    });

    describe('urlPath / method changes', () => {
        it('creates a new mutate reference when urlPath changes', () => {
            vi.stubGlobal('fetch', vi.fn());
            const { result, rerender } = renderHook(({ path }) => useMutation(path), {
                initialProps: { path: '/api/orders' },
            });

            const firstRef = result.current.mutate;
            rerender({ path: '/api/carts' });

            expect(result.current.mutate).not.toBe(firstRef);
        });
    });
});
