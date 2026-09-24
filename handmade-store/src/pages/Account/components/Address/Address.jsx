import { AddressList } from './components/AddressList.jsx';
import { AddressForm } from './components/AddressForm.jsx';

export function Address({ data, refresh }) {
    const handleAddressAdded = () => {
        refresh();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {data.address.length > 0 ? (
                <AddressList addresses={data.address} />
            ) : (
                <AddressForm onAddressAdded={handleAddressAdded} />
            )}
        </>
    );
}
