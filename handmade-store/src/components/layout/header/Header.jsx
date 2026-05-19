import { useCallback, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSticky } from '../../../hooks/useSticky.jsx';
import { DesktopHeader } from './DesktopHeader.jsx';
import { useAutoCloseEmptyMenu } from '../../../hooks/useAutoCloseEmptyMenu.jsx';
import { MobileHeader } from './MobileHeader.jsx';
import { SearchOffcanvas } from './SearchOffcanvas.jsx';
import { WishlistOffcanvas } from './WishlistOffcanvas.jsx';
import { DesktopMenu } from './DesktopMenu.jsx';
import { CartOffcanvas } from './CartOffcanvas.jsx';
import { MobileMenu } from './MobileMenu.jsx';
import ShopContext from '../../../context/ShopContext.jsx';
import { useMediaQuery } from '../../../hooks/useMediaQuery.jsx';
import WishlistContext from '../../../context/WishlistContext.jsx';

export function Header() {
    const { isSticky, sentinelRef } = useSticky();

    const [activeMenu, setActiveMenu] = useState({
        desktop: false,
        mobile: false,
        wishlist: false,
        cart: false,
        search: false,
    });

    const toggleMenu = useCallback(
        (name) => (e) => {
            e?.preventDefault();
            setActiveMenu((prev) => ({ ...prev, [name]: !prev[name] }));
        },
        []
    );

    const { cart, cartCount, subtotal, removeFromCart, notification } = useContext(ShopContext);
    const { wishlist, toggleWishlist, wishlistCount } = useContext(WishlistContext);

    const isDesktop = useMediaQuery('(min-width: 1200px)');

    // Use useAutoCloseEmptyMenu Hook for a Cart
    useAutoCloseEmptyMenu(cart, activeMenu.cart, 'cart', toggleMenu);

    // Use useAutoCloseEmptyMenu Hook for a Wishlist
    useAutoCloseEmptyMenu(wishlist, activeMenu.wishlist, 'wishlist', toggleMenu);

    return (
        <>
            {/* Topbar Section Start */}
            <div className="topbar-section section border-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center my-2">Безплатна доставка за поръчка над 60 евро!</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Topbar Section End */}
            <div ref={sentinelRef} id="header-sentinel"></div>
            {/* Header Section Start */}
            {isDesktop ? (
                <>
                    <DesktopHeader isSticky={isSticky} toggleMenu={toggleMenu} activeMenu={activeMenu} />
                    <DesktopMenu activeMenu={activeMenu} toggleMenu={toggleMenu} />
                </>
            ) : (
                <>
                    <MobileHeader isSticky={isSticky} toggleMenu={toggleMenu} activeMenu={activeMenu} />
                    <MobileMenu activeMenu={activeMenu} toggleMenu={toggleMenu} />
                </>
            )}
            {/* OffCanvas Search Start */}
            <SearchOffcanvas activeMenu={activeMenu} toggleMenu={toggleMenu} />
            {/* OffCanvas Wishlist Start */}
            <WishlistOffcanvas activeMenu={activeMenu} toggleMenu={toggleMenu} wishlist={wishlist} toggleWishlist={toggleWishlist} />
            {/* OffCanvas Cart Start */}
            <CartOffcanvas activeMenu={activeMenu} toggleMenu={toggleMenu} cart={cart} subtotal={subtotal} removeFromCart={removeFromCart} />

            {/* Add To Cart Product Error Notification */}
            {notification && (
                <div className={`custom-notification ${notification.type}`}>
                    <span className="icon">
                        <FontAwesomeIcon icon="circle-exclamation" />
                    </span>
                    <p className="message">{notification.message}</p>
                </div>
            )}
        </>
    );
}
