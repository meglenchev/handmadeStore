import { ChangePasswordForm } from './components/ChangePasswordForm.jsx';
import { ProfileForm } from './components/ProfileForm.jsx';

export function Details({ data, refresh }) {
    return (
        <div className="account-details-form">
            <ProfileForm data={data} refresh={refresh} />
            <ChangePasswordForm refresh={refresh} />
        </div>
    );
}
