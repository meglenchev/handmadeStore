import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CartCoupon() {
    return (
        <div className="col-auto mb-3">
            <div className="cart-coupon">
                <input type="text" placeholder="Въведете кода за отстъпка" disabled />
                <button className="btn btn-coupon" type="submit" disabled>
                    <FontAwesomeIcon icon="gift" />
                </button>
            </div>
        </div>
    );
}
