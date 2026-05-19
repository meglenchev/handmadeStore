import { render, renderHook, act } from '@testing-library/react';
import { useSticky } from './useSticky';

describe('useSticky', () => {
    let observerCallback;
    let observeMock;
    let disconnectMock;

    beforeEach(() => {
        observeMock = vi.fn();
        disconnectMock = vi.fn();

        vi.stubGlobal(
            'IntersectionObserver',
            vi.fn(function MockIO(callback) {
                observerCallback = callback;
                this.observe = observeMock;
                this.disconnect = disconnectMock;
            })
        );
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('returns isSticky as false initially', () => {
        const { result } = renderHook(() => useSticky());
        expect(result.current.isSticky).toBe(false);
    });

    it('returns a sentinelRef object with a current property', () => {
        const { result } = renderHook(() => useSticky());
        expect(result.current.sentinelRef).toBeDefined();
        expect(result.current.sentinelRef).toHaveProperty('current');
    });

    it('creates IntersectionObserver with threshold of 1', () => {
        renderHook(() => useSticky());
        expect(IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
            threshold: [1],
        });
    });

    it('sets isSticky to true when sentinel is not intersecting', () => {
        const { result } = renderHook(() => useSticky());

        act(() => observerCallback([{ isIntersecting: false }]));

        expect(result.current.isSticky).toBe(true);
    });

    it('sets isSticky to false when sentinel is intersecting', () => {
        const { result } = renderHook(() => useSticky());

        act(() => observerCallback([{ isIntersecting: false }]));
        expect(result.current.isSticky).toBe(true);

        act(() => observerCallback([{ isIntersecting: true }]));
        expect(result.current.isSticky).toBe(false);
    });

    it('calls observe with the sentinel DOM element when ref is attached', () => {
        function SentinelWrapper() {
            const { sentinelRef } = useSticky();
            return <div ref={sentinelRef} />;
        }

        render(<SentinelWrapper />);

        expect(observeMock).toHaveBeenCalledTimes(1);
        expect(observeMock).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('does not call observe when sentinelRef is not attached to a DOM element', () => {
        renderHook(() => useSticky());
        expect(observeMock).not.toHaveBeenCalled();
    });

    it('disconnects the observer on unmount', () => {
        const { unmount } = renderHook(() => useSticky());
        unmount();
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
