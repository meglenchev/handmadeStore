import { createContext, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage.jsx';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useLocalStorage('wishlistItems', []);

    const wishlistCount = useMemo(() => (wishlist || []).length, [wishlist]);

    function toggleWishlist(product) {
        setWishlist((prev) => {
            const safePrev = prev || [];
            const exists = safePrev.find((item) => item._id === product._id);

            if (exists) {
                return safePrev.filter((item) => item._id !== product._id);
            }

            return [...safePrev, { _id: product._id, title: product.title, newPrice: product.newPrice, image: product.image }];
        });
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                wishlistCount,
            }}>
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistContext;
