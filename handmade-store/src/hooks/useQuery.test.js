import { renderHook, waitFor, act } from '@testing-library/react';
import { useQuery } from './useQuery';

// ---------------------------------------------------------------------------
// Mock factory helpers
// ---------------------------------------------------------------------------

/** Resolves with a successful JSON response. */
function mockFetchSuccess(data, status = 200) {
    return vi.fn().mockResolvedValue({
        ok: true,
        status,
        statusText: 'OK',
        json: vi.fn().mockResolvedValue(data),
    });
}

/** Resolves with an HTTP-error response (ok: false). */
function mockFetchHttpError(status, statusText) {
    return vi.fn().mockResolvedValue({
        ok: false,
        status,
        statusText,
        json: vi.fn(),
    });
}

/** Rejects immediately, simulating a network failure. */
function mockFetchNetworkError(message = 'Network error') {
    return vi.fn().mockRejectedValue(new Error(message));
}

/** Returns a promise that never resolves, keeping the hook in the loading state. */
const pendingFetch = () => vi.fn().mockReturnValue(new Promise(() => {}));

// ---------------------------------------------------------------------------

describe('useQuery', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    // -----------------------------------------------------------------------
    // 1. Initial state
    // -----------------------------------------------------------------------
    describe('initial state', () => {
        it('starts with loading=true, data=null and error=null', () => {
            vi.stubGlobal('fetch', pendingFetch());

            const { result } = renderHook(() => useQuery('/api/products'));

            expect(result.current.loading).toBe(true);
            expect(result.current.data).toBeNull();
            expect(result.current.error).toBeNull();
        });

        it('uses a custom initialValue for data before the first fetch completes', () => {
            vi.stubGlobal('fetch', pendingFetch());

            const { result } = renderHook(() => useQuery('/api/products', []));

            expect(result.current.data).toEqual([]);
        });

        it('exposes a refresh function from the start', () => {
            vi.stubGlobal('fetch', pendingFetch());

            const { result } = renderHook(() => useQuery('/api/products'));

            expect(typeof result.current.refresh).toBe('function');
        });
    });

    // -----------------------------------------------------------------------
    // 2. Successful fetch
    // -----------------------------------------------------------------------
    describe('successful fetch', () => {
        it('sets data and clears loading after a successful response', async () => {
            const products = [{ _id: '1', title: 'Ceramic Vase' }];
            vi.stubGlobal('fetch', mockFetchSuccess(products));

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.data).toEqual(products);
            expect(result.current.error).toBeNull();
        });

        it('calls fetch with the correct full URL and an AbortSignal', async () => {
            const fetchMock = mockFetchSuccess([]);
            vi.stubGlobal('fetch', fetchMock);

            renderHook(() => useQuery('/api/products'));

            await waitFor(() =>
                expect(fetchMock).toHaveBeenCalledWith(
                    'http://localhost:5000/api/products',
                    expect.objectContaining({ signal: expect.any(AbortSignal) }),
                ),
            );
        });

        it('keeps error=null on a successful fetch', async () => {
            vi.stubGlobal('fetch', mockFetchSuccess({ name: 'Test' }));

            const { result } = renderHook(() => useQuery('/api/item'));

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.error).toBeNull();
        });
    });

    // -----------------------------------------------------------------------
    // 3. HTTP errors (non-ok response)
    // -----------------------------------------------------------------------
    describe('HTTP errors (non-ok response)', () => {
        it('sets error with status and statusText for a 404 response', async () => {
            vi.stubGlobal('fetch', mockFetchHttpError(404, 'Not Found'));

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.error).toBe('Error 404: Not Found');
            expect(result.current.data).toBeNull();
        });

        it('sets error with status and statusText for a 500 response', async () => {
            vi.stubGlobal('fetch', mockFetchHttpError(500, 'Internal Server Error'));

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.error).toBe('Error 500: Internal Server Error');
        });

        it('does not overwrite data from a previous successful fetch on error', async () => {
            const firstData = [{ _id: '1', title: 'Vase' }];

            const fetchMock = vi.fn()
                .mockResolvedValueOnce({ ok: true, json: vi.fn().mockResolvedValue(firstData) })
                .mockResolvedValueOnce({ ok: false, status: 500, statusText: 'Internal Server Error' });

            vi.stubGlobal('fetch', fetchMock);

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.data).toEqual(firstData));

            act(() => result.current.refresh());

            await waitFor(() => expect(result.current.error).toBe('Error 500: Internal Server Error'));
            // Data is retained from the last successful fetch
            expect(result.current.data).toEqual(firstData);
        });
    });

    // -----------------------------------------------------------------------
    // 4. Network errors
    // -----------------------------------------------------------------------
    describe('network errors', () => {
        it('sets error when fetch throws', async () => {
            vi.stubGlobal('fetch', mockFetchNetworkError('Failed to fetch'));

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.error).toBe('Failed to fetch');
            expect(result.current.data).toBeNull();
        });

        it('clears a previous error when the next fetch succeeds', async () => {
            const products = [{ _id: '1', title: 'Vase' }];

            const fetchMock = vi.fn()
                .mockRejectedValueOnce(new Error('Network down'))
                .mockResolvedValueOnce({ ok: true, json: vi.fn().mockResolvedValue(products) });

            vi.stubGlobal('fetch', fetchMock);

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.error).toBe('Network down'));

            act(() => result.current.refresh());

            await waitFor(() => expect(result.current.error).toBeNull());
            expect(result.current.data).toEqual(products);
        });
    });

    // -----------------------------------------------------------------------
    // 5. Cleanup on unmount (AbortError is ignored)
    // -----------------------------------------------------------------------
    describe('cleanup on unmount', () => {
        it('calls AbortController.abort() when the component unmounts', () => {
            const abortSpy = vi.spyOn(AbortController.prototype, 'abort');
            vi.stubGlobal('fetch', pendingFetch());

            const { unmount } = renderHook(() => useQuery('/api/products'));
            unmount();

            expect(abortSpy).toHaveBeenCalled();
        });

        it('does not set error state when the fetch is aborted (AbortError is swallowed)', async () => {
            const abortError = new DOMException('The user aborted a request.', 'AbortError');
            vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abortError));

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.loading).toBe(false));

            expect(result.current.error).toBeNull();
        });
    });

    // -----------------------------------------------------------------------
    // 6. refresh()
    // -----------------------------------------------------------------------
    describe('refresh()', () => {
        it('triggers a second fetch when called', async () => {
            const fetchMock = mockFetchSuccess([]);
            vi.stubGlobal('fetch', fetchMock);

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.loading).toBe(false));
            expect(fetchMock).toHaveBeenCalledTimes(1);

            act(() => result.current.refresh());

            await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
        });

        it('updates data with the fresh response after refresh', async () => {
            const firstData  = [{ _id: '1', title: 'Vase' }];
            const secondData = [{ _id: '1', title: 'Vase' }, { _id: '2', title: 'Bowl' }];

            const fetchMock = vi.fn()
                .mockResolvedValueOnce({ ok: true, json: vi.fn().mockResolvedValue(firstData) })
                .mockResolvedValueOnce({ ok: true, json: vi.fn().mockResolvedValue(secondData) });

            vi.stubGlobal('fetch', fetchMock);

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.data).toEqual(firstData));

            act(() => result.current.refresh());

            await waitFor(() => expect(result.current.data).toEqual(secondData));
        });

        it('re-enters the loading state while the refreshed request is in-flight', async () => {
            let resolveSecond;
            const fetchMock = vi.fn()
                .mockResolvedValueOnce({ ok: true, json: vi.fn().mockResolvedValue([]) })
                .mockReturnValueOnce(new Promise((res) => { resolveSecond = res; }));

            vi.stubGlobal('fetch', fetchMock);

            const { result } = renderHook(() => useQuery('/api/products'));

            await waitFor(() => expect(result.current.loading).toBe(false));

            act(() => result.current.refresh());

            expect(result.current.loading).toBe(true);

            // Clean up — resolve the pending promise so no unhandled rejection occurs.
            await act(async () => {
                resolveSecond({ ok: true, json: vi.fn().mockResolvedValue([]) });
            });
        });

        it('has a stable reference across re-renders', async () => {
            vi.stubGlobal('fetch', mockFetchSuccess([]));

            const { result, rerender } = renderHook(() => useQuery('/api/products'));

            const firstRef = result.current.refresh;
            rerender();

            expect(result.current.refresh).toBe(firstRef);
        });
    });

    // -----------------------------------------------------------------------
    // 7. urlPath changes
    // -----------------------------------------------------------------------
    describe('urlPath changes', () => {
        it('re-fetches when the urlPath prop changes', async () => {
            const fetchMock = mockFetchSuccess([]);
            vi.stubGlobal('fetch', fetchMock);

            const { rerender } = renderHook(({ path }) => useQuery(path), {
                initialProps: { path: '/api/products' },
            });

            await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

            rerender({ path: '/api/specials' });

            await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
        });

        it('uses the new URL when fetching after a path change', async () => {
            const fetchMock = mockFetchSuccess([]);
            vi.stubGlobal('fetch', fetchMock);

            const { rerender } = renderHook(({ path }) => useQuery(path), {
                initialProps: { path: '/api/products' },
            });

            await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

            rerender({ path: '/api/specials' });

            await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
            expect(fetchMock).toHaveBeenLastCalledWith(
                'http://localhost:5000/api/specials',
                expect.objectContaining({ signal: expect.any(AbortSignal) }),
            );
        });

        it('enters the loading state while the new path is being fetched', async () => {
            const fetchMock = vi.fn()
                .mockResolvedValueOnce({ ok: true, json: vi.fn().mockResolvedValue([{ _id: '1' }]) })
                .mockReturnValue(new Promise(() => {})); // second call stays pending

            vi.stubGlobal('fetch', fetchMock);

            const { result, rerender } = renderHook(({ path }) => useQuery(path), {
                initialProps: { path: '/api/products' },
            });

            await waitFor(() => expect(result.current.loading).toBe(false));

            rerender({ path: '/api/specials' });

            expect(result.current.loading).toBe(true);
        });
    });
});
