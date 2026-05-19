import { createContext, useRef, useMemo } from 'react';
import { DEAL_PRODUCTS } from '../data/products.js';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useLocalStorage('wishlistItems', []);
    const detailedWishlist = useMemo(() => {
        return (wishlist || [])
            .map((item) => {
                const productDetails = DEAL_PRODUCTS.find((product) => product.id === item.id);

                if (!productDetails) {
                    console.warn(`Product with ID ${item.id} not found in DEAL_PRODUCTS.`);
                    return null;
                }
                return productDetails;
            })
            .filter((item) => item !== null);
    }, [wishlist]);

    const wishlistCount = useMemo(() => detailedWishlist.length, [detailedWishlist]);

    function toggleWishlist(product) {
        setWishlist((prev) => {
            const safePrev = prev || [];
            const exists = safePrev.find((item) => item.id === product.id);
            if (exists) {
                return safePrev.filter((item) => item.id !== product.id);
            }
            return [...safePrev, { id: product.id }];
        });
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlist: detailedWishlist,
                toggleWishlist,
                wishlistCount,
            }}>
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistContext;
