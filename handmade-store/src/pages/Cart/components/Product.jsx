import ShopContext from '@/context/ShopContext.jsx';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link } from 'react-router';

export function Product({ item }) {
    const { updateQuantity, removeFromCart } = useContext(ShopContext);
    return (
        <tr>
            <td className="thumbnail">
                <Link to={ENDPOINTS.PRODUCTS.DETAILS(item._id)}>
                    <img src={item.images.gallery[0]} alt={item.title} />
                </Link>
            </td>
            <td className="name">
                <Link to={ENDPOINTS.PRODUCTS.DETAILS(item._id)}>{item.title}</Link>
            </td>
            <td className="price">
                <span> €{item.newPrice.toFixed(2)}</span>
            </td>
            <td className="quantity">
                <div className="product-quantity">
                    <button
                        type="button"
                        className="qty-btn minus"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}>
                        <FontAwesomeIcon icon="minus" />
                    </button>
                    <input type="text" className="input-qty" value={item.quantity} readOnly />
                    <button
                        type="button"
                        className="qty-btn plus"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                        <FontAwesomeIcon icon="plus" />
                    </button>
                </div>
            </td>
            <td className="subtotal">
                <span>€{(item.newPrice * item.quantity).toFixed(2)}</span>
            </td>
            <td className="remove">
                <button
                    onClick={() => {
                        removeFromCart(item);
                    }}
                    className="btn-remove">
                    ×
                </button>
            </td>
        </tr>
    );
}
