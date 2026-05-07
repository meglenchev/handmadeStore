import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import QuickViewContext from '../../../context/QuickViewContext.jsx';

import { DEAL_PRODUCTS } from '../../../data/products.js';

export function ProductsInFocus() {
    const { openQuickView } = useContext(QuickViewContext);

    const item = {};

    return (
        <div className="section section-padding">
            <div className="container">
                <div className="row justify-content-between">
                    {/* Section Title Start */}
                    <div className="col-lg-auto col-12">
                        <div className="section-title2">
                            <h2 className="title">Продукти на фокус</h2>
                            <p>Следвайте най-популярните тенденции и се възползвайте от ексклузивни артикули от магазина за ръкоделия Learts.</p>
                        </div>
                    </div>
                    {/* Section Title End */}
                    {/* Tab Button List Start */}
                    <div className="col-lg-auto col-12 learts-mb-30">
                        <nav className="nav mx-n1 learts-mb-n10">
                            <a className="btn btn-md btn-light btn-hover-primary active mx-1 learts-mb-10" href="#tab-gift-ideas">
                                идеи за подаръци
                            </a>
                            <a className="btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10" href="#tab-home-decor">
                                домашен декор
                            </a>
                            <a className="btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10" href="#tab-kitchen">
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
                            {DEAL_PRODUCTS.map((product) => (
                                <div key={product.id} className="col">
                                    <div className="product">
                                        <div className="product-thumb">
                                            <a href="product-details.html" className="image">
                                                <span className="product-badges">
                                                    {product.outofstock && (
                                                        <span className="outofstock">
                                                            <FontAwesomeIcon icon="frown" />
                                                        </span>
                                                    )}
                                                    {product.hot && <span className="hot">hot</span>}
                                                </span>
                                                <img src={product.image} alt={product.title} />
                                                <img className="image-hover " src={product.hoverImage} alt={product.title} />
                                            </a>
                                            <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                                <FontAwesomeIcon icon="heart" />
                                            </a>
                                        </div>
                                        <div className="product-info">
                                            <h6 className="title">
                                                <a href="product-details.html">{product.title}</a>
                                            </h6>
                                            <span className="price">€{product.newPrice.toFixed(2)}</span>
                                            <div className="product-buttons">
                                                <button onClick={() => openQuickView(product)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                    <FontAwesomeIcon icon="search" />
                                                </button>
                                                <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                    <FontAwesomeIcon icon="shopping-cart" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
    );
}
