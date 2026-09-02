import { useNavigate } from 'react-router';
import { useState, useContext } from 'react';
import { useForm } from '../../../hooks/useForm.js';
import AuthContext from '@/context/AuthContext.jsx';

const initialValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

const validateFn = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Имейлът е задължителен!';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Имейл формата е неправилен!';
    }

    if (!values.username) {
        errors.username = 'Юзърнеймът е задължителен!';
    } else if (values.username.length < 3) {
        errors.username = 'Юзърнеймът трябва да бъде поне 3 символа!';
    }

    if (!values.password) {
        errors.password = 'Паролата е задължителна!';
    } else if (values.password.length < 8) {
        errors.password = 'Паролата трябва да бъде поне 8 символа!';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Повторната парола е задължителна!';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Паролите не съвпадат!';
    }

    return errors;
};

export function RegisterForm() {
    const { onRegister } = useContext(AuthContext);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    const registerSubmitHandler = async (formValues) => {
        setSubmitError(null);

        try {
            await onRegister(formValues);
            navigate('/', { replace: true });
        } catch (err) {
            setSubmitError(err.message || 'Грешка при регистрация. Моля, опитайте отново.');
        }
    };

    const { inputPropertiesRegister, submitHandler, formErrors } = useForm(registerSubmitHandler, initialValues, validateFn);

    return (
        <div className="user-login-register">
            <div className="login-register-title">
                <h2 className="title">Регистрация</h2>
                <p className="desc">Ако нямате акаунт, регистрирайте се сега!</p>
            </div>
            <div className="login-register-form">
                <form onSubmit={submitHandler}>
                    <div className="row learts-mb-n50">
                        <div className="col-12 learts-mb-20">
                            <label htmlFor="registerEmail">
                                Имейл адрес <abbr className="required">*</abbr>
                            </label>
                            <input
                                type="email"
                                autoComplete="email"
                                {...inputPropertiesRegister('email')}
                                className={formErrors.email && `form-control is-invalid`}
                                id="registerEmail"
                            />
                            {formErrors.email && <span className="error">{formErrors.email}</span>}
                        </div>
                        <div className="col-12 learts-mb-20">
                            <label htmlFor="registerUsername">
                                Юзърнейм <abbr className="required">*</abbr>
                            </label>
                            <input
                                type="text"
                                autoComplete="username"
                                {...inputPropertiesRegister('username')}
                                className={formErrors.username && `form-control is-invalid`}
                                id="registerUsername"
                            />
                            {formErrors.username && <span className="error">{formErrors.username}</span>}
                        </div>
                        <div className="col-12 learts-mb-20">
                            <label htmlFor="registerPassword">
                                Парола <abbr className="required">*</abbr>
                            </label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                {...inputPropertiesRegister('password')}
                                className={formErrors.password && `form-control is-invalid`}
                                id="registerPassword"
                            />
                            {formErrors.password && <span className="error">{formErrors.password}</span>}
                        </div>
                        <div className="col-12 learts-mb-20">
                            <label htmlFor="confirmPassword">
                                Повтори паролата <abbr className="required">*</abbr>
                            </label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                {...inputPropertiesRegister('confirmPassword')}
                                className={formErrors.confirmPassword && `form-control is-invalid`}
                                id="confirmPassword"
                            />
                            {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                        </div>
                        <div className="col-12 learts-mb-50">
                            <p>
                                Вашият личен данни ще бъдат използвани за поддръжка на опита ви през този сайт, за управление на достъпа до вашия акаунт и за други цели, описани в
                                нашата политика на поверителност
                            </p>
                        </div>
                        <div className="col-12 text-center learts-mb-50">
                            <button type="submit" className="btn btn-primary">
                                Регистрация
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
