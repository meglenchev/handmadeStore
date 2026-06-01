import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router';

export function CartOffcanvas({ activeMenu, toggleMenu, cart, subtotal, removeFromCart }) {
    return (
        <Offcanvas show={activeMenu.cart} onHide={toggleMenu('cart')} placement="end" className="offcanvas offcanvas-cart">
            <div className="inner">
                <Offcanvas.Header className="head">
                    <span className="title">Количка</span>
                    <button onClick={toggleMenu('cart')} className="offcanvas-close">
                        ×
                    </button>
                </Offcanvas.Header>
                {cart.length > 0 ? (
                    <>
                        <Offcanvas.Body className="body customScroll">
                            <ul className="minicart-product-list">
                                {cart.map((item) => (
                                    <li key={item._id}>
                                        <Link to={`/product-details/${item.id}`} className="image">
                                            <img src={item.images.gallery[0]} alt={item.title} />
                                        </Link>
                                        <div className="content">
                                            <Link to={`/product-details/${item._id}`} className="title">
                                                {item.title}
                                            </Link>
                                            <span className="quantity-price">
                                                {item.quantity} x <span className="amount">€{item.newPrice.toFixed(2)}</span>
                                            </span>
                                            <button
                                                onClick={() => {
                                                    removeFromCart(item);
                                                }}
                                                className="remove">
                                                ×
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Offcanvas.Body>
                        <div className="foot">
                            <div className="sub-total">
                                <strong>Междинна сума:</strong>
                                <span className="amount">€{subtotal}</span>
                            </div>
                            <div className="buttons">
                                <Link to="/shopping-cart" className="btn btn-dark btn-hover-primary">
                                    преглед на количката
                                </Link>
                                <Link href="/checkout" className="btn btn-primary">
                                    плати
                                </Link>
                            </div>
                            <p className="minicart-message">Безплатна доставка за поръчки над €60 евро!</p>
                        </div>
                    </>
                ) : (
                    <h3 className="title empty-minicart-message">Количка е празна!</h3>
                )}
            </div>
        </Offcanvas>
    );
}
