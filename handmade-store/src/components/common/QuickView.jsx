import QuickViewContext from '@/context/QuickViewContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import ShopContext from '@/context/ShopContext.jsx';
import WishlistContext from '@/context/WishlistContext.jsx';
import { useProductQuantity } from '@/hooks/useProductQuantity.jsx';
import { settingsProductQuickView } from '@/utils/utils.jsx';

export function QuickView() {
    const { showQuickView, productData, onCloseQuickView } = useContext(QuickViewContext);
    const { cart, addToCart } = useContext(ShopContext);
    const { toggleWishlist, wishlist } = useContext(WishlistContext);

    const { quantity, handleMinus, handlePlus } = useProductQuantity(productData, cart);

    if (!productData) {
        return null;
    }

    const isInWishlist = wishlist.some((item) => item.id === productData.id);

    return (
        <Modal show={showQuickView} onHide={onCloseQuickView} size="lg" className="quickViewModal">
            <Modal.Body>
                <button className="close" onClick={onCloseQuickView}>
                    ×
                </button>
                <div className="row learts-mb-n30">
                    {/* Product Images Start */}
                    <div className="col-lg-6 col-12 learts-mb-30">
                        <div className="product-images">
                            <div className="product-gallery-slider-quickview">
                                <Slider {...settingsProductQuickView}>
                                    <div className="product-zoom">
                                        <img src={productData.image} alt={productData.title} />
                                    </div>
                                    <div className="product-zoom">
                                        <img src={productData.hoverImage} alt={productData.title} />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                    {/* Product Images End */}
                    {/* Product Summery Start */}
                    <div className="col-lg-6 col-12 overflow-hidden position-relative learts-mb-30">
                        <div className="product-summery customScroll">
                            <h3 className="product-title">{productData.title}</h3>
                            <div className="product-price">
                                €{productData.newPrice.toFixed(2)} – €{productData.oldPrice.toFixed(2)}
                            </div>
                            <div className="product-description">
                                <p>{productData.descriptiption}</p>
                            </div>
                            <div className="product-variations">
                                <table>
                                    <tbody>
                                        {productData.size.length > 0 && (
                                            <tr>
                                                <td className="label">
                                                    <span>Размер</span>
                                                </td>
                                                <td className="value">
                                                    <div className="product-sizes">
                                                        {productData.size.map((s) => (
                                                            <button type="button" key={s}>
                                                                {s}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {productData.stock > 1 && (
                                            <tr>
                                                <td className="label">
                                                    <span>Количество</span>
                                                </td>
                                                <td className="value">
                                                    <div className="product-quantity">
                                                        <span onClick={handleMinus} className="qty-btn minus">
                                                            <FontAwesomeIcon icon="minus" />
                                                        </span>
                                                        <input type="text" className="input-qty" value={quantity} readOnly />
                                                        <span onClick={handlePlus} className="qty-btn plus">
                                                            <FontAwesomeIcon icon="plus" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="product-buttons">
                                <button
                                    onClick={() => toggleWishlist(productData)}
                                    className={`btn btn-icon btn-outline-body btn-hover-dark btn-add-to-wishlist ${isInWishlist ? 'added' : ''}`}>
                                    <FontAwesomeIcon icon="heart" />
                                </button>

                                <button onClick={() => addToCart(productData, quantity)} className="btn btn-dark btn-outline-hover-dark" disabled={productData.outofstock}>
                                    <FontAwesomeIcon icon="shopping-cart" /> {productData.outofstock ? 'Продукта не е наличен' : 'Добавяне в количката'}
                                </button>
                            </div>
                            <div className="product-meta mb-0">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="label">
                                                <span>Категория</span>
                                            </td>
                                            <td className="value">
                                                <ul className="product-category">
                                                    <li>
                                                        <a href="#">{productData.category}</a>
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
                                                        <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                                                    </a>
                                                    <a href="#">
                                                        <FontAwesomeIcon icon={['fab', 'pinterest']} />
                                                    </a>
                                                    <a href="#">
                                                        <FontAwesomeIcon icon="envelope" />
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
    );
}
