import { useForm } from '@/hooks/useForm.js';
import { useEffect } from 'react';

const initialAccountDetailshValues = {
    fullName: '',
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
};

export function AccountDetails({ data, refresh }) {
    const { inputPropertiesRegister, submitHandler, setFormValues } = useForm(() => {}, initialAccountDetailshValues, null);

    useEffect(() => {
        if (data) {
            setFormValues((state) => ({
                ...state,
                fullName: data.user.fullName ? data.user.fullName : '',
                username: data.user.username,
                email: data.user.email,
            }));
        }
    }, [setFormValues]);

    return (
        <div className="account-details-form">
            <form>
                <div className="row learts-mb-n30">
                    <div className="col-md-12 col-12 learts-mb-30">
                        <div className="single-input-item">
                            <label htmlFor="fullName">
                                Full Name <abbr className="required">*</abbr>
                            </label>
                            <input type="text" id="fullName" {...inputPropertiesRegister('fullName')} />
                        </div>
                    </div>
                    <div className="col-12 learts-mb-30">
                        <label htmlFor="username">
                            Display Name <abbr className="required">*</abbr>
                        </label>
                        <input type="text" id="username" {...inputPropertiesRegister('username')} />
                        <p>This will be how your name will be displayed in the account section and in reviews</p>
                    </div>
                    <div className="col-12 learts-mb-30">
                        <label htmlFor="email">
                            Email Addres <abbr className="required">*</abbr>
                        </label>
                        <input type="email" id="email" {...inputPropertiesRegister('email')} />
                    </div>
                    <div className="col-12 learts-mb-30 learts-mt-30">
                        <fieldset>
                            <legend>Password change</legend>
                            <div className="row learts-mb-n30">
                                <div className="col-12 learts-mb-30">
                                    <label htmlFor="currentPassword">Current password (leave blank to leave unchanged)</label>
                                    <input type="password" id="currentPassword" {...inputPropertiesRegister('currentPassword')} />
                                </div>
                                <div className="col-12 learts-mb-30">
                                    <label htmlFor="newPassword">New password (leave blank to leave unchanged)</label>
                                    <input type="password" id="newPassword" {...inputPropertiesRegister('newPassword')} />
                                </div>
                                <div className="col-12 learts-mb-30">
                                    <label htmlFor="confirmPassword">Confirm new password</label>
                                    <input type="password" id="confirmPassword" {...inputPropertiesRegister('confirmPassword')} />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="col-12 learts-mb-30">
                        <button className="btn btn-dark btn-outline-hover-dark">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
