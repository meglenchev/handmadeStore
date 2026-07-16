import { useEffect } from 'react';

export function useAutoCloseEmptyMenu(items, isOpen, menuName, toggleMenu, delay = 1500) {
    useEffect(() => {
        if (items.length === 0 && isOpen) {
            const timer = setTimeout(() => {
                toggleMenu(menuName);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [items.length, isOpen, menuName, toggleMenu, delay]);
}
