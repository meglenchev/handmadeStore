import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router';
import { NavigationLinks } from './NavigationLinks.jsx';
import { useSticky } from '../../../hooks/useSticky.jsx';
import ShopContext from '../../../context/ShopContext.jsx';
import { DesktopHeader } from './DesktopHeader.jsx';
import { useAutoCloseEmptyMenu } from '../../../hooks/useAutoCloseEmptyMenu.jsx';
import { MobileHeader } from './MobileHeader.jsx';

const HEADER_LINKS = [
    { to: '/', label: 'Начало' },
    { to: '/shop', label: 'Магазин' },
    { to: '/about-us', label: 'За нас' },
    { to: '/wishlist', label: 'Любими' },
    { to: '/contact-us', label: 'Контакти' },
    { to: '/privacy-policy', label: 'Политика за сигурност' },
];

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

    const { cart, cartCount, subtotal, removeFromCart, notification, wishlistItems, wishlistCount, toggleWishlist } = useContext(ShopContext);

    // Use useAutoCloseEmptyMenu Hook for a Cart
    useAutoCloseEmptyMenu(cart, activeMenu.cart, 'cart', toggleMenu);

    // Use useAutoCloseEmptyMenu Hook for a Wishlist
    useAutoCloseEmptyMenu(wishlistItems, activeMenu.wishlist, 'wishlist', toggleMenu);

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
            <DesktopHeader isSticky={isSticky} toggleMenu={toggleMenu} wishlistCount={wishlistCount} cartCount={cartCount} activeMenu={activeMenu} />
            {/* Header Section End */}
            {/* Mobile Header Section Start */}
            <MobileHeader wishlistCount={wishlistCount} cartCount={cartCount} toggleMenu={toggleMenu} activeMenu={activeMenu} />
            {/* Mobile Header Section End */}
            {/* OffCanvas Desktop Menu */}
            <Offcanvas show={activeMenu.desktop} onHide={toggleMenu('desktop')} placement="start" className="headerMenu offcanvas offcanvas-overlay-menu">
                <Offcanvas.Body>
                    <div className="inner">
                        <button onClick={toggleMenu('desktop')} className="offcanvas-close">
                            ×
                        </button>
                        <div className="overlay-menu">
                            <NavigationLinks links={HEADER_LINKS} onItemClick={toggleMenu('desktop')} />
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            {/* OffCanvas SeDesktop Menuarch End */}
            {/* OffCanvas Search Start */}
            <Offcanvas show={activeMenu.search} onHide={toggleMenu('search')} placement="start" className="offcanvas offcanvas-search">
                <Offcanvas.Body>
                    <div className="inner">
                        <div className="offcanvas-search-form">
                            <button onClick={toggleMenu('search')} className="offcanvas-close">
                                ×
                            </button>
                            <form action="#">
                                <div className="row mb-n3">
                                    <div className="col-lg-8 col-12 mb-3">
                                        <input type="text" placeholder="Търсене на продукти..." />
                                    </div>
                                    <div className="col-lg-4 col-12 mb-3">
                                        <select className="search-select select2-basic">
                                            <option value={0}>Всички категории</option>
                                            <option value="kids-babies">Kids &amp; Babies</option>
                                            <option value="home-decor">Home Decor</option>
                                            <option value="gift-ideas">Gift ideas</option>
                                            <option value="kitchen">Kitchen</option>
                                            <option value="toys">Toys</option>
                                            <option value="kniting-sewing">Kniting &amp; Sewing</option>
                                            <option value="pots">Pots</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <p className="search-description text-body-light mt-2">
                            <span># Въведете поне 1 символ за търсене</span>
                            <span># Натиснете Enter за търсене или ESC за затваряне</span>
                        </p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            {/* OffCanvas Search End */}
            {/* OffCanvas Wishlist Start */}
            <Offcanvas show={activeMenu.wishlist} onHide={toggleMenu('wishlist')} placement="end" className="offcanvas offcanvas-wishlist">
                <div className="inner">
                    <Offcanvas.Header className="head">
                        <span className="title">Любми</span>
                        <button className="offcanvas-close" onClick={toggleMenu('wishlist')}>
                            ×
                        </button>
                    </Offcanvas.Header>
                    {wishlistItems.length > 0 ? (
                        <>
                            <Offcanvas.Body className="body customScroll">
                                <ul className="minicart-product-list">
                                    {wishlistItems.map((item) => (
                                        <li key={item.id}>
                                            <a href={`/product-details/${item.id}`} className="image">
                                                <img src={item.image} alt={item.title} />
                                            </a>
                                            <div className="content">
                                                <a href={`/product-details/${item.id}`} className="title">
                                                    {item.title}
                                                </a>
                                                <span className="quantity-price">
                                                    1 x <span className="amount">€{item.newPrice.toFixed(2)}</span>
                                                </span>
                                                <button onClick={() => toggleWishlist(item)} className="remove">
                                                    ×
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Offcanvas.Body>
                            <div className="foot">
                                <div className="buttons">
                                    <a href="wishlist.html" className="btn btn-dark btn-hover-primary">
                                        виж списък с любими
                                    </a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h3 className="title empty-minicart-message">Списъкът с любими е празен!</h3>
                    )}
                </div>
            </Offcanvas>
            {/* OffCanvas Wishlist End */}
            {/* OffCanvas Cart Start */}
            <Offcanvas show={activeMenu.cart} onHide={toggleMenu('cart')} placement="end" className="offcanvas offcanvas-cart">
                <div className="inner">
                    <Offcanvas.Header className="head">
                        <span className="title">Количка</span>
                        <button onClick={toggleMenu('cart')} className="offcanvas-close">
                            ×
                        </button>
                    </Offcanvas.Header>
                    {cart.length > 0 ? (
                        <>
                            <Offcanvas.Body className="body customScroll">
                                <ul className="minicart-product-list">
                                    {cart.map((item) => (
                                        <li key={item.id}>
                                            <a href="product-details.html" className="image">
                                                <img src={item.image} alt={item.title} />
                                            </a>
                                            <div className="content">
                                                <a href={`/product-details/${item.id}`} className="title">
                                                    {item.title}
                                                </a>
                                                <span className="quantity-price">
                                                    {item.quantity} x <span className="amount">€{item.newPrice.toFixed(2)}</span>
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        removeFromCart(item);
                                                    }}
                                                    className="remove">
                                                    ×
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Offcanvas.Body>
                            <div className="foot">
                                <div className="sub-total">
                                    <strong>Междинна сума:</strong>
                                    <span className="amount">€{subtotal}</span>
                                </div>
                                <div className="buttons">
                                    <a href="/shopping-cart" className="btn btn-dark btn-hover-primary">
                                        преглед на количката
                                    </a>
                                    <a href="/checkout" className="btn btn-primary">
                                        плати
                                    </a>
                                </div>
                                <p className="minicart-message">Безплатна доставка за поръчки над €60 евро!</p>
                            </div>
                        </>
                    ) : (
                        <h3 className="title empty-minicart-message">Количка е празна!</h3>
                    )}
                </div>
            </Offcanvas>
            {/* OffCanvas Cart End */}
            {/* OffCanvas Mobile Menu */}
            <Offcanvas show={activeMenu.mobile} onHide={toggleMenu('mobile')} placement="start" className="mobileMenu offcanvas offcanvas-mobile-menu">
                <Offcanvas.Header className="head">
                    <button onClick={toggleMenu('mobile')} className="offcanvas-close">
                        ×
                    </button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="inner customScroll">
                        <div className="offcanvas-menu-search-form">
                            <form action="#">
                                <input type="text" placeholder="Search..." />
                                <button>
                                    <FontAwesomeIcon icon="search" />
                                </button>
                            </form>
                        </div>
                        <div className="offcanvas-menu">
                            <ul>
                                {HEADER_LINKS.map((link) => (
                                    <li key={link.to}>
                                        <NavLink to={link.to}>
                                            <span className="menu-text">{link.label}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="offcanvas-buttons">
                            <div className="header-tools">
                                <div className="header-login">
                                    <NavLink to="/my-account">
                                        <FontAwesomeIcon icon="user" />
                                    </NavLink>
                                </div>
                                <div className="header-wishlist">
                                    <NavLink to="/wishlist">
                                        {wishlistCount > 0 && <span>{wishlistCount}</span>}
                                        <FontAwesomeIcon icon="heart" />
                                    </NavLink>
                                </div>
                                <div className="header-cart">
                                    <NavLink to="/shopping-cart">
                                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                                        <FontAwesomeIcon icon="shopping-cart" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="offcanvas-social">
                            <a href="#">
                                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                            </a>
                            <a href="#">
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                            <a href="#">
                                <FontAwesomeIcon icon={['fab', 'youtube']} />
                            </a>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            {/* OffCanvas Mobile Menu End */}
            {/* Add To Cart Product Error Notification */}
            {notification && (
                <div className={`custom-notification ${notification.type}`}>
                    <span className="icon">
                        <FontAwesomeIcon icon="circle-exclamation" />
                    </span>
                    <p className="message">{notification.message}</p>
                </div>
            )}
            {/* End Add To Cart Product Error Notification*/}
        </>
    );
}
