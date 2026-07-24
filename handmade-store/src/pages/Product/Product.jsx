import { ProductVariations } from '@/components/common/ProductVariations.jsx';
import ShopContext from '@/context/ShopContext.jsx';
import { useProductQuantity } from '@/hooks/useProductQuantity.jsx';
import { useQuery } from '@/hooks/useQuery.js';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { ProductSkeleton } from './ProductSkeleton.jsx';
import { ProductGallery } from '@/components/common/ProductGallery.jsx';
import { ProductShare } from '@/components/common/ProductShare.jsx';
import WishlistContext from '@/context/WishlistContext.jsx';
import Lightbox from 'yet-another-react-lightbox';
import { Zoom } from 'yet-another-react-lightbox/plugins';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

export function Product() {
    const { productId } = useParams();
    const { data, loading, error } = useQuery(ENDPOINTS.PRODUCTS.DETAILS(productId), {});
    const { cart, addToCart } = useContext(ShopContext);
    const { quantity, handleMinus, handlePlus } = useProductQuantity(data, cart);
    const { toggleWishlist, wishlist } = useContext(WishlistContext);
    const [activeTab, setActiveTab] = useState('description');
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const location = useLocation();

    const savedFilters = location.state?.fromFilters || '';

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
    const galleryImages = data?.images?.gallery || [];

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
                                        <Link to={`/products${savedFilters}`}>Products</Link>
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
                                <button
                                    className="product-gallery-popup hintT-left"
                                    data-hint="Кликнете, за да увеличите"
                                    onClick={() => galleryImages.length > 0 && setLightboxIndex(0)}
                                    disabled={galleryImages.length === 0}>
                                    <FontAwesomeIcon icon="expand" />
                                </button>
                                <a
                                    href="https://www.youtube.com/watch?v=1jSsy7DtYgc"
                                    className="product-video-popup video-popup hintT-left"
                                    data-hint="Кликнете, за да видите видео">
                                    <FontAwesomeIcon icon="play" />
                                </a>
                                <ProductGallery images={data?.images?.gallery} title={data?.title} onImageClick={setLightboxIndex} />
                                <Lightbox
                                    open={lightboxIndex >= 0}
                                    index={lightboxIndex}
                                    close={() => setLightboxIndex(-1)}
                                    slides={galleryImages.map((src) => ({ src, alt: data?.title }))}
                                    plugins={[Zoom, Thumbnails]}
                                    carousel={{ finite: true }}
                                    zoom={{
                                        maxZoom: 4,
                                    }}
                                    animation={{ fade: 250, swipe: 250 }}
                                />
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
                                <div className="product-description">{data.shortDescription}</div>

                                <ProductVariations size={data.size} stock={data.stock} handleMinus={handleMinus} handlePlus={handlePlus} quantity={quantity} />

                                <div className="product-buttons">
                                    <button
                                        onClick={() => toggleWishlist(data)}
                                        className={`btn btn-outline-dark btn-circle hintT-top ${isInWishlist ? 'added' : ''}`}
                                        data-hint={isInWishlist ? 'Премахване от любими' : 'Добавяне в любими'}>
                                        <FontAwesomeIcon icon="heart" />
                                    </button>
                                    <button onClick={() => addToCart(data, quantity)} className="btn btn-primary">
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
                                                            <Link to={`/products?category=${data.category}`}>{data.category}</Link>
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
                                                    <ProductShare
                                                        productUrl={`${window.location.origin}/products/${data?.id}/details`}
                                                        productTitle={data?.title}
                                                        productImage={data?.images?.gallery[0] || ''}
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
                </div>
            </div>
            <div className="section section-padding border-bottom">
                <div className="container">
                    <ul className="nav product-info-tab-list">
                        <li className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>
                            Description
                        </li>
                        <li className={activeTab === 'additional' ? 'active' : ''} onClick={() => setActiveTab('additional')}>
                            Additional information
                        </li>
                    </ul>
                    <div className="product-info-tab-content">
                        {activeTab === 'description' && (
                            <div className="row row-description">
                                <div className="col-lg-10 col-12 mx-auto">{data.description}</div>
                            </div>
                        )}

                        {activeTab === 'additional' && (
                            <div className="row row-additional">
                                <div className="col-lg-8 col-md-10 col-12 mx-auto">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Size</td>
                                                    <td>
                                                        {data.size.map((s) => (
                                                            <span className="learts-pr-10" key={s}>
                                                                {s}
                                                            </span>
                                                        ))}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Category</td>
                                                    <td>
                                                        <Link to={`/products?category=${data.category}`}>{data.category}</Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
