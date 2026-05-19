import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

function mockMatchMedia(matches) {
    const listeners = [];
    const media = {
        matches,
        addEventListener: vi.fn((_, listener) => listeners.push(listener)),
        removeEventListener: vi.fn((_, listener) => {
            const idx = listeners.indexOf(listener);
            if (idx !== -1) listeners.splice(idx, 1);
        }),
        trigger: (newMatches) => {
            media.matches = newMatches;
            listeners.forEach((l) => l());
        },
    };
    window.matchMedia = vi.fn(() => media);
    return media;
}

describe('useMediaQuery', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns false when query does not match initially', () => {
        mockMatchMedia(false);
        const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
        expect(result.current).toBe(false);
    });

    it('returns true when query matches initially', () => {
        mockMatchMedia(true);
        const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
        expect(result.current).toBe(true);
    });

    it('updates when media query match changes', () => {
        const media = mockMatchMedia(false);
        const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

        expect(result.current).toBe(false);

        act(() => media.trigger(true));
        expect(result.current).toBe(true);

        act(() => media.trigger(false));
        expect(result.current).toBe(false);
    });

    it('removes event listener on unmount', () => {
        const media = mockMatchMedia(false);
        const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));

        unmount();

        expect(media.removeEventListener).toHaveBeenCalled();
    });

    it('re-subscribes when query string changes', () => {
        mockMatchMedia(false);
        const { rerender } = renderHook(({ q }) => useMediaQuery(q), {
            initialProps: { q: '(min-width: 768px)' },
        });

        rerender({ q: '(min-width: 1024px)' });

        expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)');
        expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 1024px)');
    });
});
