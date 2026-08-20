import { Link } from 'react-router';
import { useForm } from '../../hooks/useForm.js';

const initialLoginValues = {
    email: '',
    password: '',
};

const initialRegisterValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

export function Login() {
    const loginSubmitHandler = (formValues) => {
        return console.log('Login form submitted with values:', formValues);
    };

    const registerSubmitHandler = (formValues) => {
        return console.log('Register form submitted with values:', formValues);
    };

    const loginForm = useForm(loginSubmitHandler, initialLoginValues);
    const registerForm = useForm(registerSubmitHandler, initialRegisterValues);

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
                                                <input type="email" {...loginForm.inputPropertiesRegister('email')} placeholder="Имейл адрес" />
                                            </div>
                                            <div className="col-12 learts-mb-50">
                                                <input type="password" {...loginForm.inputPropertiesRegister('password')} placeholder="Парола" />
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
                                                <input type="email" {...registerForm.inputPropertiesRegister('email')} id="registerEmail" />
                                            </div>
                                            <div className="col-12 learts-mb-20">
                                                <label htmlFor="registerPassword">
                                                    Парола <abbr className="required">*</abbr>
                                                </label>
                                                <input type="password" {...registerForm.inputPropertiesRegister('password')} id="registerPassword" />
                                            </div>
                                            <div className="col-12 learts-mb-20">
                                                <label htmlFor="confirmPassword">
                                                    Повтори паролата <abbr className="required">*</abbr>
                                                </label>
                                                <input type="password" {...registerForm.inputPropertiesRegister('confirmPassword')} id="confirmPassword" />
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
