import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { ACCOUNT_TABS } from '../../utils/constants';
import { useQuery } from '../../hooks/useQuery';

export function Profile() {
    const { auth, onLogout } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('dashboard');

    const addressQuery = useQuery(ACCOUNT_TABS[2].endpoint, null, { enabled: activeTab === 'address' });

    const queriesByTab = {
        address: addressQuery,
    };

    const activeTabConfig = ACCOUNT_TABS.find((tab) => tab.id === activeTab);
    const { data, loading, error, refresh } = queriesByTab[activeTab] || {};
    const ActiveTabComponent = activeTabConfig.Component;

    return (
        <div className="section section-padding">
            <div className="container">
                <div className="row learts-mb-n30">
                    {/* My Account Tab List Start */}
                    <div className="col-lg-4 col-12 learts-mb-30">
                        <ul className="myaccount-tab-list nav">
                            {ACCOUNT_TABS.map((tab) => (
                                <li key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
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
                                    {loading && <p>Loading...</p>}

                                    {!loading && error && (
                                        <div className="error-container text-center">
                                            <p className="error">{error}</p>
                                            <button className="btn btn-primary2" onClick={refresh}>
                                                Опитай отново
                                            </button>
                                        </div>
                                    )}

                                    {!loading && !error && data && <ActiveTabComponent data={data} refresh={refresh} />}
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
