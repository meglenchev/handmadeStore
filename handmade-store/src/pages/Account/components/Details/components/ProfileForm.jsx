import { useContext, useState } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import { useForm } from '@/hooks/useForm.js';
import { useMutation } from '@/hooks/useMutation.jsx';
import { ENDPOINTS } from '@/utils/endpoints.js';

const requiredMessages = {
    fullName: 'Името е задължително!',
    username: 'Потребителското име е задължително!',
};

const validateFn = (values) => {
    const errors = {};

    for (const [field, message] of Object.entries(requiredMessages)) {
        if (!values[field].trim()) {
            errors[field] = message;
        }
    }

    return errors;
};

export function ProfileForm({ data, refresh }) {
    const { updateUser } = useContext(AuthContext);
    const [submitError, setSubmitError] = useState(null);

    const { mutate, loading } = useMutation(ENDPOINTS.ACCOUNT.DETAILS, 'PATCH');

    const profileSubmitHandler = async (formValues) => {
        setSubmitError(null);
        try {
            const result = await mutate(formValues);
            updateUser(result.user);
            refresh();
        } catch (err) {
            setSubmitError(err.message || 'Грешка при запис на данните. Моля, опитайте отново.');
        }
    };

    const { inputPropertiesRegister, submitHandler, formErrors } = useForm(
        profileSubmitHandler,
        { fullName: data.user.fullName ?? '', username: data.user.username },
        validateFn,
    );

    return (
        <form onSubmit={submitHandler} className="learts-mb-30" noValidate>
            <div className="row learts-mb-n30">
                <div className="col-12 learts-mb-30">
                    <label htmlFor="fullName">
                        Име <abbr className="required">*</abbr>
                    </label>
                    <input type="text" id="fullName" {...inputPropertiesRegister('fullName')} />
                    {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
                </div>
                <div className="col-12 learts-mb-30">
                    <label htmlFor="username">
                        Потребителско име <abbr className="required">*</abbr>
                    </label>
                    <input type="text" id="username" {...inputPropertiesRegister('username')} />
                    {formErrors.username && <span className="error">{formErrors.username}</span>}
                    <p>Така ще се изписва името ви в секцията на акаунта.</p>
                </div>
                <div className="col-12 learts-mb-30">
                    <span>Имейл адрес</span>
                    <span className="user-email">{data.user.email}</span>
                </div>

                {submitError && (
                    <div className="col-12 learts-mb-20">
                        <span className="error">{submitError}</span>
                    </div>
                )}

                <div className="col-12 learts-mb-30">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Запазване...' : 'Запазване на промените'}
                    </button>
                </div>
            </div>
        </form>
    );
}
