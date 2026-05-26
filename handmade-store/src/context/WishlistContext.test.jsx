import { renderHook, act } from '@testing-library/react';
import { useContext, useState } from 'react';
import WishlistContext, { WishlistProvider } from './WishlistContext';
import { useLocalStorage } from '@/hooks/useLocalStorage.jsx';

vi.mock('@/hooks/useLocalStorage.jsx', () => ({
    useLocalStorage: vi.fn(),
}));

// Renders the hook under WishlistProvider, giving access to the full context value.
const wrapper = ({ children }) => <WishlistProvider>{children}</WishlistProvider>;

// Convenience shorthand used in every test.
const renderWishlist = () => renderHook(() => useContext(WishlistContext), { wrapper });

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------
const VASE     = { _id: 'abc1', title: 'Ceramic Vase',   newPrice: 35, image: 'vase.jpg'   };
const SCARF    = { _id: 'abc2', title: 'Knitted Scarf',  newPrice: 25, image: 'scarf.jpg'  };
const BOWL     = { _id: 'abc3', title: 'Wooden Bowl',    newPrice: 45, image: 'bowl.jpg'   };
// A product with extra fields that should NOT end up in the wishlist.
const VASE_FAT = { ...VASE, description: 'Lovely vase', stock: 10, category: 'Home' };

describe('WishlistContext', () => {
    beforeEach(() => {
        // Default mock: behave exactly like useState so state updates work correctly.
        useLocalStorage.mockImplementation((_key, initialValue) => useState(initialValue));
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    // -----------------------------------------------------------------------
    // 1. Initial state
    // -----------------------------------------------------------------------
    describe('initial state', () => {
        it('initializes with an empty array when no stored data is provided', () => {
            const { result } = renderWishlist();

            expect(result.current.wishlist).toEqual([]);
        });

        it('initializes with the values returned by useLocalStorage', () => {
            const stored = [VASE, SCARF];
            useLocalStorage.mockImplementationOnce(() => useState(stored));

            const { result } = renderWishlist();

            expect(result.current.wishlist).toEqual(stored);
        });
    });

    // -----------------------------------------------------------------------
    // 2. wishlistCount
    // -----------------------------------------------------------------------
    describe('wishlistCount', () => {
        it('returns 0 for an empty wishlist', () => {
            const { result } = renderWishlist();

            expect(result.current.wishlistCount).toBe(0);
        });

        it('matches the number of items in a pre-loaded wishlist', () => {
            useLocalStorage.mockImplementationOnce(() => useState([VASE, SCARF, BOWL]));

            const { result } = renderWishlist();

            expect(result.current.wishlistCount).toBe(3);
        });

        it('increments when a new item is added via toggleWishlist', () => {
            const { result } = renderWishlist();

            act(() => { result.current.toggleWishlist(VASE); });

            expect(result.current.wishlistCount).toBe(1);
        });

        it('decrements when an existing item is removed via toggleWishlist', () => {
            useLocalStorage.mockImplementationOnce(() => useState([VASE, SCARF]));

            const { result } = renderWishlist();

            act(() => { result.current.toggleWishlist(VASE); });

            expect(result.current.wishlistCount).toBe(1);
        });
    });

    // -----------------------------------------------------------------------
    // 3. toggleWishlist — adding
    // -----------------------------------------------------------------------
    describe('toggleWishlist — adding a product', () => {
        it('adds a product to an empty wishlist', () => {
            const { result } = renderWishlist();

            act(() => { result.current.toggleWishlist(VASE); });

            expect(result.current.wishlist).toHaveLength(1);
            expect(result.current.wishlist[0]).toEqual(VASE);
        });

        it('only stores the required fields: _id, title, newPrice, image', () => {
            const { result } = renderWishlist();

            act(() => { result.current.toggleWishlist(VASE_FAT); });

            expect(result.current.wishlist[0]).toEqual({
                _id:      VASE._id,
                title:    VASE.title,
                newPrice: VASE.newPrice,
                image:    VASE.image,
            });
            expect(result.current.wishlist[0]).not.toHaveProperty('description');
            expect(result.current.wishlist[0]).not.toHaveProperty('stock');
            expect(result.current.wishlist[0]).not.toHaveProperty('category');
        });

        it('appends multiple distinct products while keeping previous ones', () => {
            const { result } = renderWishlist();

            act(() => { result.current.toggleWishlist(VASE);  });
            act(() => { result.current.toggleWishlist(SCARF); });
            act(() => { result.current.toggleWishlist(BOWL);  });

            expect(result.current.wishlist).toHaveLength(3);
            expect(result.current.wishlist.map((i) => i._id)).toEqual([
                VASE._id, SCARF._id, BOWL._id,
            ]);
        });

        it('does not add a duplicate when the same product is toggled twice', () => {
            const { result } = renderWishlist();

            // First toggle adds it; second toggle removes it (tested below).
            // After a full add→remove cycle the list is empty, not duplicated.
            act(() => { result.current.toggleWishlist(VASE); });
            act(() => { result.current.toggleWishlist(VASE); });

            expect(result.current.wishlist).toHaveLength(0);
        });
    });

    // -----------------------------------------------------------------------
    // 4. toggleWishlist — removing
    // -----------------------------------------------------------------------
    describe('toggleWishlist — removing a product', () => {
        it('removes the product when it already exists in the wishlist', () => {
            useLocalStorage.mockImplementationOnce(() => useState([VASE]));

            const { result } = renderWishlist();

            act(() => { result.current.toggleWishlist(VASE); });

            expect(result.current.wishlist).toHaveLength(0);
        });

        it('identifies the product to remove by _id only', () => {
            useLocalStorage.mockImplementationOnce(() => useState([VASE, SCARF]));

            const { result } = renderWishlist();

            act(() => { result.current.toggleWishlist(VASE); });

            expect(result.current.wishlist).toHaveLength(1);
            expect(result.current.wishlist[0]._id).toBe(SCARF._id);
        });

        it('leaves other products untouched when removing one item', () => {
            useLocalStorage.mockImplementationOnce(() => useState([VASE, SCARF, BOWL]));

            const { result } = renderWishlist();

            act(() => { result.current.toggleWishlist(SCARF); });

            expect(result.current.wishlist).toHaveLength(2);
            expect(result.current.wishlist.map((i) => i._id)).toEqual([VASE._id, BOWL._id]);
        });
    });
});
