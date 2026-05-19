import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router';

export function WishlistOffcanvas({ activeMenu, toggleMenu, wishlist, toggleWishlist }) {
    const wishlistItems = wishlist || [];

    return (
        <Offcanvas show={activeMenu.wishlist} onHide={toggleMenu('wishlist')} placement="end" className="offcanvas offcanvas-wishlist">
            <div className="inner">
                <Offcanvas.Header className="head">
                    <span className="title">Любми</span>
                    <button className="offcanvas-close" onClick={toggleMenu('wishlist')}>
                        ×
                    </button>
                </Offcanvas.Header>
                {wishlistItems.length > 0 ? (
                    <>
                        <Offcanvas.Body className="body customScroll">
                            <ul className="minicart-product-list">
                                {wishlistItems.map((item) => (
                                    <li key={item.id}>
                                        <Link to={`/product-details/${item.id}`} className="image">
                                            <img src={item.image} alt={item.title} />
                                        </Link>
                                        <div className="content">
                                            <Link to={`/product-details/${item.id}`} className="title">
                                                {item.title}
                                            </Link>
                                            <span className="quantity-price">
                                                1 x <span className="amount">€{item.newPrice.toFixed(2)}</span>
                                            </span>
                                            <button onClick={() => toggleWishlist(item)} className="remove">
                                                ×
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Offcanvas.Body>
                        <div className="foot">
                            <div className="buttons">
                                <Link to="/wishlist" className="btn btn-dark btn-hover-primary">
                                    виж списък с любими
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <h3 className="title empty-minicart-message">Списъкът с любими е празен!</h3>
                )}
            </div>
        </Offcanvas>
    );
}
