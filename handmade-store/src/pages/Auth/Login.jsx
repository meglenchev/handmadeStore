import { LoginForm } from './components/LoginForm.jsx';
import { RegisterForm } from './components/RegisterForm.jsx';

export function Login() {
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
                        <div className="col-lg-6">{<LoginForm />}</div>
                        <div className="col-lg-6">{<RegisterForm />}</div>
                    </div>
                </div>
            </div>
            {/* Login & Register Section End */}
        </>
    );
}
