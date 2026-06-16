import { ProductVariations } from '@/components/common/ProductVariations.jsx';
import ShopContext from '@/context/ShopContext.jsx';
import { useProductQuantity } from '@/hooks/useProductQuantity.jsx';
import { useQuery } from '@/hooks/useQuery.js';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link, useParams } from 'react-router';
import { ProductSkeleton } from './ProductSkeleton.jsx';
import { ProductGallery } from '@/components/common/ProductGallery.jsx';
import WishlistContext from '@/context/WishlistContext.jsx';

export function Product() {
    const { productId } = useParams();
    const { data, loading, error } = useQuery(ENDPOINTS.PRODUCTS.DETAILS(productId), {});
    const { cart, addToCart } = useContext(ShopContext);
    const { quantity, handleMinus, handlePlus } = useProductQuantity(data, cart);
    const { toggleWishlist, wishlist } = useContext(WishlistContext);

    if (loading) {
        return <ProductSkeleton />;
    }

    if (error || !data) {
        return (
            <div className="error" style={{ padding: '100px', textAlign: 'center' }}>
                Продуктът не беше намерен.
            </div>
        );
    }

    const isInWishlist = wishlist.some((item) => item.id === data.id);

    return (
        <>
            <div className="page-title-section section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="page-title">
                                <h1 className="title">Shop</h1>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/products">Products</Link>
                                    </li>
                                    <li className="breadcrumb-item active">{data.title}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section-padding border-bottom">
                <div className="container">
                    <div className="row learts-mb-n40">
                        {/* Product Images Start */}
                        <div className="col-lg-6 col-12 learts-mb-40">
                            <div className="product-images">
                                <button className="product-gallery-popup hintT-left" data-hint="Click to enlarge">
                                    <FontAwesomeIcon icon="expand" />
                                </button>
                                <a href="https://www.youtube.com/watch?v=1jSsy7DtYgc" className="product-video-popup video-popup hintT-left" data-hint="Click to see video">
                                    <FontAwesomeIcon icon="play" />
                                </a>
                                <ProductGallery images={data.images?.gallery} title={data.title} />
                            </div>
                        </div>
                        {/* Product Images End */}
                        {/* Product Summery Start */}
                        <div className="col-lg-6 col-12">
                            <div className="product-summery">
                                <h3 className="product-title">{data.title}</h3>
                                <div className="product-price">
                                    {data.oldPrice ? (
                                        <>
                                            <span className="old">€{data.oldPrice?.toFixed(2)}</span>-<span>€{data.newPrice?.toFixed(2)}</span>
                                        </>
                                    ) : (
                                        <span>€{data.newPrice?.toFixed(2)}</span>
                                    )}
                                </div>
                                <div className="product-description">{data.description}</div>

                                <ProductVariations size={data.size} stock={data.stock} handleMinus={handleMinus} handlePlus={handlePlus} quantity={quantity} />

                                <div className="product-buttons">
                                    <button
                                        onClick={() => toggleWishlist(data)}
                                        className={`btn btn-icon btn-outline-body btn-hover-dark hintT-top btn-add-to-wishlist ${isInWishlist ? 'added' : ''}`}
                                        data-hint={isInWishlist ? 'Премахване от любими' : 'Добавяне в любими'}>
                                        <FontAwesomeIcon icon="heart" />
                                    </button>
                                    <button onClick={() => addToCart(data, quantity)} className="btn btn-dark btn-outline-hover-dark">
                                        <FontAwesomeIcon icon="shopping-cart" /> Добави в количката
                                    </button>
                                </div>
                                <div className="product-meta">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="label">
                                                    <span>Категория</span>
                                                </td>
                                                <td className="value">
                                                    <ul className="product-category">
                                                        <li>
                                                            <Link to={`/product/${data.category}`}>{data.category}</Link>
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
                </div>
            </div>
            <div className="section section-padding border-bottom">
                <div className="container">
                    <ul className="nav product-info-tab-list">
                        <li>
                            <a className="active" data-bs-toggle="tab" href="#tab-description">
                                Description
                            </a>
                        </li>
                        <li>
                            <a data-bs-toggle="tab" href="#tab-additional_information">
                                Additional information
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content product-infor-tab-content">
                        <div className="tab-pane fade show active" id="tab-description">
                            <div className="row">
                                <div className="col-lg-10 col-12 mx-auto">{data.description}</div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="tab-additional_information">
                            <div className="row">
                                <div className="col-lg-8 col-md-10 col-12 mx-auto">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Size</td>
                                                    <td>Large, Medium, Small</td>
                                                </tr>
                                                <tr>
                                                    <td>Color</td>
                                                    <td>Black, White</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
