import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('returns the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial'));
        expect(result.current).toBe('initial');
    });

    it('does not update the value before the delay elapses', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
            initialProps: { value: 'a' },
        });

        rerender({ value: 'b' });
        act(() => vi.advanceTimersByTime(499));

        expect(result.current).toBe('a');
    });

    it('updates to the latest value after the default delay (500ms)', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
            initialProps: { value: 'a' },
        });

        rerender({ value: 'b' });
        act(() => vi.advanceTimersByTime(500));

        expect(result.current).toBe('b');
    });

    it('respects a custom delay', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
            initialProps: { value: 'a' },
        });

        rerender({ value: 'b' });
        act(() => vi.advanceTimersByTime(999));
        expect(result.current).toBe('a');

        act(() => vi.advanceTimersByTime(1));
        expect(result.current).toBe('b');
    });

    it('resets the timer when the value changes again before the delay elapses', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
            initialProps: { value: 'a' },
        });

        rerender({ value: 'b' });
        act(() => vi.advanceTimersByTime(300));

        rerender({ value: 'c' });
        act(() => vi.advanceTimersByTime(300));
        // Only 300ms have passed since 'c' was set — not yet the full 500ms delay.
        expect(result.current).toBe('a');

        act(() => vi.advanceTimersByTime(200));
        expect(result.current).toBe('c');
    });

    it('clears the pending timeout on unmount', () => {
        const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
        const { unmount } = renderHook(() => useDebounce('a'));

        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalled();
    });
});
