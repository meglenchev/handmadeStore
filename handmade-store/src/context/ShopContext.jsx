import { createContext, useEffect, useRef, useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage.jsx';
import { useMutation } from '@/hooks/useMutation.jsx';
import { ENDPOINTS } from '@/utils/endpoints.js';

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [cart, setCart] = useLocalStorage('cartItems', []);
    const [cartItemsDetails, setCartItemsDetails] = useState([]);
    const [notification, setNotification] = useState(null);
    const timerRef = useRef(null);

    const { mutate: fetchCartDetails, loading } = useMutation(ENDPOINTS.PRODUCTS.CHECK_PRODUCT, 'POST');

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

    async function addToCart(product, amount = 1) {
        try {
            const response = await fetchCartDetails({ productIds: [product._id] });
            const apiProduct = response[0];

            if (!apiProduct || apiProduct.stock <= 0 || apiProduct.outofstock) {
                showNotification('Продуктът е изчерпан или не съществува.', 'error');
                return;
            }

            const existingItem = cart.find((item) => item._id === product._id);
            const currentQuantity = existingItem ? existingItem.quantity : 0;
            const maxAvailable = apiProduct.stock ?? 0;

            if (currentQuantity + amount > maxAvailable) {
                showNotification(`Не можете да добавите повече бройки. От продукт "${apiProduct.title}" има останали само ${maxAvailable} бройки на склад.`, 'error');
                return;
            }

            setCart((prev) => {
                const itemInState = prev.find((item) => item._id === product._id);
                if (itemInState) {
                    return prev.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + amount } : item));
                }
                return [...prev, { _id: product._id, quantity: amount }];
            });
        } catch (error) {
            showNotification('Възникна грешка при проверка на наличността.', 'error');
        }
    }

    useEffect(() => {
        if (cart.length === 0) {
            setCartItemsDetails([]);
            return;
        }

        const productIds = cart.map((item) => item._id);

        fetchCartDetails({ productIds })
            .then((data) => setCartItemsDetails(data))
            .catch((err) => console.error('Грешка при обновяване на количката:', err.message));
    }, [cart, fetchCartDetails]);

    const detailedCart = useMemo(() => {
        return cart
            .map((cartItem) => {
                const productDetails = cartItemsDetails.find((p) => p._id === cartItem._id);
                if (!productDetails) return null;
                return { ...productDetails, quantity: cartItem.quantity };
            })
            .filter((item) => item !== null && !item.outofstock);
    }, [cart, cartItemsDetails]);

    const cartCount = useMemo(() => detailedCart.reduce((total, item) => total + item.quantity, 0), [detailedCart]);
    const subtotal = useMemo(() => detailedCart.reduce((total, item) => total + item.newPrice * item.quantity, 0).toFixed(2), [detailedCart]);

    function removeFromCart(product) {
        setCart((prev) => prev.filter((item) => item._id !== product._id));
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
                isLoadingCart: loading,
            }}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContext;
