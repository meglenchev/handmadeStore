import { renderHook, act } from '@testing-library/react';
import { useSlidesToShow } from './useSlidesToShow';

function setWindowWidth(width) {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
    });
}

function triggerResize() {
    act(() => {
        window.dispatchEvent(new Event('resize'));
    });
}

describe('useSlidesToShow', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('initial value based on window width', () => {
        it('returns 1 for width below 480px', () => {
            setWindowWidth(375);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(1);
        });

        it('returns 1 at the upper boundary of the first breakpoint (479px)', () => {
            setWindowWidth(479);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(1);
        });

        it('returns 2 at exactly 480px', () => {
            setWindowWidth(480);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(2);
        });

        it('returns 2 for width between 480px and 767px', () => {
            setWindowWidth(600);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(2);
        });

        it('returns 2 at the upper boundary of the second breakpoint (767px)', () => {
            setWindowWidth(767);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(2);
        });

        it('returns 3 at exactly 768px', () => {
            setWindowWidth(768);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(3);
        });

        it('returns 3 for width between 768px and 1023px', () => {
            setWindowWidth(900);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(3);
        });

        it('returns 3 at the upper boundary of the third breakpoint (1023px)', () => {
            setWindowWidth(1023);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(3);
        });

        it('returns 4 at exactly 1024px', () => {
            setWindowWidth(1024);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(4);
        });

        it('returns 4 for width above 1024px', () => {
            setWindowWidth(1440);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(4);
        });
    });

    describe('updates on resize', () => {
        it('updates from 1 to 2 when width crosses the 480px breakpoint', () => {
            setWindowWidth(400);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(1);

            setWindowWidth(600);
            triggerResize();
            expect(result.current).toBe(2);
        });

        it('updates from 2 to 3 when width crosses the 768px breakpoint', () => {
            setWindowWidth(600);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(2);

            setWindowWidth(900);
            triggerResize();
            expect(result.current).toBe(3);
        });

        it('updates from 3 to 4 when width crosses the 1024px breakpoint', () => {
            setWindowWidth(900);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(3);

            setWindowWidth(1280);
            triggerResize();
            expect(result.current).toBe(4);
        });

        it('updates downward when width decreases across a breakpoint', () => {
            setWindowWidth(1280);
            const { result } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(4);

            setWindowWidth(400);
            triggerResize();
            expect(result.current).toBe(1);
        });
    });

    describe('event listener lifecycle', () => {
        it('removes the resize listener on unmount', () => {
            const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
            setWindowWidth(1024);

            const { unmount } = renderHook(() => useSlidesToShow());
            unmount();

            expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        });

        it('does not update state after unmount', () => {
            setWindowWidth(1024);
            const { result, unmount } = renderHook(() => useSlidesToShow());
            expect(result.current).toBe(4);

            unmount();

            setWindowWidth(400);
            act(() => {
                window.dispatchEvent(new Event('resize'));
            });

            expect(result.current).toBe(4);
        });
    });
});
