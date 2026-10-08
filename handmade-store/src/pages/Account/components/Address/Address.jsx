import { AddressList } from './components/AddressList.jsx';
import { AddressForm } from './components/AddressForm.jsx';
import { useContext, useState } from 'react';
import AuthContext from '@/context/AuthContext.jsx';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export function Address({ data, refresh }) {
    const { auth } = useContext(AuthContext);

    const [editingAddressId, setEditingAddressId] = useState(null);

    const editingAddress = data.address.find((a) => a._id === editingAddressId);

    const handleAddressAdded = () => {
        setEditingAddressId(null);
        refresh();
        scrollToTop();
    };

    const handleCancelEdit = () => {
        setEditingAddressId(null);
        scrollToTop();
    };

    return (
        <>
            {data.address.length > 0 && (
                <AddressList addresses={data.address} onEdit={setEditingAddressId} />
            )}

            {editingAddress ? (
                <AddressForm
                    key={editingAddress._id}
                    initialAddress={editingAddress}
                    onSuccess={handleAddressAdded}
                    onCancel={handleCancelEdit}
                />
            ) : (
                data.address.length < 2 && (
                    <AddressForm
                        defaultRecipientName={auth.fullName}
                        onSuccess={handleAddressAdded}
                    />
                )
            )}
        </>
    );
}
