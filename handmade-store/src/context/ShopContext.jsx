import { createContext, useEffect, useState } from 'react';
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

    const [wishlistItems, setWishlistItems] = useState([]);

    function addToCart(product) {
        setCart((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);

            if (existingItem) {
                return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(product) {
        setCart((prev) => prev.filter((item) => item.id !== product.id));
    }

    function toggleWishlist(product) {
        setWishlistItems((prev) => (prev.find((item) => item.id === product.id) ? prev.filter((item) => item.id !== product.id) : [...prev, product]));
    }

    return (
        <ShopContext.Provider
            value={{
                cart,
                wishlistItems,
                addToCart,
                removeFromCart,
                toggleWishlist,
                cartCount: cart.length,
                wishlistCount: wishlistItems.length,
            }}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContext;
