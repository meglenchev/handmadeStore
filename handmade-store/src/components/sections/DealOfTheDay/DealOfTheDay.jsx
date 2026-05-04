import { useContext } from 'react';

import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../../utils/SliderArrows.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { settings } from '../../../utils/utils.js';
import QuickViewContext from '../../../context/QuickViewContext.jsx';
import { useSlidesToShow } from '../../../hooks/useSlidesToShow.jsx';

export function DealOfTheDay() {
    const { openQuickView } = useContext(QuickViewContext);

    const settingsDealOfTheDay = {
        ...settings,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToShow: useSlidesToShow(),
    };

    const item = {};

    return (
        <div className="product-carousel">
            <Slider key="deal-of-the-day" {...settingsDealOfTheDay}>
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
                                <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
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
                                <button onClick={() => openQuickView()} className="product-button hintT-top" data-hint="Бърз преглед">
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
                                <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
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

                {/* Продукт 5 */}
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
    );
}
