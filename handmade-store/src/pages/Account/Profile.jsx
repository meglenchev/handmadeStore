import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Profile() {
    return (
        <div className="section section-padding">
            <div className="container">
                <div className="row learts-mb-n30">
                    {/* My Account Tab List Start */}
                    <div className="col-lg-4 col-12 learts-mb-30">
                        <div className="myaccount-tab-list nav">
                            <li className="active">
                                Dashboard
                                <FontAwesomeIcon icon="home" />
                            </li>
                            <li>
                                Orders
                                <FontAwesomeIcon icon="file-alt" />
                            </li>
                            <li>
                                address
                                <FontAwesomeIcon icon="map-marker-alt" />
                            </li>
                            <li>
                                Account Details
                                <FontAwesomeIcon icon="user" />
                            </li>
                            <li>
                                Logout
                                <FontAwesomeIcon icon="sign-out-alt" />
                            </li>
                        </div>
                    </div>
                    {/* My Account Tab List End */}
                    {/* My Account Tab Content Start */}
                    <div className="col-lg-8 col-12 learts-mb-30">
                        <div className="tab-content">
                            {/* Single Tab Content Start */}
                            <div className="tab-pane fade show active" id="dashboad">
                                <div className="myaccount-content dashboad">
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
