import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('initial state', () => {
        it('returns the initialValue when localStorage is empty', () => {
            const { result } = renderHook(() => useLocalStorage('cart', []));
            expect(result.current[0]).toEqual([]);
        });

        it('defaults initialValue to an empty array when not provided', () => {
            const { result } = renderHook(() => useLocalStorage('cart'));
            expect(result.current[0]).toEqual([]);
        });

        it('returns the parsed value already stored in localStorage', () => {
            localStorage.setItem('cart', JSON.stringify([{ _id: '1' }]));

            const { result } = renderHook(() => useLocalStorage('cart', []));

            expect(result.current[0]).toEqual([{ _id: '1' }]);
        });

        it('falls back to initialValue and logs an error when stored JSON is corrupted', () => {
            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            localStorage.setItem('cart', '{not valid json');

            const { result } = renderHook(() => useLocalStorage('cart', []));

            expect(result.current[0]).toEqual([]);
            expect(errorSpy).toHaveBeenCalled();
        });
    });

    describe('setValue', () => {
        it('updates the returned state', () => {
            const { result } = renderHook(() => useLocalStorage('cart', []));

            act(() => result.current[1]([{ _id: '1' }]));

            expect(result.current[0]).toEqual([{ _id: '1' }]);
        });

        it('persists the new value to localStorage', () => {
            const { result } = renderHook(() => useLocalStorage('cart', []));

            act(() => result.current[1]([{ _id: '1' }]));

            expect(JSON.parse(localStorage.getItem('cart'))).toEqual([{ _id: '1' }]);
        });

        it('supports the functional updater form', () => {
            const { result } = renderHook(() => useLocalStorage('count', 0));

            act(() => result.current[1]((prev) => prev + 1));

            expect(result.current[0]).toBe(1);
        });
    });

    describe('persistence on mount', () => {
        it('writes the initial value to localStorage even before any update', () => {
            renderHook(() => useLocalStorage('cart', []));
            expect(JSON.parse(localStorage.getItem('cart'))).toEqual([]);
        });
    });

    describe('write errors', () => {
        it('logs an error and does not throw when localStorage.setItem fails', () => {
            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
                throw new Error('QuotaExceededError');
            });

            const { result } = renderHook(() => useLocalStorage('cart', []));

            expect(() => act(() => result.current[1]([{ _id: '1' }]))).not.toThrow();
            expect(errorSpy).toHaveBeenCalled();
        });
    });

    describe('key isolation', () => {
        it('uses independent storage per key', () => {
            const { result: cartResult } = renderHook(() => useLocalStorage('cart', []));
            const { result: wishlistResult } = renderHook(() => useLocalStorage('wishlist', []));

            act(() => cartResult.current[1]([{ _id: '1' }]));

            expect(cartResult.current[0]).toEqual([{ _id: '1' }]);
            expect(wishlistResult.current[0]).toEqual([]);
        });
    });
});
