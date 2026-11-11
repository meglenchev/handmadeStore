import { useState } from 'react';

export function CheckoutCoupon() {
    const [couponOpen, setCouponOpen] = useState(false);

    return (
        <div className="checkout-coupon">
            <p className="coupon-toggle">
                Имате купон?
                <button
                    type="button"
                    className="btn-coupon-toggle"
                    onClick={() => setCouponOpen(!couponOpen)}>
                    {couponOpen
                        ? 'Скрий формата за въвеждане на кода'
                        : 'Кликнете тук, за да въведете кода си'}
                </button>
            </p>
            {couponOpen && (
                <div className="coupon-form is-open">
                    <p>Ако имате код за отстъпка, моля, въведете го по-долу.</p>
                    <form className="learts-mb-n10">
                        <input className="learts-mb-10" type="text" placeholder="Код за отстъпка" />
                        <button className="btn btn-dark btn-outline-hover-dark learts-mb-10">
                            Приложи купон
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
