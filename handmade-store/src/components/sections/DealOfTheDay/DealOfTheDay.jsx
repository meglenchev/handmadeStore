import { useContext } from 'react';

import Countdown from 'react-countdown';

import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../../utils/SliderArrows.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { settings } from '../../../utils/utils.js';
import QuickViewContext from '../../../context/QuickViewContext.jsx';
import { useSlidesToShow } from '../../../hooks/useSlidesToShow.jsx';

import { DEAL_PRODUCTS } from '../../../data/products.js';
import ShopContext from '../../../context/ShopContext.jsx';

const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span>Сделката е изтекла!</span>;
    }

    return (
        <div className="countdown2">
            <div className="count">
                <span className="amount">{days}</span>
                <span className="period">Days</span>
            </div>
            <div className="count">
                <span className="amount">{hours}</span>
                <span className="period">Hours</span>
            </div>
            <div className="count">
                <span className="amount">{minutes}</span>
                <span className="period">Minutes</span>
            </div>
            <div className="count">
                <span className="amount">{seconds}</span>
                <span className="period">Seconds</span>
            </div>
        </div>
    );
};

const baseSettings = {
    ...settings,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

export function DealOfTheDay() {
    const { openQuickView } = useContext(QuickViewContext);
    const { addToCart, toggleWishlist } = useContext(ShopContext);

    const expiryDate = new Date('2026-12-31T23:59:59');

    const settingsDealOfTheDay = {
        ...baseSettings,
        slidesToShow: useSlidesToShow(),
    };

    const item = {};

    return (
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
                        <Countdown date={expiryDate} renderer={CountdownRenderer} />
                    </div>
                </div>
                <div className="product-carousel">
                    <Slider key="deal-of-the-day" {...settingsDealOfTheDay}>
                        {/* Products Start */}
                        {DEAL_PRODUCTS.map((product) => (
                            <div key={product.id} className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="/product-details" className="image">
                                            <span className="product-badges">
                                                <span className="onsale">-13%</span>
                                            </span>
                                            <img src={product.image} alt={product.title} />
                                            <img className="image-hover" src={product.hoverImage} alt={product.title} />
                                        </a>
                                        <button
                                            onClick={() => toggleWishlist(product)}
                                            className={product.hot ? 'add-to-wishlist hintT-left added' : 'add-to-wishlist hintT-left'} // Да корегирам условие за класа след като добавя context за добавяне в localStorage
                                            data-hint={product.hot ? 'Премахване от любими' : 'Добавяне в любими'}>
                                            {' '}
                                            // Да корегирам условие за класа след като добавя context за добавяне в localStorage
                                            <FontAwesomeIcon icon="heart" />
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="/product-details">{product.title}</a>
                                        </h6>
                                        <span className="price">
                                            <span className="old">€{product.oldPrice.toFixed(2)}</span>
                                            <span className="new">€{product.newPrice.toFixed(2)}</span>
                                        </span>
                                        {/* Бутоните и рейтингът тук... */}
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(product)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <button onClick={() => addToCart(product)} className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </button>
                                        </div>
                                        <div className="product-stock-status">
                                            <div className="bar">
                                                <div className="progress" style={{ width: `${(product.sold / product.stock) * 100}%` }} />
                                            </div>
                                            <span className="sold">
                                                Продадени: <span>{product.sold}</span>
                                            </span>
                                            <span className="available">
                                                Налични: <span>{product.stock}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Products End */}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
