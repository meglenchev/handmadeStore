import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import QuickViewContext from '@/context/QuickViewContext.jsx';
import ShopContext from '@/context/ShopContext.jsx';
import WishlistContext from '@/context/WishlistContext.jsx';
import { useQuery } from '@/hooks/useQuery.js';
import { Link } from 'react-router';
import { ENDPOINTS } from '@/utils/endpoints.js';

export function ProductsInFocus() {
    const { openQuickView } = useContext(QuickViewContext);
    const { addToCart } = useContext(ShopContext);
    const { toggleWishlist, wishlist } = useContext(WishlistContext);

    const { data: products, loading, error } = useQuery(ENDPOINTS.PRODUCTS.LATEST, []);

    if (loading) {
        return <div className="text-center section-padding">Зареждане на продуктите на фокус...</div>;
    }

    if (error) {
        return <div className="text-center text-danger section-padding">Неуспешно зареждане: {error}</div>;
    }

    if (!products || products.length === 0) {
        return <div className="text-center section-padding">В момента няма активни продукти на фокус.</div>;
    }

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
                            {products.map((product) => {
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
                                                    <img src={product.image} alt={product.title} />
                                                    <img className="image-hover " src={product.hoverImage} alt={product.title} />
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
                            })}
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
