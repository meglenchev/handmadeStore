import { FEATURES } from '@/config/features.js';
import { CheckoutCoupon } from './components/CheckoutCoupon.jsx';
import { useForm } from '@/hooks/useForm.js';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';

const initialValues = {
    fullName: '',
    country: 'BG',
    address1: '',
    address2: '',
    town: '',
    district: '',
    postcode: '',
    email: '',
    phone: '',
    orderNote: '',
};

const validateFn = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Имейлът е задължителен!';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Имейл формата е неправилен!';
    }

    if (!values.fullName) {
        errors.fullName = 'Името е задължително!';
    } else if (values.fullName.length < 3) {
        errors.fullName = 'Името трябва да бъде поне 3 символа!';
    }

    if (!values.country) {
        errors.country = 'Държавата е задължителна!';
    }

    if (!values.address1) {
        errors.address1 = 'Адресът е задължителен!';
    } else if (values.address1.length < 3) {
        errors.address1 = 'Адресът трябва да бъде поне 3 символа!';
    }

    if (!values.town) {
        errors.town = 'Градът е задължителен!';
    } else if (values.town.length < 3) {
        errors.town = 'Градът трябва да бъде поне 3 символа!';
    }

    if (!values.district) {
        errors.district = 'Областта е задължителна!';
    } else if (values.district.length < 3) {
        errors.district = 'Областта трябва да бъде поне 3 символа!';
    }

    if (!values.postcode) {
        errors.postcode = 'Пощенският код е задължителен!';
    } else if (values.postcode.length < 3) {
        errors.postcode = 'Пощенският код трябва да бъде поне 3 символа!';
    }

    if (!values.phone) {
        errors.phone = 'Телефонът е задължителен!';
    } else if (values.phone.length < 10) {
        errors.phone = 'Телефонът трябва да бъде поне 10 символа!';
    }

    return errors;
};

