import { useForm } from '@/hooks/useForm.js';
import { useMutation } from '@/hooks/useMutation.jsx';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { useState } from 'react';

const initialValues = {
    fullName: '',
    phone: '',
    country: '',
    city: '',
    postalCode: '',
    addressLine1: '',
};

const validateFn = (values) => {
    const errors = {};

    if (!values.fullName) {
        errors.fullName = 'Името е задължително!';
    }

    if (!values.phone) {
        errors.phone = 'Телефонът е задължителен!';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(values.phone)) {
        errors.phone = 'Формата на телефона е неправилен!';
    }

    if (!values.country) {
        errors.country = 'Държавата е задължителна!';
    }

    if (!values.city) {
        errors.city = 'Градът е задължителен!';
    }

    if (!values.postalCode) {
        errors.postalCode = 'Пощенския код е задължителен!';
    }

    if (!values.addressLine1) {
        errors.addressLine1 = 'Адресът е задължителен!';
    }

    return errors;
};

export function AddressForm({ onAddressAdded }) {
    const [submitError, setSubmitError] = useState(null);
    const { mutate, loading } = useMutation(ENDPOINTS.ACCOUNT.ADDRESS);

    const addressSubmitHandler = async (formValues) => {
        setSubmitError(null);
        try {
            await mutate(formValues);
            onAddressAdded();
        } catch (err) {
            setSubmitError(err.message || 'Грешка при добавяне на адреса. Моля, опитайте отново.');
        }
    };

    const { inputPropertiesRegister, submitHandler, formErrors } = useForm(
        addressSubmitHandler,
        initialValues,
        validateFn,
    );
    return (
        <form onSubmit={submitHandler} noValidate>
            <div className="row learts-mb-n30">
                <div className="col-12 learts-mb-30 learts-mt-30">
                    <fieldset>
                        <legend>Добави адрес</legend>
                        <div className="row learts-mb-n30">
                            {/* Full Name */}
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="fullName">Две имена *</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    {...inputPropertiesRegister('fullName')}
                                />
                                {formErrors.fullName && (
                                    <span className="error">{formErrors.fullName}</span>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="phone">Телефон *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    {...inputPropertiesRegister('phone')}
                                />
                                {formErrors.phone && (
                                    <span className="error">{formErrors.phone}</span>
                                )}
                            </div>

                            {/* Country */}
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="country">Държава *</label>
                                <input
                                    type="text"
                                    id="country"
                                    {...inputPropertiesRegister('country')}
                                />
                                {formErrors.country && (
                                    <span className="error">{formErrors.country}</span>
                                )}
                            </div>

                            {/* City */}
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="city">Град *</label>
                                <input type="text" id="city" {...inputPropertiesRegister('city')} />
                                {formErrors.city && (
                                    <span className="error">{formErrors.city}</span>
                                )}
                            </div>

                            {/* Postal Code */}
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="postalCode">Пощенски код *</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    {...inputPropertiesRegister('postalCode')}
                                />
                                {formErrors.postalCode && (
                                    <span className="error">{formErrors.postalCode}</span>
                                )}
                            </div>

                            {/* Address Line 1 */}
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="addressLine1">Адрес *</label>
                                <input
                                    type="text"
                                    id="addressLine1"
                                    {...inputPropertiesRegister('addressLine1')}
                                />
                                {formErrors.addressLine1 && (
                                    <span className="error">{formErrors.addressLine1}</span>
                                )}
                            </div>
                        </div>
                    </fieldset>
                </div>
                {/* TODO: Add styles for better visual representation of this error */}
                {submitError && (
                    <div className="col-12 learts-mb-20">
                        <span className="error">{submitError}</span>
                    </div>
                )}
                <div className="col-12 learts-mb-30">
                    <button className="btn btn-dark btn-outline-hover-dark">
                        {loading ? 'Добавяне...' : 'Добави адрес'}
                    </button>
                </div>
            </div>
        </form>
    );
}
