import { Link } from 'react-router';
import { useForm } from '../../../hooks/useForm.js';

const initialValues = {
    email: '',
    password: '',
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
    }

    return errors;
};

export function LoginForm() {
    const loginSubmitHandler = (formValues) => {
        return console.log('Login form submitted with values:', formValues);
    };

    const { inputPropertiesRegister, submitHandler, formErrors } = useForm(loginSubmitHandler, initialValues, validateFn);

    return (
        <div className="user-login-register bg-light">
            <div className="login-register-title">
                <h2 className="title">Вход</h2>
                <p className="desc">Радваме се, че се върнахте!</p>
            </div>
            <div className="login-register-form">
                <form onSubmit={submitHandler} noValidate>
                    <div className="row learts-mb-n50">
                        <div className="col-12 learts-mb-50">
                            <input type="email" {...inputPropertiesRegister('email')} className={formErrors.email && `form-control is-invalid`} placeholder="Имейл адрес" />
                            {formErrors.email && <span className="error">{formErrors.email}</span>}
                        </div>
                        <div className="col-12 learts-mb-50">
                            <input type="password" {...inputPropertiesRegister('password')} className={formErrors.password && `form-control is-invalid`} placeholder="Парола" />
                            {formErrors.password && <span className="error">{formErrors.password}</span>}
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
    );
}
