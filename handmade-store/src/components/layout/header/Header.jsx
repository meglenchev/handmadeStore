import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router';
import { NavigationLinks } from './NavigationLinks.jsx';
import { useSticky } from '../../../hooks/useSticky.jsx';

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

    const toggleMenu = (name) => (e) => {
        e?.preventDefault();
        setActiveMenu((prev) => ({ ...prev, [name]: !prev[name] }));
    };

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
            <header className={`header-section header-menu-center section bg-white d-none d-xl-block ${isSticky ? 'sticky-header is-sticky' : 'py-3'}`}>
                <div className="container">
                    <div className="row align-items-center">
                        {/* Header Menu Toggle Start */}
                        <div className="col">
                            <div className="header-tools">
                                <div className="mobile-menu-toggle">
                                    <button onClick={toggleMenu('desktop')} className="offcanvas-toggle">
                                        <svg viewBox="0 0 800 600">
                                            <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top" />
                                            <path d="M300,320 L540,320" className="middle" />
                                            <path
                                                d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                                className="bottom"
                                                transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Header Menu Toggle End */}
                        {/* Header Logo Start */}
                        <div className="col">
                            <div className="header-logo d-flex justify-content-center">
                                <Link to="/">
                                    <img src="../../assets/images/logo/logo-2.webp" alt="Learts Logo" />
                                </Link>
                            </div>
                        </div>
                        {/* Header Logo End */}
                        {/* Header Tools Start */}
                        <div className="col">
                            <div className="header-tools justify-content-end">
                                <div className="header-login">
                                    <Link to="/my-account">
                                        <FontAwesomeIcon icon="user" />
                                    </Link>
                                </div>
                                <div className="header-search d-none d-sm-block">
                                    <button onClick={toggleMenu('search')} className="offcanvas-toggle">
                                        <FontAwesomeIcon icon="search" />
                                    </button>
                                </div>
                                <div className="header-wishlist">
                                    <button onClick={toggleMenu('wishlist')} className={`offcanvas-toggle ${activeMenu.wishlist ? 'close' : ''}`}>
                                        <span className="wishlist-count">3</span>
                                        <FontAwesomeIcon icon="heart" />
                                    </button>
                                </div>
                                <div className="header-cart">
                                    <button onClick={toggleMenu('cart')} className="offcanvas-toggle">
                                        <span className="cart-count">3</span>
                                        <FontAwesomeIcon icon="shopping-cart" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Header Tools End */}
                    </div>
                </div>
            </header>
            {/* Header Section End */}
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
            {/* Mobile Header Section Start */}
            <div className="mobile-header bg-white section d-xl-none">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Header Logo Start */}
                        <div className="col">
                            <div className="header-logo">
                                <Link to="/">
                                    <img src="../../assets/images/logo/logo-2.webp" alt="Learts Logo" />
                                </Link>
                            </div>
                        </div>
                        {/* Header Logo End */}
                        {/* Header Tools Start */}
                        <div className="col-auto">
                            <div className="header-tools justify-content-end">
                                <div className="header-login d-none d-sm-block">
                                    <Link to="/my-account">
                                        <FontAwesomeIcon icon="user" />
                                    </Link>
                                </div>
                                <div className="header-search d-none d-sm-block">
                                    <a href="#offcanvas-search" className="offcanvas-toggle">
                                        <FontAwesomeIcon icon="search" />
                                    </a>
                                </div>
                                <div className="header-wishlist d-none d-sm-block">
                                    <a href="#offcanvas-wishlist" className="offcanvas-toggle">
                                        <span className="wishlist-count">3</span>
                                        <FontAwesomeIcon icon="heart" />
                                    </a>
                                </div>
                                <div className="header-cart">
                                    <a href="#offcanvas-cart" className="offcanvas-toggle">
                                        <span className="cart-count">3</span>
                                        <FontAwesomeIcon icon="shopping-cart" />
                                    </a>
                                </div>
                                <div className="mobile-menu-toggle">
                                    <button onClick={toggleMenu('mobile')} className="offcanvas-toggle">
                                        <svg viewBox="0 0 800 600">
                                            <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top" />
                                            <path d="M300,320 L540,320" className="middle" />
                                            <path
                                                d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                                className="bottom"
                                                transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Header Tools End */}
                    </div>
                </div>
            </div>
            {/* Mobile Header Section End */}
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
                    <Offcanvas.Body className="body customScroll">
                        <ul className="minicart-product-list">
                            <li>
                                <a href="product-details.html" className="image">
                                    <img src="../../assets/images/product/cart-product-2.webp" alt="Cart product Image" />
                                </a>
                                <div className="content">
                                    <a href="product-details.html" className="title">
                                        Дъска за рязане на орехи
                                    </a>
                                    <span className="quantity-price">
                                        1 x <span className="amount">€100.00</span>
                                    </span>
                                    <a href="#" className="remove">
                                        ×
                                    </a>
                                </div>
                            </li>
                            <li>
                                <a href="product-details.html" className="image">
                                    <img src="../../assets/images/product/cart-product-2.webp" alt="Cart product Image" />
                                </a>
                                <div className="content">
                                    <a href="product-details.html" className="title">
                                        Щастливо дървено слонче
                                    </a>
                                    <span className="quantity-price">
                                        1 x <span className="amount">€35.00</span>
                                    </span>
                                    <a href="#" className="remove">
                                        ×
                                    </a>
                                </div>
                            </li>
                            <li>
                                <a href="product-details.html" className="image">
                                    <img src="../../assets/images/product/cart-product-2.webp" alt="Cart product Image" />
                                </a>
                                <div className="content">
                                    <a href="product-details.html" className="title">
                                        Комплект за изрязване на риба
                                    </a>
                                    <span className="quantity-price">
                                        1 x <span className="amount">€9.00</span>
                                    </span>
                                    <a href="#" className="remove">
                                        ×
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </Offcanvas.Body>
                    <div className="foot">
                        <div className="buttons">
                            <a href="wishlist.html" className="btn btn-dark btn-hover-primary">
                                виж списък с любими
                            </a>
                        </div>
                    </div>
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
                    <Offcanvas.Body className="body customScroll">
                        <ul className="minicart-product-list">
                            <li>
                                <a href="product-details.html" className="image">
                                    <img src="../../assets/images/product/cart-product-2.webp" alt="Cart product Image" />
                                </a>
                                <div className="content">
                                    <a href="product-details.html" className="title">
                                        Дъска за рязане на орехи
                                    </a>
                                    <span className="quantity-price">
                                        1 x <span className="amount">€100.00</span>
                                    </span>
                                    <a href="#" className="remove">
                                        ×
                                    </a>
                                </div>
                            </li>
                            <li>
                                <a href="product-details.html" className="image">
                                    <img src="../../assets/images/product/cart-product-2.webp" alt="Cart product Image" />
                                </a>
                                <div className="content">
                                    <a href="product-details.html" className="title">
                                        Щастливо дървено слонче
                                    </a>
                                    <span className="quantity-price">
                                        1 x <span className="amount">€35.00</span>
                                    </span>
                                    <a href="#" className="remove">
                                        ×
                                    </a>
                                </div>
                            </li>
                            <li>
                                <a href="product-details.html" className="image">
                                    <img src="../../assets/images/product/cart-product-2.webp" alt="Cart product Image" />
                                </a>
                                <div className="content">
                                    <a href="product-details.html" className="title">
                                        Комплект за изрязване на риба
                                    </a>
                                    <span className="quantity-price">
                                        1 x <span className="amount">€9.00</span>
                                    </span>
                                    <a href="#" className="remove">
                                        ×
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </Offcanvas.Body>
                    <div className="foot">
                        <div className="sub-total">
                            <strong>Междинна сума:</strong>
                            <span className="amount">€144.00</span>
                        </div>
                        <div className="buttons">
                            <a href="shopping-cart.html" className="btn btn-dark btn-hover-primary">
                                преглед на количката
                            </a>
                            <a href="checkout.html" className="btn btn-primary">
                                плати
                            </a>
                        </div>
                        <p className="minicart-message">Безплатна доставка за поръчки над €60 евро!</p>
                    </div>
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
                                        <span>3</span>
                                        <FontAwesomeIcon icon="heart" />
                                    </NavLink>
                                </div>
                                <div className="header-cart">
                                    <NavLink to="/shopping-cart">
                                        <span className="cart-count">3</span>
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
        </>
    );
}
