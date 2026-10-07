import { useForm } from '@/hooks/useForm.js';
import { useEffect } from 'react';

const initialAccountDetailshValues = {
    fullName: '',
    username: '',
};

export function ProfileForm({ data, refresh }) {
    const { inputPropertiesRegister, submitHandler, setFormValues } = useForm(
        () => {},
        initialAccountDetailshValues,
        null,
    );

    useEffect(() => {
        if (data) {
            setFormValues((state) => ({
                ...state,
                fullName: data.user.fullName ? data.user.fullName : '',
                username: data.user.username,
            }));
        }
    }, [setFormValues]);

    return (
        <form className="learts-mb-30">
            <div className="row learts-mb-n30">
                <div className="col-md-12 col-12 learts-mb-30">
                    <div className="single-input-item">
                        <label htmlFor="fullName">
                            Име <abbr className="required">*</abbr>
                        </label>
                        <input type="text" id="fullName" {...inputPropertiesRegister('fullName')} />
                    </div>
                </div>
                <div className="col-12 learts-mb-30">
                    <label htmlFor="username">
                        Потребителско име <abbr className="required">*</abbr>
                    </label>
                    <input type="text" id="username" {...inputPropertiesRegister('username')} />
                    <p>Така ще се изписва името ви в секцията на акаунта.</p>
                </div>
                <div className="col-12 learts-mb-30">
                    <label htmlFor="email">
                        Имейл адрес <abbr className="required">*</abbr>
                    </label>
                    <span className="user-email">{data.user.email}</span>
                </div>

                <div className="col-12 learts-mb-30">
                    <button type="submit" className="btn btn-primary">
                        Запазване на промените
                    </button>
                </div>
            </div>
        </form>
    );
}
