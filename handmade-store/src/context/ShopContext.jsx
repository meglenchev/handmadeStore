import { createContext, useEffect, useRef, useState } from 'react';
import { DEAL_PRODUCTS } from '../data/products.js';

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cart]);

    const [notification, setNotification] = useState(null);
    const timerRef = useRef(null);

    function showNotification(message, type = 'error') {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        setNotification({ message, type });

        timerRef.current = setTimeout(() => {
            setNotification(null);
        }, 5000);
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    function addToCart(product) {
        const apiProduct = DEAL_PRODUCTS.find((item) => item.id === product.id);
        if (!apiProduct || apiProduct.outofstock) return;

        const existingItem = cart.find((item) => item.id === product.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        const maxAvailable = apiProduct.availableQuantity ?? 0;

        if (currentQuantity >= maxAvailable) {
            showNotification(`Не можете да добавите повече бройки. От продукт "${apiProduct.title}" има останали само ${maxAvailable} бройки на склад.`, 'error');
            return;
        }

        setCart((prev) => {
            const itemInState = prev.find((item) => item.id === product.id);

            if (itemInState) {
                return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            }

            return [...prev, { id: product.id, quantity: 1 }];
        });
    }

    const detailedCart = cart
        .map((cartItem) => {
            const productDetails = DEAL_PRODUCTS.find((product) => product.id === cartItem.id);

            if (!productDetails) {
                console.warn(`Product with ID ${cartItem.id} not found in DEAL_PRODUCTS.`);
                return null;
            }

            return { ...productDetails, quantity: cartItem.quantity };
        })
        .filter((item) => item !== null && !item.outofstock);

    const cartCount = detailedCart.reduce((total, item) => total + item.quantity, 0);

    const subtotal = detailedCart.reduce((total, item) => total + item.newPrice * item.quantity, 0).toFixed(2);

    function removeFromCart(product) {
        setCart((prev) => prev.filter((item) => item.id !== product.id));
    }

    const [wishlistItems, setWishlistItems] = useState([]);

    function toggleWishlist(product) {
        setWishlistItems((prev) => (prev.find((item) => item.id === product.id) ? prev.filter((item) => item.id !== product.id) : [...prev, product]));
    }

    return (
        <ShopContext.Provider
            value={{
                cart: detailedCart,
                wishlistItems,
                addToCart,
                notification,
                subtotal,
                removeFromCart,
                toggleWishlist,
                cartCount,
                wishlistCount: wishlistItems.length,
            }}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContext;
