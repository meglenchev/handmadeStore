import QuickViewContext from '../../context/QuickViewContext.jsx';
import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import { settings } from '../../utils/utils.js';
import { NextArrow, PrevArrow } from '../../utils/SliderArrows.jsx';

const settingsProductQuickView = {
    ...settings,
    dots: false,
    slidesToShow: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

export function QuickView() {
    const { showQuickView, productData, onCloseQuickView } = useContext(QuickViewContext);

    if (!productData) {
        return null;
    }

    console.log('Product Data in QuickView:', productData); // Debugging line to check product data

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
                                        {productData.stock > 1 && (
                                            <tr>
                                                <td className="label">
                                                    <span>Количество</span>
                                                </td>
                                                <td className="value">
                                                    <div className="product-quantity">
                                                        <span className="qty-btn minus">
                                                            <FontAwesomeIcon icon="minus" />
                                                        </span>
                                                        <input type="text" className="input-qty" defaultValue={1} />
                                                        <span className="qty-btn plus">
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
                                <a href="#" className="btn btn-icon btn-outline-body btn-hover-dark">
                                    <FontAwesomeIcon icon="heart" />
                                </a>
                                <a href="#" className="btn btn-dark btn-outline-hover-dark">
                                    <FontAwesomeIcon icon="shopping-cart" /> Добавяне в количката
                                </a>
                                <a href="#" className="btn btn-icon btn-outline-body btn-hover-dark">
                                    <FontAwesomeIcon icon="random" />
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
                                                        <FontAwesomeIcon icon={['fab', 'google-plus-g']} />
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
