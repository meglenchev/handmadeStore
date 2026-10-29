import { useEffect, useState } from 'react';

export function useProductQuantity(productData, onMaxReached) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setQuantity(1);
    }, [productData?._id]);

    const handleMinus = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handlePlus = () => {
        const maxAvailable = productData?.stock ?? 0;

        if (quantity < maxAvailable) {
            setQuantity((prev) => prev + 1);
        } else {
            onMaxReached?.(
                `Достигнахте максималното налично количество на склад (${maxAvailable} бр.)`,
                'warning',
            );
        }
    };

    return { quantity, setQuantity, handleMinus, handlePlus };
}
