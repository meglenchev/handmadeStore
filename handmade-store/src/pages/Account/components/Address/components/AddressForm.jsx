import { useForm } from '@/hooks/useForm.js';
import { useMutation } from '@/hooks/useMutation.jsx';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { useState } from 'react';

const initialValues = {
    recipientName: '',
    phone: '',
    country: '',
    city: '',
    postalCode: '',
    addressLine1: '',
};

const requiredMessages = {
    recipientName: 'Името е задължително!',
    phone: 'Телефонът е задължителен!',
    country: 'Държавата е задължителна!',
    city: 'Градът е задължителен!',
    postalCode: 'Пощенският код е задължителен!',
    addressLine1: 'Адресът е задължителен!',
};

const PHONE_REGEX = /^\+?[0-9\s-]{7,15}$/;

const validateFn = (values) => {
    const errors = {};

    for (const [field, message] of Object.entries(requiredMessages)) {
        if (!values[field].trim()) {
            errors[field] = message;
        }
    }

    if (!errors.phone && !PHONE_REGEX.test(values.phone)) {
        errors.phone = 'Форматът на телефона е неправилен!';
    }

    return errors;
};

function FormField({ name, label, type = 'text', register, errors }) {
    return (
        <div className="col-12 learts-mb-30">
            <label htmlFor={name}>{label} *</label>
            <input type={type} id={name} {...register(name)} />
            {errors[name] && <span className="error">{errors[name]}</span>}
        </div>
    );
}

export function AddressForm({ initialAddress, defaultRecipientName, onSuccess, onCancel }) {
    const isEditMode = Boolean(initialAddress);

    console.log('Default Recipient Name:', defaultRecipientName);

    const endpoint = isEditMode
        ? `${ENDPOINTS.ACCOUNT.ADDRESS}/${initialAddress._id}`
        : ENDPOINTS.ACCOUNT.ADDRESS;

    const method = isEditMode ? 'PATCH' : 'POST';

    const [submitError, setSubmitError] = useState(null);

    const { mutate, loading } = useMutation(endpoint, method);

    const formInitialValues = isEditMode
        ? Object.fromEntries(
              Object.keys(initialValues).map((key) => [key, initialAddress[key] ?? '']),
          )
        : { ...initialValues, recipientName: defaultRecipientName };

    const addressSubmitHandler = async (formValues) => {
        setSubmitError(null);

        try {
            await mutate(formValues);
            onSuccess();
        } catch (err) {
            setSubmitError(err.message || 'Грешка при добавяне на адреса. Моля, опитайте отново.');
        }
    };

    const { inputPropertiesRegister, submitHandler, formErrors } = useForm(
        addressSubmitHandler,
        formInitialValues,
        validateFn,
    );

    const fieldProps = { register: inputPropertiesRegister, errors: formErrors };
    const addressLabel = initialAddress?.isDefault ? 'адрес за фактуриране' : 'адрес';
    const legendText = `${isEditMode ? 'Редактирай' : 'Добави'} ${addressLabel}`;

    return (
        <form onSubmit={submitHandler} noValidate>
            <div className="row learts-mb-n30">
                <div className="col-12 learts-mb-30 learts-mt-30">
                    <fieldset>
                        <legend>{legendText}</legend>
                        <div className="row learts-mb-n30">
                            <FormField name="recipientName" label="Две имена" {...fieldProps} />
                            <FormField name="phone" label="Телефон" type="tel" {...fieldProps} />
                            <FormField name="country" label="Държава" {...fieldProps} />
                            <FormField name="city" label="Град" {...fieldProps} />
                            <FormField name="postalCode" label="Пощенски код" {...fieldProps} />
                            <FormField name="addressLine1" label="Адрес" {...fieldProps} />
                        </div>
                    </fieldset>
                </div>
                {/* TODO: Add styles for better visual representation of this error */}
                {submitError && (
                    <div className="col-12 learts-mb-20">
                        <span className="error">{submitError}</span>
                    </div>
                )}
                <div className="col-12 learts-mb-30 form-buttons">
                    {isEditMode ? (
                        <>
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? 'Редактиране...' : 'Редактирай'}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="btn btn-dark btn-outline-hover-dark learts-ml-auto">
                                Отказ
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                            {loading ? 'Добавяне...' : 'Добави адрес'}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
