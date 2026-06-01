import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import QuickViewContext from '@/context/QuickViewContext.jsx';
import ShopContext from '@/context/ShopContext.jsx';
import WishlistContext from '@/context/WishlistContext.jsx';
import { useQuery } from '@/hooks/useQuery.js';
import { Link } from 'react-router';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { ProductSkeleton } from './ProductSkeleton.jsx';

export function ProductsInFocus() {
    const { openQuickView } = useContext(QuickViewContext);
    const { addToCart } = useContext(ShopContext);
    const { toggleWishlist, wishlist } = useContext(WishlistContext);

    const [activeCategory, setActiveCategory] = useState('all');

    const { data: products, loading, error } = useQuery(ENDPOINTS.PRODUCTS.LATEST_FILTERED(activeCategory), []);

    if (error) {
        return <div className="text-center text-danger section-padding">Неуспешно зареждане: {error}</div>;
    }

    if (!loading && (!products || products.length === 0)) {
        return <h2 className="title title-icon-right">В момента няма активни продукти на фокус.</h2>;
    }

    return (
        <div className="section section-padding">
            <div className="container">
                <div className="row justify-content-between">
                    {/* Section Title Start */}
                    <div className="col-lg-auto col-12">
                        <div className="section-title2">
                            <h2 className="title">
                                Продукти на фокус <FontAwesomeIcon icon="star" className="text-primary ms-2" />
                            </h2>
                            <p>Следвайте най-популярните тенденции и се възползвайте от ексклузивни артикули от магазина за ръкоделия Learts.</p>
                        </div>
                    </div>
                    {/* Section Title End */}
                    {/* Tab Button List Start */}
                    <div className="col-lg-auto col-12 learts-mb-30">
                        <nav className="nav mx-n1 learts-mb-n10">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10 ${activeCategory === 'all' ? 'active' : ''}`}>
                                всички
                            </button>
                            <button
                                onClick={() => setActiveCategory('gifts')}
                                className={`btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10 ${activeCategory === 'gifts' ? 'active' : ''}`}>
                                подаръци
                            </button>
                            <button
                                onClick={() => setActiveCategory('decor')}
                                className={`btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10 ${activeCategory === 'decor' ? 'active' : ''}`}>
                                декор
                            </button>
                            <button
                                onClick={() => setActiveCategory('kitchen')}
                                className={`btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10 ${activeCategory === 'kitchen' ? 'active' : ''}`}>
                                кухня
                            </button>
                        </nav>
                    </div>
                    {/* Section Title End */}
                </div>
                <div className="prodyct-tab-content1 tab-content">
                    <div className="tab-pane fade show active" id="tab-gift-ideas">
                        {/* Products Start */}
                        <div className="products row row-cols-md-3 row-cols-sm-2 row-cols-1">
                            {loading ? (
                                Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)
                            ) : products && products.length > 0 ? (
                                products.map((product) => {
                                    const isInWishlist = wishlist.some((item) => item._id === product._id);

                                    return (
                                        <div key={product._id} className="col">
                                            <div className="product">
                                                <div className="product-thumb">
                                                    <Link to={ENDPOINTS.PRODUCTS.DETAILS(product._id)} className="image">
                                                        <span className="product-badges">
                                                            {product.outofstock && (
                                                                <span className="outofstock hintT-right" data-hint="Продуктът е изчерпан">
                                                                    <FontAwesomeIcon icon="frown" />
                                                                </span>
                                                            )}
                                                            {product.hot && <span className="hot">hot</span>}
                                                        </span>
                                                        <img src={product.images.gallery[0]} alt={product.title} />
                                                        <img className="image-hover " src={product.images.gallery[1]} alt={product.title} />
                                                    </Link>
                                                    <button
                                                        onClick={() => toggleWishlist(product)}
                                                        className={`add-to-wishlist hintT-left ${isInWishlist ? 'added' : ''}`}
                                                        data-hint={isInWishlist ? 'Премахване от любими' : 'Добавяне в любими'}>
                                                        <FontAwesomeIcon icon="heart" />
                                                    </button>
                                                </div>
                                                <div className="product-info">
                                                    <h6 className="title">
                                                        <Link to={ENDPOINTS.PRODUCTS.DETAILS(product._id)}>{product.title}</Link>
                                                    </h6>
                                                    <span className="price">€{product.newPrice.toFixed(2)}</span>
                                                    <div className="product-buttons">
                                                        <button onClick={() => openQuickView(product)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                            <FontAwesomeIcon icon="search" />
                                                        </button>
                                                        {!product.outofstock && (
                                                            <button onClick={() => addToCart(product)} className="product-button hintT-top" data-hint="Добавяне в количката">
                                                                <FontAwesomeIcon icon="shopping-cart" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-12 text-center section-padding w-100">В момента няма активни продукти на фокус.</div>
                            )}
                        </div>
                        {/* Products End */}
                    </div>
                </div>
                <div className="row g-0 justify-content-center learts-mt-50">
                    <Link to={ENDPOINTS.PRODUCTS.ALL} className="btn p-0">
                        <FontAwesomeIcon icon="plus" /> виж повече ...
                    </Link>
                </div>
            </div>
        </div>
    );
}