export function Checkout() {
    const { auth } = useContext(AuthContext);

    const { inputPropertiesRegister, submitHandler, formErrors } = useForm(
        () => {},
        { ...initialValues, fullName: auth?.fullName ?? '' },
        validateFn,
    );
    return (
        <>
            <div className="page-title-section section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="page-title">
                                <h1 className="title">Checkout</h1>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Checkout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section section-padding">
                <div className="container">
                    {FEATURES.coupons && <CheckoutCoupon />}
                    <div className="section-title2">
                        <h2 className="title">Данни за доставка</h2>
                    </div>
                    <form action="#" className="checkout-form learts-mb-50">
                        <div className="row">
                            <div className="col-12 learts-mb-20">
                                <label htmlFor="fullName">
                                    Име <abbr className="required">*</abbr>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    {...inputPropertiesRegister('fullName')}
                                />
                            </div>
                            <div className="col-12 learts-mb-20">
                                <label htmlFor="country">
                                    Държава <abbr className="required">*</abbr>
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    {...inputPropertiesRegister('country')}
                                    readOnly
                                />
                            </div>
                            <div className="col-12 learts-mb-20">
                                <label htmlFor="address1">
                                    Улица <abbr className="required">*</abbr>
                                </label>
                                <input
                                    type="text"
                                    id="address1"
                                    {...inputPropertiesRegister('address1')}
                                    placeholder="Номер на къща и име на улица"
                                />
                            </div>
                            <div className="col-12 learts-mb-20">
                                <label htmlFor="address2" className="sr-only">
                                    Апартанент, етаж и т.н. (по избор)
                                </label>
                                <input
                                    type="text"
                                    id="address2"
                                    {...inputPropertiesRegister('address2')}
                                    placeholder="Апартанент, етаж и т.н. (по избор)"
                                />
                            </div>
                            <div className="col-12 learts-mb-20">
                                <label htmlFor="town">
                                    Град / Село <abbr className="required">*</abbr>
                                </label>
                                <input type="text" id="town" {...inputPropertiesRegister('town')} />
                            </div>
                            <div className="col-12 learts-mb-20">
                                <label htmlFor="district">
                                    Област <abbr className="required">*</abbr>
                                </label>
                                <input
                                    type="text"
                                    id="district"
                                    {...inputPropertiesRegister('district')}
                                />
                            </div>
                            <div className="col-12 learts-mb-20">
                                <label htmlFor="postcode">Пощенски код</label>
                                <input
                                    type="text"
                                    id="postcode"
                                    {...inputPropertiesRegister('postcode')}
                                />
                            </div>
                            <div className="col-md-6 col-12 learts-mb-20">
                                <label htmlFor="email">
                                    Имейл <abbr className="required">*</abbr>
                                </label>
                                <input
                                    type="email"
                                    autoComplete="email"
                                    id="email"
                                    {...inputPropertiesRegister('email')}
                                />
                            </div>
                            <div className="col-md-6 col-12 learts-mb-30">
                                <label htmlFor="phone">
                                    Телефон <abbr className="required">*</abbr>
                                </label>
                                <input
                                    type="tel"
                                    autoComplete="tel"
                                    id="phone"
                                    {...inputPropertiesRegister('phone')}
                                />
                            </div>
                            {!auth._id && (
                                <div className="col-12 learts-mb-40">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="createAccount"
                                        />
                                        <label className="form-check-label" htmlFor="exampleCheck1">
                                            Създаване на акаунт?
                                        </label>
                                    </div>
                                </div>
                            )}
                            <div className="col-12 learts-mb-20">
                                <label htmlFor="orderNote">Бележки за поръчката (по избор)</label>
                                <textarea
                                    id="bdOrderNote"
                                    {...inputPropertiesRegister('orderNote')}
                                    placeholder="Бележки за вашата поръчка, например специални бележки за доставка."></textarea>
                            </div>
                        </div>
                    </form>
                    <div className="section-title2 text-center">
                        <h2 className="title">Your order</h2>
                    </div>
                    <div className="row learts-mb-n30">
                        <div className="col-lg-6 order-lg-2 learts-mb-30">
                            <div className="order-review">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="name">Product</th>
                                            <th className="total">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="name">
                                                Walnut Cutting Board&nbsp;{' '}
                                                <strong className="quantity">×&nbsp;1</strong>
                                            </td>
                                            <td className="total">
                                                <span>£100.00</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="name">
                                                Pizza Plate Tray&nbsp;{' '}
                                                <strong className="quantity">×&nbsp;1</strong>
                                            </td>
                                            <td className="total">
                                                <span>£22.00</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="name">
                                                Minimalist Ceramic Pot - Pearl river, Large&nbsp;{' '}
                                                <strong className="quantity">×&nbsp;1</strong>
                                            </td>
                                            <td className="total">
                                                <span>£120.00</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr className="subtotal">
                                            <th>Subtotal</th>
                                            <td>
                                                <span>£242.00</span>
                                            </td>
                                        </tr>
                                        <tr className="total">
                                            <th>Total</th>
                                            <td>
                                                <strong>
                                                    <span>€ 242.00</span>
                                                </strong>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1 learts-mb-30">
                            <div className="order-payment">
                                <div className="payment-method">
                                    <div className="accordion" id="paymentMethod">
                                        <div className="card active">
                                            <div className="card-header">
                                                <button
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#checkPayments">
                                                    Check payments
                                                </button>
                                            </div>
                                            <div
                                                id="checkPayments"
                                                className="collapse show"
                                                data-bs-parent="#paymentMethod">
                                                <div className="card-body">
                                                    <p>
                                                        Please send a check to Store Name, Store
                                                        Street, Store Town, Store State / County,
                                                        Store Postcode.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header">
                                                <button
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#cashkPayments">
                                                    Cash on delivery{' '}
                                                </button>
                                            </div>
                                            <div
                                                id="cashkPayments"
                                                className="collapse"
                                                data-bs-parent="#paymentMethod">
                                                <div className="card-body">
                                                    <p>Pay with cash upon delivery.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header">
                                                <button
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#payPalPayments">
                                                    PayPal{' '}
                                                    <img
                                                        src="assets/images/others/pay-2.webp"
                                                        alt=""
                                                    />
                                                </button>
                                            </div>
                                            <div
                                                id="payPalPayments"
                                                className="collapse"
                                                data-bs-parent="#paymentMethod">
                                                <div className="card-body">
                                                    <p>
                                                        Pay via PayPal; you can pay with your credit
                                                        card if you don’t have a PayPal account.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="payment-note">
                                        Your personal data will be used to process your order,
                                        support your experience throughout this website, and for
                                        other purposes described in our privacy policy.
                                    </p>
                                    <button className="btn btn-dark btn-outline-hover-dark">
                                        place order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
