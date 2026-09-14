export function Address({ data, refresh }) {
    return (
        <>
            {data.address.length > 0 ? (
                <>
                    <p>Следните адреси ще се използват по подразбиране на страницата за плащане.</p>
                    <div className="row learts-mb-n30">
                        {data.address.map((address, index) => (
                            <div className="col-md-6 col-12 learts-mb-30" key={address._id}>
                                <h4 className="title">{index === 0 ? 'Адрес за фактуриране' : 'Адрес за доставка'}</h4>
                                <address>
                                    <p>
                                        <strong>{address.fullName}</strong>
                                    </p>
                                    <p>Държава: {address.country}</p>
                                    <p>Град: {address.city}</p>
                                    <p>Пощенски код: {address.postalCode}</p>
                                    <p>Адрес (Ред 1): {address.addressLine1}</p>
                                    <p>Телефон: {address.phone}</p>
                                </address>
                                <a href="#" className="edit-link">
                                    редактиране
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <form action="#">
                    <div className="row learts-mb-n30">
                        <div className="col-12 learts-mb-30 learts-mt-30">
                            <fieldset>
                                <legend>Добави адрес</legend>
                                <div className="row learts-mb-n30">
                                    {/* Full Name */}
                                    <div className="col-12 learts-mb-30">
                                        <label htmlFor="fullName">Две имена *</label>
                                        <input type="text" id="fullName" name="fullName" required />
                                    </div>

                                    {/* Phone */}
                                    <div className="col-12 learts-mb-30">
                                        <label htmlFor="phone">Телефон *</label>
                                        <input type="tel" id="phone" name="phone" required />
                                    </div>

                                    {/* Country */}
                                    <div className="col-12 learts-mb-30">
                                        <label htmlFor="country">Държава *</label>
                                        <input type="text" id="country" name="country" required />
                                    </div>

                                    {/* City */}
                                    <div className="col-12 learts-mb-30">
                                        <label htmlFor="city">Град *</label>
                                        <input type="text" id="city" name="city" required />
                                    </div>

                                    {/* Postal Code */}
                                    <div className="col-12 learts-mb-30">
                                        <label htmlFor="postalCode">Пощенски код *</label>
                                        <input type="text" id="postalCode" name="postalCode" required />
                                    </div>

                                    {/* Address Line 1 */}
                                    <div className="col-12 learts-mb-30">
                                        <label htmlFor="addressLine1">Адрес (Ред 1) *</label>
                                        <input type="text" id="addressLine1" name="addressLine1" required />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="col-12 learts-mb-30">
                            <button className="btn btn-dark btn-outline-hover-dark">Добави адрес</button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
