import { renderHook } from '@testing-library/react';
import { useAutoCloseEmptyMenu } from './useAutoCloseEmptyMenu';

describe('useAutoCloseEmptyMenu', () => {
    let toggleMenu;

    beforeEach(() => {
        vi.useFakeTimers();
        toggleMenu = vi.fn();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('does not schedule close when menu is open but has items', () => {
        renderHook(() =>
            useAutoCloseEmptyMenu(['item1'], true, 'cart', toggleMenu)
        );
        vi.runAllTimers();
        expect(toggleMenu).not.toHaveBeenCalled();
    });

    it('does not schedule close when menu is closed and has no items', () => {
        renderHook(() =>
            useAutoCloseEmptyMenu([], false, 'cart', toggleMenu)
        );
        vi.runAllTimers();
        expect(toggleMenu).not.toHaveBeenCalled();
    });

    it('does not schedule close when menu is closed and has items', () => {
        renderHook(() =>
            useAutoCloseEmptyMenu(['item1'], false, 'cart', toggleMenu)
        );
        vi.runAllTimers();
        expect(toggleMenu).not.toHaveBeenCalled();
    });

    it('calls toggleMenu(menuName) after default delay when empty and open', () => {
        renderHook(() =>
            useAutoCloseEmptyMenu([], true, 'cart', toggleMenu)
        );

        expect(toggleMenu).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1500);

        expect(toggleMenu).toHaveBeenCalledWith('cart');
        expect(toggleMenu).toHaveBeenCalledTimes(1);
    });

    it('does not fire before the default delay elapses', () => {
        renderHook(() =>
            useAutoCloseEmptyMenu([], true, 'cart', toggleMenu)
        );

        vi.advanceTimersByTime(1499);
        expect(toggleMenu).not.toHaveBeenCalled();
    });

    it('calls toggleMenu after a custom delay', () => {
        renderHook(() =>
            useAutoCloseEmptyMenu([], true, 'wishlist', toggleMenu, 3000)
        );

        vi.advanceTimersByTime(2999);
        expect(toggleMenu).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(toggleMenu).toHaveBeenCalledTimes(1);
    });

    it('cancels the timer when an item is added before delay elapses', () => {
        const { rerender } = renderHook(
            ({ items }) => useAutoCloseEmptyMenu(items, true, 'cart', toggleMenu),
            { initialProps: { items: [] } }
        );

        vi.advanceTimersByTime(1000);
        rerender({ items: ['newItem'] });
        vi.runAllTimers();

        expect(toggleMenu).not.toHaveBeenCalled();
    });

    it('cancels the timer when menu closes before delay elapses', () => {
        const { rerender } = renderHook(
            ({ isOpen }) => useAutoCloseEmptyMenu([], isOpen, 'cart', toggleMenu),
            { initialProps: { isOpen: true } }
        );

        vi.advanceTimersByTime(1000);
        rerender({ isOpen: false });
        vi.runAllTimers();

        expect(toggleMenu).not.toHaveBeenCalled();
    });

    it('passes the correct menuName to toggleMenu', () => {
        renderHook(() =>
            useAutoCloseEmptyMenu([], true, 'favorites', toggleMenu)
        );

        vi.advanceTimersByTime(1500);

        expect(toggleMenu).toHaveBeenCalledWith('favorites');
    });
});
