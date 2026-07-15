import QuickViewContext from '@/context/QuickViewContext.jsx';
import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShopContext from '@/context/ShopContext.jsx';
import WishlistContext from '@/context/WishlistContext.jsx';
import { useProductQuantity } from '@/hooks/useProductQuantity.jsx';
import { ProductGallery } from './ProductGallery.jsx';
import { ProductShare } from './ProductShare.jsx';
import { ProductVariations } from './ProductVariations.jsx';
import { Link } from 'react-router';

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
                        <ProductGallery images={productData.images.gallery} title={productData.title} />
                    </div>
                    {/* Product Summery Start */}
                    <div className="col-lg-6 col-12 position-relative learts-mb-30">
                        <div className="product-summery customScroll">
                            <h3 className="product-title">{productData.title}</h3>
                            <div className="product-price">
                                <span className="old">€{productData.oldPrice.toFixed(2)}</span> - €{productData.newPrice.toFixed(2)}
                            </div>
                            <div className="product-description">
                                <p>{productData.shortDescription}</p>
                            </div>

                            <ProductVariations size={productData.size} stock={productData.stock} handleMinus={handleMinus} handlePlus={handlePlus} quantity={quantity} />

                            <div className="product-buttons">
                                <button
                                    onClick={() => toggleWishlist(productData)}
                                    className={`btn btn-outline-dark btn-circle hintT-top ${isInWishlist ? 'added' : ''}`}
                                    data-hint={isInWishlist ? 'Премахване от любими' : 'Добавяне в любими'}>
                                    <FontAwesomeIcon icon="heart" />
                                </button>

                                <button onClick={() => addToCart(productData, quantity)} className="btn btn-primary" disabled={productData.outofstock}>
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
                                                        <Link to={`/product/${productData.category}`}>{productData.category}</Link>
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
                                            <td className="value">
                                                <ProductShare
                                                    productUrl={`${window.location.origin}/products/${productData._id}/details`}
                                                    productTitle={productData.title}
                                                    productImage={productData.images.gallery[0]}
                                                />
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
