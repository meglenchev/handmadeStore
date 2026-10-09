import { useForm } from '@/hooks/useForm.js';
import { useMutation } from '@/hooks/useMutation.jsx';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { useState } from 'react';

const initialAccountPasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
};

const requiredMessages = {
    currentPassword: 'Текущата парола е задължителна!',
    newPassword: 'Новата парола е задължителна!',
    confirmPassword: 'Потвърждението на новата парола е задължително!',
};

const validateFn = (values) => {
    const errors = {};

    for (const [field, message] of Object.entries(requiredMessages)) {
        if (!values[field].trim()) {
            errors[field] = message;
        }

        if (field === 'newPassword' && values.newPassword.length < 8) {
            errors.newPassword = 'Новата парола трябва да е поне 8 символа!';
        }

        if (field === 'newPassword' && values.newPassword.length > 72) {
            errors.newPassword = 'Новата парола не може да е по-дълга от 72 символа!';
        }

        if (field === 'newPassword' && values.newPassword === values.currentPassword) {
            errors.newPassword = 'Новата парола не може да е същата като текущата!';
        }

        if (field === 'confirmPassword' && values.confirmPassword !== values.newPassword) {
            errors.confirmPassword = 'Потвърждението на новата парола не съвпада!';
        }
    }

    return errors;
};

export function ChangePasswordForm({ refresh }) {
    const [submitError, setSubmitError] = useState(null);
    const { mutate, loading } = useMutation(ENDPOINTS.ACCOUNT.CHANGE_PASSWORD, 'PATCH');

    const changePasswordSubmitHandler = async (formValues) => {
        setSubmitError(null);
        try {
            await mutate(formValues);
            refresh();
        } catch (err) {
            setSubmitError(err.message || 'Грешка при смяна на паролата. Моля, опитайте отново.');
        }
    };

    const { inputPropertiesRegister, submitHandler, formErrors } = useForm(
        changePasswordSubmitHandler,
        initialAccountPasswordValues,
        validateFn,
    );
    return (
        <form onSubmit={submitHandler} noValidate>
            <div className="row learts-mb-n30">
                <div className="col-12 learts-mb-30 learts-mt-30">
                    <fieldset>
                        <legend>Промяна на парола</legend>
                        <div className="row learts-mb-n30">
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="currentPassword">Текуща парола</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    {...inputPropertiesRegister('currentPassword')}
                                />
                                {formErrors.currentPassword && (
                                    <span className="error">{formErrors.currentPassword}</span>
                                )}
                            </div>
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="newPassword">Нова парола</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    {...inputPropertiesRegister('newPassword')}
                                />
                                {formErrors.newPassword && (
                                    <span className="error">{formErrors.newPassword}</span>
                                )}
                            </div>
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="confirmPassword">
                                    Потвърждение на новата парола
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    {...inputPropertiesRegister('confirmPassword')}
                                />
                                {formErrors.confirmPassword && (
                                    <span className="error">{formErrors.confirmPassword}</span>
                                )}
                            </div>
                        </div>
                    </fieldset>
                </div>
                {submitError && (
                    <div className="col-12 learts-mb-20">
                        <span className="error">{submitError}</span>
                    </div>
                )}
                <div className="col-12 learts-mb-30">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Смяна на паролата...' : 'Смени паролата'}
                    </button>
                </div>
            </div>
        </form>
    );
}
