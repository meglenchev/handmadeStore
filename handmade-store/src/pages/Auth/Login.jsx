import { Link } from 'react-router';
import { useForm } from '../../hooks/useForm.js';

const initialLoginValues = {
    email: '',
    password: '',
};

const initialRegisterValues = {
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

    if (!values.password) {
        errors.password = 'Паролата е задължителна!';
    } else if (values.password.length < 8) {
        errors.password = 'Паролата трябва да бъде поне 8 символа!';
    }

    if (values.confirmPassword !== undefined) {
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Повторната парола е задължителна!';
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Паролите не съвпадат!';
        }
    }

    if (values.username !== undefined) {
        if (!values.username) {
            errors.username = 'Юзърнеймът е задължителен!';
        } else if (values.username.length < 3) {
            errors.username = 'Юзърнеймът трябва да бъде поне 3 символа!';
        }
    }

    return errors;
};

export function Login() {
    const loginSubmitHandler = (formValues) => {
        return console.log('Login form submitted with values:', formValues);
    };

    const registerSubmitHandler = (formValues) => {
        return console.log('Register form submitted with values:', formValues);
    };

    const loginForm = useForm(loginSubmitHandler, initialLoginValues, validateFn);
    const registerForm = useForm(registerSubmitHandler, initialRegisterValues, validateFn);

    return (
        <>
            {/* Page Title/Header Start */}
            <div className="page-title-section section" data-bg-image="assets/images/bg/page-title-1.webp">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="page-title">
                                <h1 className="title">Вход | Регистрация</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Title/Header End */}
            {/* Login & Register Section Start */}
            <div className="section section-padding">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-lg-6">
                            <div className="user-login-register bg-light">
                                <div className="login-register-title">
                                    <h2 className="title">Вход</h2>
                                    <p className="desc">Радваме се, че се върнахте!</p>
                                </div>
                                <div className="login-register-form">
                                    <form onSubmit={loginForm.submitHandler}>
                                        <div className="row learts-mb-n50">
                                            <div className="col-12 learts-mb-50">
                                                <input
                                                    type="email"
                                                    {...loginForm.inputPropertiesRegister('email')}
                                                    className={loginForm.formErrors.email && `form-control is-invalid`}
                                                    placeholder="Имейл адрес"
                                                />
                                                {loginForm.formErrors.email && <span className="error">{loginForm.formErrors.email}</span>}
                                            </div>
                                            <div className="col-12 learts-mb-50">
                                                <input
                                                    type="password"
                                                    {...loginForm.inputPropertiesRegister('password')}
                                                    className={loginForm.formErrors.password && `form-control is-invalid`}
                                                    placeholder="Парола"
                                                />
                                                {loginForm.formErrors.password && <span className="error">{loginForm.formErrors.password}</span>}
                                            </div>
                                            <div className="col-12 text-center learts-mb-50">
                                                <button type="submit" className="btn btn-primary2">
                                                    Вход
                                                </button>
                                            </div>
                                            <div className="col-12 learts-mb-50">
                                                <div className="row learts-mb-n20">
                                                    <div className="col-12 learts-mb-20">
                                                        <Link to="/auth/lost-password" className="fw-400">
                                                            Забравена парола?
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="user-login-register">
                                <div className="login-register-title">
                                    <h2 className="title">Регистрация</h2>
                                    <p className="desc">Ако нямате акаунт, регистрирайте се сега!</p>
                                </div>
                                <div className="login-register-form">
                                    <form onSubmit={registerForm.submitHandler}>
                                        <div className="row learts-mb-n50">
                                            <div className="col-12 learts-mb-20">
                                                <label htmlFor="registerEmail">
                                                    Имейл адрес <abbr className="required">*</abbr>
                                                </label>
                                                <input
                                                    type="email"
                                                    {...registerForm.inputPropertiesRegister('email')}
                                                    className={registerForm.formErrors.email && `form-control is-invalid`}
                                                    id="registerEmail"
                                                />
                                                {registerForm.formErrors.email && <span className="error">{registerForm.formErrors.email}</span>}
                                            </div>
                                            <div className="col-12 learts-mb-20">
                                                <label htmlFor="registerUsername">
                                                    Юзърнейм <abbr className="required">*</abbr>
                                                </label>
                                                <input
                                                    type="text"
                                                    {...registerForm.inputPropertiesRegister('username')}
                                                    className={registerForm.formErrors.username && `form-control is-invalid`}
                                                    id="registerUsername"
                                                />
                                                {registerForm.formErrors.username && <span className="error">{registerForm.formErrors.username}</span>}
                                            </div>
                                            <div className="col-12 learts-mb-20">
                                                <label htmlFor="registerPassword">
                                                    Парола <abbr className="required">*</abbr>
                                                </label>
                                                <input
                                                    type="password"
                                                    {...registerForm.inputPropertiesRegister('password')}
                                                    className={registerForm.formErrors.password && `form-control is-invalid`}
                                                    id="registerPassword"
                                                />
                                                {registerForm.formErrors.password && <span className="error">{registerForm.formErrors.password}</span>}
                                            </div>
                                            <div className="col-12 learts-mb-20">
                                                <label htmlFor="confirmPassword">
                                                    Повтори паролата <abbr className="required">*</abbr>
                                                </label>
                                                <input
                                                    type="password"
                                                    {...registerForm.inputPropertiesRegister('confirmPassword')}
                                                    className={registerForm.formErrors.confirmPassword && `form-control is-invalid`}
                                                    id="confirmPassword"
                                                />
                                                {registerForm.formErrors.confirmPassword && <span className="error">{registerForm.formErrors.confirmPassword}</span>}
                                            </div>
                                            <div className="col-12 learts-mb-50">
                                                <p>
                                                    Вашият личен данни ще бъдат използвани за поддръжка на опита ви през този сайт, за управление на достъпа до вашия акаунт и за
                                                    други цели, описани в нашата политика на поверителност
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
                        </div>
                    </div>
                </div>
            </div>
            {/* Login & Register Section End */}
        </>
    );
}
