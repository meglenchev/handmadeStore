import { ENDPOINTS } from '@/utils/endpoints.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';

export function Product({ item, removeFromCart }) {
    return (
        <tr>
            <td className="thumbnail">
                <Link to="product-details.html">
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
                    <span className="qty-btn minus">
                        <FontAwesomeIcon icon="minus" />
                    </span>
                    <input type="text" className="input-qty" defaultValue="1" readOnly />
                    <span className="qty-btn plus">
                        <FontAwesomeIcon icon="plus" />
                    </span>
                </div>
            </td>
            <td className="subtotal">
                <span>€{item.newPrice.toFixed(2)}</span>
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
