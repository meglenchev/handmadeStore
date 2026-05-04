import QuickViewContext from '../../context/QuickViewContext.jsx';
import { useContext, useEffect, useState } from 'react';
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
import { useSlidesToShow } from '../../hooks/useSlidesToShow.jsx';
import { DealOfTheDay } from '../../components/sections/DealOfTheDay/DealOfTheDay.jsx';
import { ProductsInFocus } from './components/ProductsInFocus.jsx';

export function Home() {
    const { openQuickView } = useContext(QuickViewContext);
    const item = {}; // Тук трябва да се зареди реалният продукт, който искате да показвате в Quick View

    // Instagram Slider settings
    const settingsInsta = {
        ...settings,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToShow: useSlidesToShow(),
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
                    {/* Products Of The Day Start */}
                    <DealOfTheDay />
                    {/* Products Of The Day End */}
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
            {/* Product In Focus */}
            <ProductsInFocus />
            {/* Product In Focus End */}
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
