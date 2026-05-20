import { createContext, useEffect, useRef, useState, useMemo } from 'react';
import { DEAL_PRODUCTS } from '../data/products.js';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [cart, setCart] = useLocalStorage('cartItems', []);
    const [notification, setNotification] = useState(null);
    const timerRef = useRef(null);

    function showNotification(message, type = 'error') {
        if (timerRef.current) clearTimeout(timerRef.current);
        setNotification({ message, type });
        timerRef.current = setTimeout(() => setNotification(null), 5000);
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    function addToCart(product, amount = 1) {
        const apiProduct = DEAL_PRODUCTS.find((item) => item.id === product.id);
        if (!apiProduct || apiProduct.stock <= 0 || apiProduct.outofstock) return;

        const existingItem = cart.find((item) => item.id === product.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        const maxAvailable = apiProduct.stock ?? 0;

        if (currentQuantity + amount > maxAvailable) {
            showNotification(`Не можете да добавите повече бройки. От продукт "${apiProduct.title}" има останали само ${maxAvailable} бройки на склад.`, 'error');
            return;
        }

        setCart((prev) => {
            const itemInState = prev.find((item) => item.id === product.id);
            if (itemInState) {
                return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + amount } : item));
            }
            return [...prev, { id: product.id, quantity: amount }];
        });
    }

    const detailedCart = useMemo(() => {
        return cart
            .map((cartItem) => {
                const productDetails = DEAL_PRODUCTS.find((product) => product.id === cartItem.id);
                if (!productDetails) {
                    console.warn(`Product with ID ${cartItem.id} not found in DEAL_PRODUCTS.`);
                    return null;
                }
                return { ...productDetails, quantity: cartItem.quantity };
            })
            .filter((item) => item !== null && !item.outofstock);
    }, [cart]);

    const cartCount = useMemo(() => detailedCart.reduce((total, item) => total + item.quantity, 0), [detailedCart]);
    const subtotal = useMemo(() => detailedCart.reduce((total, item) => total + item.newPrice * item.quantity, 0).toFixed(2), [detailedCart]);

    function removeFromCart(product) {
        setCart((prev) => prev.filter((item) => item.id !== product.id));
    }

    return (
        <ShopContext.Provider
            value={{
                cart: detailedCart,
                addToCart,
                notification,
                subtotal,
                removeFromCart,
                cartCount,
            }}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContext;
