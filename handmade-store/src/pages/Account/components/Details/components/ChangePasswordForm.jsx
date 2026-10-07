import { useForm } from '@/hooks/useForm.js';

const initialAccountPasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
};

export function ChangePasswordForm({ refresh }) {
    const { inputPropertiesRegister, submitHandler, setFormValues } = useForm(
        () => {},
        initialAccountPasswordValues,
        null,
    );
    return (
        <form>
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
                            </div>
                            <div className="col-12 learts-mb-30">
                                <label htmlFor="newPassword">Нова парола</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    {...inputPropertiesRegister('newPassword')}
                                />
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
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="col-12 learts-mb-30">
                    <button type="submit" className="btn btn-primary">
                        Смени паролата
                    </button>
                </div>
            </div>
        </form>
    );
}
