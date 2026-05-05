import { useContext } from 'react';

import Slider from 'react-slick';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NextArrow, PrevArrow } from '../../utils/SliderArrows.jsx';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { QuickView } from '../../components/common/QuickView.jsx';
import { settings } from '../../utils/utils.js';
import { Footer } from '../../components/layout/Footer.jsx';
import { Header } from '../../components/layout/Header.jsx';
import { useSlidesToShow } from '../../hooks/useSlidesToShow.jsx';
import { DealOfTheDay } from '../../components/sections/DealOfTheDay/DealOfTheDay.jsx';
import { ProductsInFocus } from './components/ProductsInFocus.jsx';
import { HomeSlider } from './components/HomeSlider.jsx';
import { SaleBaner } from '../../components/common/SaleBaner.jsx';

export function Home() {
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
            {/* Home Slider Start */}
            <HomeSlider />
            {/* Home Slider End */}
            {/* Products Of The Day Start */}
            <DealOfTheDay />
            {/* Products Of The Day Start End */}
            {/* Sale Banner Start */}
            <SaleBaner />
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
