import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { Link } from 'react-router';
import { useContext } from 'react';
import QuickViewContext from '@/context/QuickViewContext.jsx';
import ShopContext from '@/context/ShopContext.jsx';
import WishlistContext from '@/context/WishlistContext.jsx';

export function ProductItem({ product }) {
    const { openQuickView } = useContext(QuickViewContext);
    const { addToCart } = useContext(ShopContext);
    const { toggleWishlist, wishlist } = useContext(WishlistContext);
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
                        <button onClick={() => openQuickView(product)} className="btn btn-dark btn-circle hintT-top" data-hint="Бърз преглед">
                            <FontAwesomeIcon icon="search" />
                        </button>
                        {!product.outofstock && (
                            <button onClick={() => addToCart(product)} className="btn btn-primary btn-circle hintT-top" data-hint="Добавяне в количката">
                                <FontAwesomeIcon icon="shopping-cart" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
