import { useState } from 'react';
import { Modal, Button, Offcanvas } from 'react-bootstrap';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import Slider from 'react-slick';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faShoppingCart,
    faSearch,
    faUser,
    faFrown,
    faRandom,
    faPlus,
    faMinus,
    faEnvelope,
    faAngleLeft,
    faAngleRight,
    faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faYoutube, faTwitter, faGooglePlusG, faPinterest } from '@fortawesome/free-brands-svg-icons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'swiper/css';
import 'swiper/css/pagination';

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: 'block', color: 'black', fontSize: '30px', right: '0' }} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight} />
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: 'block', color: 'black', fontSize: '30px', left: '10px' }} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </div>
    );
};

export function Home() {
    // Home Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    // Instagram Slider settings
    const settingsInsta = {
        ...settings,
        dots: false,
        slidesToShow: 5,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    // Product Quick View Slider settings
    const settingsProductQuickView = {
        ...settingsInsta,
        slidesToShow: 1,
    };

    // Quick View Modal state
    const [showQuickView, setShowQuickView] = useState(false);

    // Handlers for Quick View Modal
    const handleCloseQuickView = () => {
        setShowQuickView(false);
    };

    const handleOpenQuickView = (e) => {
        e.preventDefault();
        setShowQuickView(true);
    };

    // Wishlist Offcanvas state
    const [showWishlist, setShowWishlist] = useState(false);

    const toggleWishlist = (e) => {
        e.preventDefault();
        setShowWishlist(!showWishlist);
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
            {/* Header Section Start */}
            <div className="header-section header-menu-center section py-3 bg-white d-none d-xl-block">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Header Menu Toggle Start */}
                        <div className="col">
                            <div className="header-tools">
                                <div className="mobile-menu-toggle">
                                    <a href="#overlay-menu" className="offcanvas-toggle">
                                        <svg viewBox="0 0 800 600">
                                            <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top" />
                                            <path d="M300,320 L540,320" className="middle" />
                                            <path
                                                d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                                className="bottom"
                                                transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Header Menu Toggle End */}
                        {/* Header Logo Start */}
                        <div className="col">
                            <div className="header-logo d-flex justify-content-center">
                                <a href="index.html">
                                    <img src="../../assets/images/logo/logo-2.webp" alt="Learts Logo" />
                                </a>
                            </div>
                        </div>
                        {/* Header Logo End */}
                        {/* Header Tools Start */}
                        <div className="col">
                            <div className="header-tools justify-content-end">
                                <div className="header-login">
                                    <a href="my-account.html">
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                </div>
                                <div className="header-search d-none d-sm-block">
                                    <a href="#offcanvas-search" className="offcanvas-toggle">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </a>
                                </div>
                                <div className="header-wishlist">
                                    <a href="#" onClick={toggleWishlist} className={`offcanvas-toggle ${showWishlist ? 'close' : ''}`}>
                                        <span className="wishlist-count">3</span>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </a>
                                </div>
                                <div className="header-cart">
                                    <a href="#offcanvas-cart" className="offcanvas-toggle">
                                        <span className="cart-count">3</span>
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Header Tools End */}
                    </div>
                </div>
            </div>
            {/* Header Section End */}
            {/* Header Sticky Section Start */}
            <div className="sticky-header header-menu-center section bg-white d-none d-xl-block">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Header Menu Toggle Start */}
                        <div className="col">
                            <div className="header-tools">
                                <div className="mobile-menu-toggle">
                                    <a href="#overlay-menu" className="offcanvas-toggle">
                                        <svg viewBox="0 0 800 600">
                                            <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top" />
                                            <path d="M300,320 L540,320" className="middle" />
                                            <path
                                                d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                                className="bottom"
                                                transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Header Menu Toggle End */}
                        {/* Header Logo Start */}
                        <div className="col">
                            <div className="header-logo d-flex justify-content-center">
                                <a href="index.html">
                                    <img src="../../assets/images/logo/logo-2.webp" alt="Learts Logo" />
                                </a>
                            </div>
                        </div>
                        {/* Header Logo End */}
                        {/* Header Tools Start */}
                        <div className="col">
                            <div className="header-tools justify-content-end">
                                <div className="header-login">
                                    <a href="my-account.html">
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                </div>
                                <div className="header-search d-none d-sm-block">
                                    <a href="#offcanvas-search" className="offcanvas-toggle">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </a>
                                </div>
                                <div className="header-wishlist">
                                    <a href="#offcanvas-wishlist" className="offcanvas-toggle">
                                        <span className="wishlist-count">3</span>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </a>
                                </div>
                                <div className="header-cart">
                                    <a href="#offcanvas-cart" className="offcanvas-toggle">
                                        <span className="cart-count">3</span>
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Header Tools End */}
                    </div>
                </div>
            </div>
            {/* Header Sticky Section End */}
            {/* OffCanvas Search Start */}
            <div id="overlay-menu" className="offcanvas offcanvas-overlay-menu">
                <div className="inner">
                    <button className="offcanvas-close">×</button>
                    <div className="overlay-menu">
                        <ul>
                            <li>
                                <a href="index.html">
                                    <span className="menu-text">Начало</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop.html">
                                    <span className="menu-text">Магазин</span>
                                </a>
                            </li>
                            <li>
                                <a href="about-us.html">
                                    <span className="menu-text">За нас</span>
                                </a>
                            </li>
                            <li>
                                <a href="wishlist.html">
                                    <span className="menu-text">Любими</span>
                                </a>
                            </li>
                            <li>
                                <a href="contact-us.html">
                                    <span className="menu-text">Контакти</span>
                                </a>
                            </li>
                            <li>
                                <a href="privacy-policy.html">
                                    <span className="menu-text">Политика за сигурност</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* OffCanvas Search End */}
            {/* Mobile Header Section Start */}
            <div className="mobile-header bg-white section d-xl-none">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Header Logo Start */}
                        <div className="col">
                            <div className="header-logo">
                                <a href="index.html">
                                    <img src="../../assets/images/logo/logo-2.webp" alt="Learts Logo" />
                                </a>
                            </div>
                        </div>
                        {/* Header Logo End */}
                        {/* Header Tools Start */}
                        <div className="col-auto">
                            <div className="header-tools justify-content-end">
                                <div className="header-login d-none d-sm-block">
                                    <a href="my-account.html">
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                </div>
                                <div className="header-search d-none d-sm-block">
                                    <a href="#offcanvas-search" className="offcanvas-toggle">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </a>
                                </div>
                                <div className="header-wishlist d-none d-sm-block">
                                    <a href="#offcanvas-wishlist" className="offcanvas-toggle">
                                        <span className="wishlist-count">3</span>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </a>
                                </div>
                                <div className="header-cart">
                                    <a href="#offcanvas-cart" className="offcanvas-toggle">
                                        <span className="cart-count">3</span>
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </a>
                                </div>
                                <div className="mobile-menu-toggle">
                                    <a href="#offcanvas-mobile-menu" className="offcanvas-toggle">
                                        <svg viewBox="0 0 800 600">
                                            <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top" />
                                            <path d="M300,320 L540,320" className="middle" />
                                            <path
                                                d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                                className="bottom"
                                                transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Header Tools End */}
                    </div>
                </div>
            </div>
            {/* Mobile Header Section End */}
            {/* Mobile Header Section Start */}
            <div className="mobile-header sticky-header bg-white section d-xl-none">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Header Logo Start */}
                        <div className="col">
                            <div className="header-logo">
                                <a href="index.html">
                                    <img src="../../assets/images/logo/logo-2.webp" alt="Learts Logo" />
                                </a>
                            </div>
                        </div>
                        {/* Header Logo End */}
                        {/* Header Tools Start */}
                        <div className="col-auto">
                            <div className="header-tools justify-content-end">
                                <div className="header-login d-none d-sm-block">
                                    <a href="my-account.html">
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                </div>
                                <div className="header-search d-none d-sm-block">
                                    <a href="#offcanvas-search" className="offcanvas-toggle">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </a>
                                </div>
                                <div className="header-wishlist d-none d-sm-block">
                                    <a href="#offcanvas-wishlist" className="offcanvas-toggle">
                                        <span className="wishlist-count">3</span>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </a>
                                </div>
                                <div className="header-cart">
                                    <a href="#offcanvas-cart" className="offcanvas-toggle">
                                        <span className="cart-count">3</span>
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </a>
                                </div>
                                <div className="mobile-menu-toggle">
                                    <a href="#offcanvas-mobile-menu" className="offcanvas-toggle">
                                        <svg viewBox="0 0 800 600">
                                            <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top" />
                                            <path d="M300,320 L540,320" className="middle" />
                                            <path
                                                d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                                className="bottom"
                                                transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Header Tools End */}
                    </div>
                </div>
            </div>
            {/* Mobile Header Section End */}
            {/* OffCanvas Search Start */}
            <div id="offcanvas-search" className="offcanvas offcanvas-search">
                <div className="inner">
                    <div className="offcanvas-search-form">
                        <button className="offcanvas-close">×</button>
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
            </div>
            {/* OffCanvas Search End */}
            {/* OffCanvas Wishlist Start */}
            <Offcanvas show={showWishlist} onHide={toggleWishlist} placement="end" className="offcanvas offcanvas-wishlist">
                <div className="inner">
                    <Offcanvas.Header className="head">
                        <span className="title">Любми</span>
                        <button className="offcanvas-close" onClick={toggleWishlist}>
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
            <div id="offcanvas-cart" className="offcanvas offcanvas-cart">
                <div className="inner">
                    <div className="head">
                        <span className="title">Количка</span>
                        <button className="offcanvas-close">×</button>
                    </div>
                    <div className="body customScroll">
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
                    </div>
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
            </div>
            {/* OffCanvas Cart End */}
            {/* OffCanvas Search Start */}
            <div id="offcanvas-mobile-menu" className="offcanvas offcanvas-mobile-menu">
                <div className="inner customScroll">
                    <div className="offcanvas-menu-search-form">
                        <form action="#">
                            <input type="text" placeholder="Search..." />
                            <button>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </form>
                    </div>
                    <div className="offcanvas-menu">
                        <ul>
                            <li>
                                <a href="index.html">
                                    <span className="menu-text">Начало</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop.html">
                                    <span className="menu-text">Магазин</span>
                                </a>
                            </li>
                            <li>
                                <a href="about-us.html">
                                    <span className="menu-text">За нас</span>
                                </a>
                            </li>
                            <li>
                                <a href="wishlist.html">
                                    <span className="menu-text">Любими</span>
                                </a>
                            </li>
                            <li>
                                <a href="contact-us.html">
                                    <span className="menu-text">Контакти</span>
                                </a>
                            </li>
                            <li>
                                <a href="privacy-policy.html">
                                    <span className="menu-text">Политика за сигурност</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="offcanvas-buttons">
                        <div className="header-tools">
                            <div className="header-login">
                                <a href="my-account.html">
                                    <FontAwesomeIcon icon={faUser} />
                                </a>
                            </div>
                            <div className="header-wishlist">
                                <a href="wishlist.html">
                                    <span>3</span>
                                    <FontAwesomeIcon icon={faHeart} />
                                </a>
                            </div>
                            <div className="header-cart">
                                <a href="shopping-cart.html">
                                    <span className="cart-count">3</span>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="offcanvas-social">
                        <a href="#">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </div>
                </div>
            </div>
            {/* OffCanvas Search End */}
            <div className="offcanvas-overlay" />
            {/* Slider main container Start */}
            <div className="section section-fluid">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 5000 }}
                    pagination={{
                        clickable: true,
                        el: '.home8-slider-pagination',
                    }}
                    className="home8-slider">
                    {/* Slide 1 */}
                    <SwiperSlide className="home8-slide-item">
                        <div className="home8-slide-image">
                            <img src="/assets/images/slider/slide-1.webp" alt="Slide 1" />
                        </div>
                        <div className="home8-slide-content">
                            <span className="sub-title">Специално за теб</span>
                            <h2 className="title">
                                Романтично ястие на Бъфри <br /> За Него
                            </h2>
                            <div className="link">
                                <a href="/shop">Вземи сега</a>
                            </div>
                        </div>
                        <div className="home8-slide-pages">
                            <span className="current">1</span>
                            <span className="border" />
                            <span className="total">3</span>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide className="home8-slide-item">
                        <div className="home8-slide-image">
                            <img src="/assets/images/slider/slide-2.webp" alt="Slide 2" />
                        </div>
                        <div className="home8-slide-content">
                            <span className="sub-title">Специално за теб</span>
                            <h2 className="title">
                                Държач за бижута Dorme <br /> За нея
                            </h2>
                            <div className="link">
                                <a href="/shop">Вземи сега</a>
                            </div>
                        </div>
                        <div className="home8-slide-pages">
                            <span className="current">2</span>
                            <span className="border" />
                            <span className="total">3</span>
                        </div>
                    </SwiperSlide>

                    {/* Slide 3 */}
                    <SwiperSlide className="home8-slide-item">
                        <div className="home8-slide-image">
                            <img src="/assets/images/slider/slide-3.webp" alt="Slide 3" />
                        </div>
                        <div className="home8-slide-content">
                            <span className="sub-title">Специално за теб</span>
                            <h2 className="title">
                                Прясно набрани плодове <br /> За теб
                            </h2>
                            <div className="link">
                                <a href="/shop">Вземи сега</a>
                            </div>
                        </div>
                        <div className="home8-slide-pages">
                            <span className="current">3</span>
                            <span className="border" />
                            <span className="total">3</span>
                        </div>
                    </SwiperSlide>

                    {/* Контейнер за пагинацията */}
                    <div className="home8-slider-pagination swiper-pagination" />
                </Swiper>
            </div>
            {/* Slider main container End */}
            {/* Product Section Start */}
            <div className="section section-padding">
                <div className="container">
                    <div className="row learts-mb-30">
                        <div className="col-md-auto col-12 learts-mb-20">
                            {/* Section Title Start */}
                            <div className="section-title2 m-0">
                                <h2 className="title title-icon-right">Сделка на деня</h2>
                            </div>
                            {/* Section Title End */}
                        </div>
                        <div className="col-md col-12 learts-mb-20 d-flex justify-content-lg-end">
                            <div className="countdown2" data-countdown="2024/01/01" />
                        </div>
                    </div>
                    {/* Products Start */}

                    <div className="product-carousel">
                        <Slider {...settings}>
                            {/* Продукт 1 */}
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="/product-details" className="image">
                                            <span className="product-badges">
                                                <span className="onsale">-13%</span>
                                            </span>
                                            <img src="/assets/images/product/s270/product-1.webp" alt="Product" />
                                            <img className="image-hover" src="/assets/images/product/s270/product-1-hover.webp" alt="Product Hover" />
                                        </a>
                                        <button className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="/product-details">Комплект за селски празник</a>
                                        </h6>
                                        <span className="price">
                                            <span className="old">€45.00</span>
                                            <span className="new">€39.00</span>
                                        </span>
                                        {/* Бутоните и рейтингът тук... */}
                                        <div className="product-buttons">
                                            <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </a>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </a>
                                        </div>
                                        <div className="product-stock-status">
                                            <div className="bar">
                                                <div className="progress" style={{ width: '50%' }} />
                                            </div>
                                            <span className="sold">
                                                Продадени: <span>5</span>
                                            </span>
                                            <span className="available">
                                                Налични: <span>10</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Продукт 2 */}
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="/product-details" className="image">
                                            <span className="product-badges">
                                                <span className="onsale">-13%</span>
                                            </span>
                                            <img src="/assets/images/product/s270/product-1.webp" alt="Product" />
                                            <img className="image-hover" src="/assets/images/product/s270/product-1-hover.webp" alt="Product Hover" />
                                        </a>
                                        <button className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="/product-details">Комплект за селски празник</a>
                                        </h6>
                                        <span className="price">
                                            <span className="old">€45.00</span>
                                            <span className="new">€39.00</span>
                                        </span>
                                        {/* Бутоните и рейтингът тук... */}
                                        <div className="product-buttons">
                                            <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </a>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката" tabIndex="0">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </a>
                                        </div>
                                        <div className="product-stock-status">
                                            <div className="bar">
                                                <div className="progress" style={{ width: '70%' }} />
                                            </div>
                                            <span className="sold">
                                                Продадени: <span>7</span>
                                            </span>
                                            <span className="available">
                                                Налични: <span>10</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Продукт 3 */}
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="/product-details" className="image">
                                            <span className="product-badges">
                                                <span className="onsale">-13%</span>
                                            </span>
                                            <img src="/assets/images/product/s270/product-1.webp" alt="Product" />
                                            <img className="image-hover" src="/assets/images/product/s270/product-1-hover.webp" alt="Product Hover" />
                                        </a>
                                        <button className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="/product-details">Комплект за селски празник</a>
                                        </h6>
                                        <span className="price">
                                            <span className="old">€45.00</span>
                                            <span className="new">€39.00</span>
                                        </span>
                                        {/* Бутоните и рейтингът тук... */}
                                        <div className="product-buttons">
                                            <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </a>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката" tabIndex="0">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </a>
                                        </div>
                                        <div className="product-stock-status">
                                            <div className="bar">
                                                <div className="progress" style={{ width: '30%' }} />
                                            </div>
                                            <span className="sold">
                                                Продадени: <span>3</span>
                                            </span>
                                            <span className="available">
                                                Налични: <span>10</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Продукт 4 */}
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="/product-details" className="image">
                                            <span className="product-badges">
                                                <span className="onsale">-13%</span>
                                            </span>
                                            <img src="/assets/images/product/s270/product-1.webp" alt="Product" />
                                            <img className="image-hover" src="/assets/images/product/s270/product-1-hover.webp" alt="Product Hover" />
                                        </a>
                                        <button className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="/product-details">Комплект за селски празник</a>
                                        </h6>
                                        <span className="price">
                                            <span className="old">€45.00</span>
                                            <span className="new">€39.00</span>
                                        </span>
                                        {/* Бутоните и рейтингът тук... */}
                                        <div className="product-buttons">
                                            <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </a>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката" tabIndex="0">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </a>
                                        </div>
                                        <div className="product-stock-status">
                                            <div className="bar">
                                                <div className="progress" style={{ width: '40%' }} />
                                            </div>
                                            <span className="sold">
                                                Продадени: <span>4</span>
                                            </span>
                                            <span className="available">
                                                Налични: <span>10</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>

                    {/* Products End */}
                </div>
            </div>
            {/* Product Section End */}
            {/* Sale Banner Start */}
            <div className="section section-fluid">
                <div className="row g-0">
                    <div className="col-lg-6 col-12">
                        <div className="sale-banner9 bg-light">
                            <div className="inner">
                                <div className="content">
                                    <h3 className="title">Нова колекция</h3>
                                    <span className="cuppon">
                                        ВСИЧКО С КОД: <span className="code">NEW 30</span>
                                    </span>
                                    <span className="offer">- 30%</span>
                                    <a href="shop.html" className="btn btn-dark btn-hover-primary">
                                        Вземи сега
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="sale-banner9-image">
                            <img src="../../assets/images/banner/sale/sale-banner9-1.webp" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Sale Banner End */}
            {/* Product Section Start */}
            <div className="section section-padding">
                <div className="container">
                    <div className="row justify-content-between">
                        {/* Section Title Start */}
                        <div className="col-lg-auto col-12">
                            <div className="section-title2">
                                <h2 className="title">Най-популярни продукти</h2>
                                <p>Следвайте най-популярните тенденции и се възползвайте от ексклузивни артикули от магазина за ръкоделия Learts.</p>
                            </div>
                        </div>
                        {/* Section Title End */}
                        {/* Tab Button List Start */}
                        <div className="col-lg-auto col-12 learts-mb-30">
                            <nav className="nav mx-n1 learts-mb-n10">
                                <a className="btn btn-md btn-light btn-hover-primary active mx-1 learts-mb-10" data-bs-toggle="tab" href="#tab-gift-ideas">
                                    идеи за подаръци
                                </a>
                                <a className="btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10" data-bs-toggle="tab" href="#tab-home-decor">
                                    домашен декор
                                </a>
                                <a className="btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10" data-bs-toggle="tab" href="#tab-kitchen">
                                    кухня
                                </a>
                            </nav>
                        </div>
                        {/* Section Title End */}
                    </div>
                    <div className="prodyct-tab-content1 tab-content">
                        <div className="tab-pane fade show active" id="tab-gift-ideas">
                            {/* Products Start */}
                            <div className="products row row-cols-md-3 row-cols-sm-2 row-cols-1">
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Ключови орнаменти с висулка</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="outofstock">
                                                        <FontAwesomeIcon icon={faFrown} />
                                                    </span>
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <div className="product-options">
                                                <ul className="Цвятs">
                                                    <li style={{ backgroundColor: '#000000' }}>Цвят one</li>
                                                    <li style={{ backgroundColor: '#b2483c' }}>Цвят two</li>
                                                </ul>
                                                <ul className="sizes">
                                                    <li>Large</li>
                                                    <li>Medium</li>
                                                    <li>Small</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Декоративна коледна лисица</a>
                                            </h6>
                                            <span className="price">€50.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Модерен камера</a>
                                            </h6>
                                            <span className="price">€380.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Щастливо дървено слонче</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Цифрова камера</a>
                                            </h6>
                                            <span className="price">€350.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">LCD таблет за писане</a>
                                            </h6>
                                            <span className="price">€250.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Products End */}
                        </div>
                        <div className="tab-pane fade" id="tab-home-decor">
                            {/* Products Start */}
                            <div className="products row row-cols-md-3 row-cols-sm-2 row-cols-1">
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Цифрова камера</a>
                                            </h6>
                                            <span className="price">€350.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">LCD таблет за писане</a>
                                            </h6>
                                            <span className="price">€250.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Ключови орнаменти с висулка</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="outofstock">
                                                        <FontAwesomeIcon icon={faFrown} />
                                                    </span>
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <div className="product-options">
                                                <ul className="Цвятs">
                                                    <li style={{ backgroundColor: '#000000' }}>Цвят one</li>
                                                    <li style={{ backgroundColor: '#b2483c' }}>Цвят two</li>
                                                </ul>
                                                <ul className="sizes">
                                                    <li>Large</li>
                                                    <li>Medium</li>
                                                    <li>Small</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Декоративна коледна лисица</a>
                                            </h6>
                                            <span className="price">€50.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Модерен камера</a>
                                            </h6>
                                            <span className="price">€380.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Щастливо дървено слонче</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Products End */}
                        </div>
                        <div className="tab-pane fade" id="tab-kitchen">
                            {/* Products Start */}
                            <div className="products row row-cols-md-3 row-cols-sm-2 row-cols-1">
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Модерен камера</a>
                                            </h6>
                                            <span className="price">€380.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Щастливо дървено слонче</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Цифрова камера</a>
                                            </h6>
                                            <span className="price">€350.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">LCD таблет за писане</a>
                                            </h6>
                                            <span className="price">€250.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Ключови орнаменти с висулка</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    <span className="outofstock">
                                                        <FontAwesomeIcon icon={faFrown} />
                                                    </span>
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <div className="product-options">
                                                <ul className="Цвятs">
                                                    <li style={{ backgroundColor: '#000000' }}>Цвят one</li>
                                                    <li style={{ backgroundColor: '#b2483c' }}>Цвят two</li>
                                                </ul>
                                                <ul className="sizes">
                                                    <li>Large</li>
                                                    <li>Medium</li>
                                                    <li>Small</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Декоративна коледна лисица</a>
                                            </h6>
                                            <span className="price">€50.00</span>
                                            <div className="product-buttons">
                                                <a href="#" onClick={handleOpenQuickView} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </a>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Products End */}
                        </div>
                    </div>
                    <div className="row g-0 justify-content-center learts-mt-50">
                        <a href="#" className="btn p-0">
                            <FontAwesomeIcon icon={faPlus} /> виж повече ...
                        </a>
                    </div>
                </div>
            </div>
            {/* Product Section End */}
            {/* CTA Section Start */}
            <div className="section section-fluid">
                <div className="home1-slide-item section-padding swiper-slide-active quick-link-shop">
                    <div className="home1-slide1-content">
                        <span className="bg" />
                        <span className="slide-border" />
                        <span className="icon">
                            <img src="../../assets/images/slider/slide-1-1.webp" alt="Slide Icon" />
                        </span>
                        <h2 className="title">Магазин за занаяти</h2>
                        <h3 className="sub-title">Специално за теб</h3>
                        <div className="link">
                            <a href="shop.html">Вземи сега</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* CTA Section End */}
            {/* Feature Section Start */}
            <div className="section section-padding">
                <div className="container">
                    <div className="row learts-mb-n30">
                        <div className="col-xl-3 col-lg-4 col-12 me-auto learts-mb-30">
                            <h1 className="fw-400">Почувствайте разликата, когато пазарувате в Learts!</h1>
                        </div>
                        <div className="col-lg-8 col-12 learts-mb-30">
                            <div className="row learts-mb-n30">
                                <div className="col-md-6 col-12 learts-mb-30">
                                    <p className="text-heading fw-600 learts-mb-10">Безплатна доставка</p>
                                    <p>След като получим поръчката Ви, ще подготвим продуктите в рамките на 3 до 5 работни дни.</p>
                                </div>
                                <div className="col-md-6 col-12 learts-mb-30">
                                    <p className="text-heading fw-600 learts-mb-10">Безплатни връщания</p>
                                    <p>Приемаме връщане на новозакупени продукти в рамките на 7 дни след плащането.</p>
                                </div>
                                <div className="col-md-6 col-12 learts-mb-30">
                                    <p className="text-heading fw-600 learts-mb-10">Превъзходно качество</p>
                                    <p>Наш приоритет е да гарантираме високото качество на всеки наш продукт.</p>
                                </div>
                                <div className="col-md-6 col-12 learts-mb-30">
                                    <p className="text-heading fw-600 learts-mb-10">Безплатно опаковане</p>
                                    <p>При поискване предлагаме безплатна подаръчна опаковка за продуктите, закупени от нашия магазин.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Feature Section End */}
            {/* Instagram Section Start */}
            <div className="section section-padding border-top">
                <div className="container">
                    {/* Section Title Start */}
                    <div className="section-title2 text-center">
                        <h3 className="sub-title">Последвайте ни в Instagram</h3>
                        <h2 className="title">@learts_shop</h2>
                    </div>
                    {/* Section Title End */}
                    <div className="instafeed instafeed-carousel instafeed-carousel1">
                        <Slider {...settingsInsta}>
                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
            {/* Instagram Section End */}
            <div className="footer1-section section section-padding bg-light">
                <div className="container">
                    <div className="row text-center row-cols-1">
                        <div className="footer1-logo col text-center">
                            <img src="../../assets/images/logo/logo.webp" alt="" />
                        </div>
                        <div className="footer1-menu col">
                            <ul className="widget-menu justify-content-center">
                                <li>
                                    <a href="about-us.html">За нас</a>
                                </li>
                                <li>
                                    <a href="contact-us.html">Контакти</a>
                                </li>
                                <li>
                                    <a href="support.html">Поддръжка</a>
                                </li>
                                <li>
                                    <a href="privacy-policy.html">Политика за сигурност</a>
                                </li>
                                <li>
                                    <a href="faq.html">Често задавани въпроси</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer1-subscribe d-flex flex-column col">
                            <form id="mc-form" className="mc-form widget-subscibe">
                                <input id="mc-email" autoComplete="off" type="email" placeholder="Въведете вашия имейл адрес" />
                                <button id="mc-submit" className="btn btn-dark">
                                    Абонирайте се
                                </button>
                            </form>
                            {/* mailchimp-alerts Start */}
                            <div className="mailchimp-alerts text-centre">
                                <div className="mailchimp-submitting" />
                                {/* mailchimp-submitting end */}
                                <div className="mailchimp-success text-success" />
                                {/* mailchimp-success end */}
                                <div className="mailchimp-error text-danger" />
                                {/* mailchimp-error end */}
                            </div>
                            {/* mailchimp-alerts end */}
                        </div>
                        <div className="footer1-social col">
                            <ul className="widget-social justify-content-center">
                                <li className="hintT-top" data-hint="Twitter">
                                    {' '}
                                    <a href="https://www.twitter.com/">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                </li>
                                <li className="hintT-top" data-hint="Facebook">
                                    {' '}
                                    <a href="https://www.facebook.com/">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                </li>
                                <li className="hintT-top" data-hint="Instagram">
                                    {' '}
                                    <a href="https://www.instagram.com/">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </li>
                                <li className="hintT-top" data-hint="Youtube">
                                    {' '}
                                    <a href="https://www.youtube.com/">
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer1-copyright col">
                            <p className="copyright">
                                © 2023 learts. All Rights Reserved | <strong>(+00) 123 567990</strong> |<a href="mailto:contact@learts.com">contact@learts.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}

            <Modal show={showQuickView} onHide={handleCloseQuickView} size="lg" className="quickViewModal">
                <Modal.Body>
                    <a className="close" onClick={handleCloseQuickView}>
                        ×
                    </a>
                    <div className="row learts-mb-n30">
                        {/* Product Images Start */}
                        <div className="col-lg-6 col-12 learts-mb-30">
                            <div className="product-images">
                                <div className="product-gallery-slider-quickview">
                                    <Slider {...settingsProductQuickView}>
                                        <div className="product-zoom">
                                            <img src="../../assets/images/product/single/1/product-1.webp" alt="" />
                                        </div>
                                        <div className="product-zoom">
                                            <img src="../../assets/images/product/single/1/product-1.webp" alt="" />
                                        </div>
                                        <div className="product-zoom">
                                            <img src="../../assets/images/product/single/1/product-1.webp" alt="" />
                                        </div>
                                        <div className="product-zoom">
                                            <img src="../../assets/images/product/single/1/product-1.webp" alt="" />
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                        {/* Product Images End */}
                        {/* Product Summery Start */}
                        <div className="col-lg-6 col-12 overflow-hidden position-relative learts-mb-30">
                            <div className="product-summery customScroll">
                                <h3 className="product-title">Почистване на лопатка и четка</h3>
                                <div className="product-price">€38.00 – €50.00</div>
                                <div className="product-description">
                                    <p>
                                        Стандартният отрязък от Lorem Ipsum, използван от 1500 г. насам, е поместен по-долу за тези, които се интересуват. Секции 1.10.32 и 1.10.33
                                        от "de Finibus Bonorum et Malorum" на Цицерон също са поместени в оригиналния им формат, заедно с превода им на английски език, направен от
                                        H. Rackham през 1914г.
                                    </p>
                                </div>
                                <div className="product-variations">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="label">
                                                    <span>Размер</span>
                                                </td>
                                                <td className="value">
                                                    <div className="product-sizes">
                                                        <a href="#">Large</a>
                                                        <a href="#">Medium</a>
                                                        <a href="#">Small</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Количество</span>
                                                </td>
                                                <td className="value">
                                                    <div className="product-quantity">
                                                        <span className="qty-btn minus">
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </span>
                                                        <input type="text" className="input-qty" defaultValue={1} />
                                                        <span className="qty-btn plus">
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="product-buttons">
                                    <a href="#" className="btn btn-icon btn-outline-body btn-hover-dark">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </a>
                                    <a href="#" className="btn btn-dark btn-outline-hover-dark">
                                        <FontAwesomeIcon icon={faShoppingCart} /> Добавяне в количката
                                    </a>
                                    <a href="#" className="btn btn-icon btn-outline-body btn-hover-dark">
                                        <FontAwesomeIcon icon={faRandom} />
                                    </a>
                                </div>
                                <div className="product-meta mb-0">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="label">
                                                    <span>SKU</span>
                                                </td>
                                                <td className="value">0404019</td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Категория</span>
                                                </td>
                                                <td className="value">
                                                    <ul className="product-category">
                                                        <li>
                                                            <a href="#">Кухня</a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Етикети</span>
                                                </td>
                                                <td className="value">
                                                    <ul className="product-tags">
                                                        <li>
                                                            <a href="#">handmade</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">learts</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">mug</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">product</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">learts</a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Споделете на</span>
                                                </td>
                                                <td className="va">
                                                    <div className="product-share">
                                                        <a href="#">
                                                            <FontAwesomeIcon icon={faFacebookF} />
                                                        </a>
                                                        <a href="#">
                                                            <FontAwesomeIcon icon={faTwitter} />
                                                        </a>
                                                        <a href="#">
                                                            <FontAwesomeIcon icon={faGooglePlusG} />
                                                        </a>
                                                        <a href="#">
                                                            <FontAwesomeIcon icon={faPinterest} />
                                                        </a>
                                                        <a href="#">
                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Product Summery End */}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
