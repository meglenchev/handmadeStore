import { renderHook, act } from '@testing-library/react';
import { useProductQuantity } from './useProductQuantity';

describe('useProductQuantity', () => {
    let alertSpy;

    beforeEach(() => {
        alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('initial quantity', () => {
        it('defaults to 1 when there is no productData', () => {
            const { result } = renderHook(() => useProductQuantity(null, []));
            expect(result.current.quantity).toBe(1);
        });

        it('defaults to 1 when productData is not in the cart', () => {
            const productData = { _id: 'p1', stock: 5 };
            const { result } = renderHook(() => useProductQuantity(productData, []));
            expect(result.current.quantity).toBe(1);
        });

        it('picks up the quantity of a matching cart item', () => {
            const productData = { _id: 'p1', stock: 5 };
            const cart = [{ _id: 'p1', quantity: 3 }];

            const { result } = renderHook(() => useProductQuantity(productData, cart));

            expect(result.current.quantity).toBe(3);
        });

        it('ignores cart items with a different _id', () => {
            const productData = { _id: 'p1', stock: 5 };
            const cart = [{ _id: 'other', quantity: 3 }];

            const { result } = renderHook(() => useProductQuantity(productData, cart));

            expect(result.current.quantity).toBe(1);
        });

        it('handles an undefined cart gracefully', () => {
            const productData = { _id: 'p1', stock: 5 };
            const { result } = renderHook(() => useProductQuantity(productData, undefined));

            expect(result.current.quantity).toBe(1);
        });
    });

    describe('reacting to prop changes', () => {
        it('updates quantity when the matching cart item changes', () => {
            const productData = { _id: 'p1', stock: 5 };
            const { result, rerender } = renderHook(
                ({ product, cart }) => useProductQuantity(product, cart),
                { initialProps: { product: productData, cart: [{ _id: 'p1', quantity: 2 }] } }
            );

            expect(result.current.quantity).toBe(2);

            rerender({ product: productData, cart: [{ _id: 'p1', quantity: 4 }] });

            expect(result.current.quantity).toBe(4);
        });

        it('resets to 1 when switching to a product that is not in the cart', () => {
            const productA = { _id: 'p1', stock: 5 };
            const productB = { _id: 'p2', stock: 5 };
            const cart = [{ _id: 'p1', quantity: 3 }];

            const { result, rerender } = renderHook(({ product }) => useProductQuantity(product, cart), {
                initialProps: { product: productA },
            });

            expect(result.current.quantity).toBe(3);

            rerender({ product: productB });

            expect(result.current.quantity).toBe(1);
        });
    });

    describe('handleMinus', () => {
        it('decrements the quantity', () => {
            const productData = { _id: 'p1', stock: 5 };
            const cart = [{ _id: 'p1', quantity: 3 }];
            const { result } = renderHook(() => useProductQuantity(productData, cart));

            act(() => result.current.handleMinus());

            expect(result.current.quantity).toBe(2);
        });

        it('does not go below 1', () => {
            const { result } = renderHook(() => useProductQuantity(null, []));

            act(() => result.current.handleMinus());

            expect(result.current.quantity).toBe(1);
        });
    });

    describe('handlePlus', () => {
        it('increments the quantity when below stock', () => {
            const productData = { _id: 'p1', stock: 5 };
            const cart = [];
            const { result } = renderHook(() => useProductQuantity(productData, cart));

            act(() => result.current.handlePlus());

            expect(result.current.quantity).toBe(2);
        });

        it('does not exceed the available stock', () => {
            const productData = { _id: 'p1', stock: 2 };
            const cart = [{ _id: 'p1', quantity: 2 }];
            const { result } = renderHook(() => useProductQuantity(productData, cart));

            act(() => result.current.handlePlus());

            expect(result.current.quantity).toBe(2);
        });

        it('shows an alert with the max available amount when the stock limit is reached', () => {
            const productData = { _id: 'p1', stock: 2 };
            const cart = [{ _id: 'p1', quantity: 2 }];
            const { result } = renderHook(() => useProductQuantity(productData, cart));

            act(() => result.current.handlePlus());

            expect(alertSpy).toHaveBeenCalledWith('Достигнахте максималното налично количество на склад (2 бр.)');
        });

        it('treats a missing stock value as 0 and alerts immediately', () => {
            const productData = { _id: 'p1' };
            const { result } = renderHook(() => useProductQuantity(productData, []));

            act(() => result.current.handlePlus());

            expect(result.current.quantity).toBe(1);
            expect(alertSpy).toHaveBeenCalledWith('Достигнахте максималното налично количество на склад (0 бр.)');
        });

        it('does not alert when the increment succeeds', () => {
            const productData = { _id: 'p1', stock: 5 };
            const cart = [];
            const { result } = renderHook(() => useProductQuantity(productData, cart));

            act(() => result.current.handlePlus());

            expect(alertSpy).not.toHaveBeenCalled();
        });
    });

    describe('setQuantity', () => {
        it('allows setting the quantity directly', () => {
            const { result } = renderHook(() => useProductQuantity(null, []));

            act(() => result.current.setQuantity(10));

            expect(result.current.quantity).toBe(10);
        });
    });
});
