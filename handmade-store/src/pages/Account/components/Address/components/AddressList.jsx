export function AddressList({ addresses, onEdit }) {
    return (
        <>
            <p>Следните адреси ще се използват по подразбиране на страницата за плащане.</p>
            <div className={addresses.length === 2 ? 'row learts-mb-n30' : 'row'}>
                {addresses.map((address, index) => (
                    <div className="col-md-6 col-12 learts-mb-30" key={address._id}>
                        <h4 className="title">
                            {index === 0 ? 'Адрес за фактуриране' : 'Адрес за доставка'}
                        </h4>
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
                        <button
                            className="btn btn-sm btn-outline-dark learts-mt-20"
                            onClick={() => onEdit(address._id)}>
                            редактиране
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
