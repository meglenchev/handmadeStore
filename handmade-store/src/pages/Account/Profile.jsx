import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { ACCOUNT_TABS } from '../../utils/constants';

export function Profile() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const { auth, onLogout } = useContext(AuthContext);

    return (
        <div className="section section-padding">
            <div className="container">
                <div className="row learts-mb-n30">
                    {/* My Account Tab List Start */}
                    <div className="col-lg-4 col-12 learts-mb-30">
                        <ul className="myaccount-tab-list nav">
                            {ACCOUNT_TABS.map((tab) => (
                                <li className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                                    {tab.label}
                                    <FontAwesomeIcon icon={tab.icon} />
                                </li>
                            ))}
                            <li className="nav-item" onClick={onLogout}>
                                Logout
                                <FontAwesomeIcon icon="sign-out-alt" />
                            </li>
                        </ul>
                    </div>
                    {/* My Account Tab List End */}
                    {/* My Account Tab Content Start */}
                    <div className="col-lg-8 col-12 learts-mb-30">
                        <div className="tab-content">
                            {/* Single Tab Content Start */}
                            <div className="tab-pane fade show active">
                                <div className={`myaccount-content ${activeTab}`}>
                                    <p>
                                        Hello
                                        <strong>didiv91396</strong>
                                        (not
                                        <strong>didiv91396</strong>?<a href="login-register.html">Log out</a>)
                                    </p>
                                    <p>
                                        From your account dashboard you can view your
                                        <span>recent orders</span>, manage your
                                        <span>shipping and billing addresses</span>, and
                                        <span>edit your password and account details</span>.
                                    </p>
                                </div>
                            </div>
                            {/* Single Tab Content End */}
                        </div>
                    </div>
                    {/* My Account Tab Content End */}
                </div>
            </div>
        </div>
    );
}
