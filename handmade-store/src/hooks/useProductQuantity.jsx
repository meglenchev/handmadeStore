import { useEffect, useState } from 'react';

export function useProductQuantity(productData, cart) {
    const [quantity, setQuantity] = useState();

    useEffect(() => {
        if (productData) {
            const cartItem = cart?.find((item) => item.id === productData.id);
            setQuantity(cartItem ? cartItem.quantity : 1);
        }
    }, [productData, cart]);

    const handleMinus = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handlePlus = () => {
        const maxAvailable = productData?.stock ?? 0;

        if (quantity < maxAvailable) {
            setQuantity((prev) => prev + 1);
        } else {
            alert(`Достигнахте максималното налично количество на склад (${maxAvailable} бр.)`);
        }
    };

    return { quantity, setQuantity, handleMinus, handlePlus };
}
