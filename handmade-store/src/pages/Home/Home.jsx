import QuickViewContext from '../../context/QuickViewContext.jsx';
import { useContext, useState } from 'react';
import { Modal, Button, Offcanvas } from 'react-bootstrap';

import Slider from 'react-slick';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NextArrow, PrevArrow } from '../../utils/SliderArrows.jsx';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'swiper/css';
import 'swiper/css/pagination';
import { QuickView } from '../../components/common/QuickView.jsx';
import { settings } from '../../utils/utils.js';
import { Footer } from '../../components/layout/Footer.jsx';
import { Header } from '../../components/layout/Header.jsx';

export function Home() {
    const { openQuickView } = useContext(QuickViewContext);
    const item = {}; // Тук трябва да се зареди реалният продукт, който искате да показвате в Quick View

    // Instagram Slider settings
    const settingsInsta = {
        ...settings,
        dots: false,
        slidesToShow: 5,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <>
            {/* Site Header Start */}
            <Header />
            {/* Site Header End */}
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
                                            <FontAwesomeIcon icon="heart" />
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
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
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
                                            <FontAwesomeIcon icon="heart" />
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
                                            <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката" tabIndex="0">
                                                <FontAwesomeIcon icon="shopping-cart" />
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
                                            <FontAwesomeIcon icon="heart" />
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
                                            <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката" tabIndex="0">
                                                <FontAwesomeIcon icon="shopping-cart" />
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
                                            <FontAwesomeIcon icon="heart" />
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
                                            <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката" tabIndex="0">
                                                <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Ключови орнаменти с висулка</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                        <FontAwesomeIcon icon="frown" />
                                                    </span>
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon="heart" />
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
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Модерен камера</a>
                                            </h6>
                                            <span className="price">€380.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Щастливо дървено слонче</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Цифрова камера</a>
                                            </h6>
                                            <span className="price">€350.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">LCD таблет за писане</a>
                                            </h6>
                                            <span className="price">€250.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Цифрова камера</a>
                                            </h6>
                                            <span className="price">€350.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">LCD таблет за писане</a>
                                            </h6>
                                            <span className="price">€250.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Ключови орнаменти с висулка</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                        <FontAwesomeIcon icon="frown" />
                                                    </span>
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon="heart" />
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
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Модерен камера</a>
                                            </h6>
                                            <span className="price">€380.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Щастливо дървено слонче</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Модерен камера</a>
                                            </h6>
                                            <span className="price">€380.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Щастливо дървено слонче</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Цифрова камера</a>
                                            </h6>
                                            <span className="price">€350.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">LCD таблет за писане</a>
                                            </h6>
                                            <span className="price">€250.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">Ключови орнаменти с висулка</a>
                                            </h6>
                                            <span className="price">€35.00</span>
                                            <div className="product-buttons">
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                                                        <FontAwesomeIcon icon="frown" />
                                                    </span>
                                                    <span className="hot">hot</span>
                                                </span>
                                                <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                                <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon="heart" />
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
                                                <button href="#" onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
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
                            <FontAwesomeIcon icon="plus" /> виж повече ...
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
                                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                                </a>
                            </div>

                            <div className="instafeed-item-wrapper">
                                <a className="instafeed-item" href="#">
                                    <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                                </a>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
            {/* Instagram Section End */}
            <Footer />
            {/* Quick View Modal */}
            <QuickView />
        </>
    );
}
