import { createContext, useState } from 'react';
import { DEAL_PRODUCTS } from '../data/products.js';

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    function addToCart(product) {
        const item = DEAL_PRODUCTS.find((item) => item.id === product.id);

        if (item) {
            setCartItems((prev) => [...prev, product]);
        }
    }

    function toggleWishlist(product) {
        setWishlistItems((prev) => (prev.find((item) => item.id === product.id) ? prev.filter((item) => item.id !== product.id) : [...prev, product]));
    }

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                wishlistItems,
                addToCart,
                toggleWishlist,
                cartCount: cartItems.length,
                wishlistCount: wishlistItems.length,
            }}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContext;
