import { useContext } from 'react';
import { Link } from 'react-router';
import ShopContext from '@/context/ShopContext.jsx';
import { Product } from './components/Product.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Cart() {
    const { cart, subtotal } = useContext(ShopContext);

    return (
        <>
            {/* Page Title/Header Start */}
            <div className="page-title-section section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="page-title">
                                <h1 className="title">Количка</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Title/Header End */
            /* Shopping Cart Section Start */}
            {cart.length > 0 ? (
                <div className="section section-padding">
                    <div className="container flex flex-col">
                        <form className="cart-form" action="#">
                            <table className="cart-wishlist-table table">
                                <thead>
                                    <tr>
                                        <th className="name" colSpan="2">
                                            Продуцт
                                        </th>
                                        <th className="price">Цена</th>
                                        <th className="quantity">Количество</th>
                                        <th className="subtotal">Тотал</th>
                                        <th className="remove">&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <Product key={item._id} item={item} />
                                    ))}
                                </tbody>
                            </table>
                            <div className="row justify-content-between mb-n3">
                                <div className="col-auto mb-3">
                                    <div className="cart-coupon">
                                        <input
                                            type="text"
                                            placeholder="Въведете кода за отстъпка"
                                            disabled
                                        />
                                        <button className="btn">
                                            <FontAwesomeIcon icon="gift" />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="form-buttons">
                                        <Link
                                            className="btn btn-light btn-hover-dark"
                                            to="/products">
                                            Продължи пазаруването
                                        </Link>
                                        <button className="btn btn-dark btn-outline-hover-dark learts-ml-20">
                                            Обнови количката
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="cart-totals mt-5 learts-ml-auto">
                            <h2 className="title">Сума на поръчката</h2>
                            <table>
                                <tbody>
                                    <tr className="subtotal">
                                        <th>Междинна сума</th>
                                        <td>
                                            <span className="amount">
                                                €{Number(subtotal).toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="total">
                                        <th>Крайна сума</th>
                                        <td>
                                            <strong>
                                                <span className="amount">
                                                    €{Number(subtotal).toFixed(2)}
                                                </span>
                                            </strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to="/checkout" className="btn btn-primary">
                                Към плащане
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <h3 className="title empty-cart-message">Количка е празна!</h3>
            )}
        </>
    );
}
