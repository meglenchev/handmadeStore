export function Address({ data, refresh }) {
    return (
        <>
            <p>The following addresses will be used on the checkout page by default.</p>
            <div className="row learts-mb-n30">
                <div className="col-md-6 col-12 learts-mb-30">
                    <h4 className="title">
                        Адрес за фактуриране{' '}
                        <a href="#" className="edit-link">
                            edit
                        </a>
                    </h4>
                    <address>
                        <p>
                            <strong>Alex Tuntuni</strong>
                        </p>
                        <p>1355 Market St, Suite 900 San Francisco, CA 94103</p>
                        <p>Mobile: (123) 456-7890</p>
                    </address>
                </div>
                <div className="col-md-6 col-12 learts-mb-30">
                    <h4 className="title">
                        Адрес за доставка{' '}
                        <a href="#" className="edit-link">
                            edit
                        </a>
                    </h4>
                    <address>
                        <p>
                            <strong>Alex Tuntuni</strong>
                        </p>
                        <p>1355 Market St, Suite 900 San Francisco, CA 94103</p>
                        <p>Mobile: (123) 456-7890</p>
                    </address>
                </div>
            </div>
        </>
    );
}
